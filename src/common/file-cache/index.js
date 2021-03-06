import parseRange from 'range-parser';
import {
  isFileKey,
  fileKeyToUrl,
  getChunkInfos
} from './pure';


const DEFAULT_CHUNK_SIZE = 256 * 1024;
const CACHE_NAME_PREFIX = '_bs:';
const CACHE_PATH_PREFIX = '/_bs/';
const FILE_INFO_PATH = CACHE_PATH_PREFIX + 'info';


export function handleAndCacheFile(request) {
  return ensureFileInfoCached(request.url)
    .then(fileInfo => {
      const {url, size} = fileInfo;

      let rangeHeader = 'bytes=0-';
      let rangeRequest = false;
      if(request.headers.has('range')) {
        rangeHeader = request.headers.get('range');
        rangeRequest = true;
      }

      let start, end;
      try {
        [{start, end}] = parseRange(size, rangeHeader);
      } catch(e) {
        console.error('handleAndCacheFile error: invalid range');
        console.error(e);
        return new Response('Invalid range', {status: 416});
      }

      return ensureFileRange(url, start, end)
        .then(bodyStream => {
          return new Response(bodyStream, {
            status: rangeRequest ? 206 : 200,
            headers: {
              'Accept-Ranges': 'bytes',
              'Content-Range': `bytes ${start}-${end}/${size}`,
              'Content-Length': end - start + 1,
              'Content-Type': 'audio/ogg'
            }
          });
        })
        .catch(err => {
          console.error('handleAndCacheFile error');
          console.error(err);
          return new Response(err.stack, {status: 500});
        });
    });
}


const filesPending = {};

export function ensureFileCached(url, {onProgress} = {}) {
  if(filesPending[url]) {
    return filesPending[url];
  }

  const pending = ensureFileInfoCached(url)
    .then(({chunks, size}) => {
      let progress = 0;

      const nextChunk = () => {
        if(chunks.length === 0) {
          return;
        }

        const chunkInfo = chunks.shift();

        // TODO: Retry this a couple times in the event of failure
        return ensureChunkCached(url, chunkInfo)
          .then(() => {
            if(onProgress) {
              progress += chunkInfo.end - chunkInfo.start + 1;

              onProgress(progress / size);
            }

            return nextChunk();
          });
      };

      return nextChunk();
    })
    .then(r => {
      delete filesPending[url];
      return r;
    });

  filesPending[url] = pending;

  return pending;
}

export function listCachedFiles() {
  return caches.keys()
    .then(keys =>
      keys
        .filter(isFileKey)
        .map(fileKeyToUrl)
    );
}

export function deleteCachedFile(url) {
  const cacheName = CACHE_NAME_PREFIX + url;

  return caches.delete(cacheName);
}

export function deleteSelectedFiles(selector) {
  return caches.keys().then(cacheKeys => {
    const deleteKeys = cacheKeys
      .filter(isFileKey)
      .filter(key => selector(key.substr(CACHE_NAME_PREFIX.length)));

    return Promise.all(deleteKeys.map(key => caches.delete(key)));
  });
}

// Returns a Promise of a ReadableStream
function ensureFileRange(url, start, end) {
  return ensureFileInfoCached(url)
    .then(fileInfo => {
      const {size, chunks} = fileInfo;

      const conversionFactor = chunks.length / size;

      const startChunk = Math.floor(start * conversionFactor);
      const endChunk = Math.ceil(end * conversionFactor);

      const chunksToLoad = chunks.slice(startChunk, endChunk + 1);

      const streamNextChunk = controller => {
        if(chunksToLoad.length === 0) {
          controller.close();
          return;
        }

        const chunkInfo = chunksToLoad.shift();

        return ensureChunkCached(url, chunkInfo)
          .then(chunkBuffer => {
            if(chunkInfo.start < start) {
              chunkBuffer = chunkBuffer.slice(start - chunkInfo.start);
            } else if(chunkInfo.end > end) {
              chunkBuffer = chunkBuffer.slice(0, end - chunkInfo.start + 1);
            }

            controller.enqueue(new Uint8Array(chunkBuffer));
          });
      };

      return new ReadableStream({
        start: streamNextChunk,
        pull: streamNextChunk,
        cancel() {}
      });
    });
}


const fileInfoPending = {};

function ensureFileInfoCached(url, chunkSize = DEFAULT_CHUNK_SIZE) {
  const cacheName = CACHE_NAME_PREFIX + url;

  if(fileInfoPending[url]) {
    return fileInfoPending[url];
  }

  const pending = existsInCache(cacheName, FILE_INFO_PATH)
    .then(exists => {
      if(!exists) {
        return fetchFileInfo(url, chunkSize)
          .then(fileInfo => storeInCache(cacheName, FILE_INFO_PATH, JSON.stringify(fileInfo))
          .then(() => fileInfo));
      } else {
        return fetchFromCache(cacheName, FILE_INFO_PATH, 'json');
      }
    })
    .then(r => {
      delete fileInfoPending[url];
      return r;
    });

  fileInfoPending[url] = pending;

  return pending;
}


const chunksPending = {};

function ensureChunkCached(url, chunkInfo) {
  const cacheName = CACHE_NAME_PREFIX + url;
  const cachePath = CACHE_PATH_PREFIX + `chunks/${chunkInfo.start}-${chunkInfo.end}`;
  const pendingKey = url + ':' + chunkInfo.start + '-' + chunkInfo.end;

  if(chunksPending[pendingKey]) {
    return chunksPending[pendingKey];
  }

  const pending = existsInCache(cacheName, cachePath)
    .then(exists => {
      if(!exists) {
        return fetchChunk(url, chunkInfo)
          .then(chunkData => storeInCache(cacheName, cachePath, chunkData));
      } else {
        return fetchFromCache(cacheName, cachePath);
      }
    })
    .then(r => {
      delete chunksPending[pendingKey];
      return r;
    });

  chunksPending[pendingKey] = pending;

  return pending;
}


function existsInCache(cacheName, cachePath) {
  return caches.open(cacheName)
    .then(cache => cache.match(cachePath))
    .then(res => !!res);
}

function fetchFromCache(cacheName, cachePath, type = 'arrayBuffer') {
  return caches.open(cacheName)
    .then(cache => cache.match(cachePath))
    .then(res => {
      if(res) {
        return res[type]();
      }
    });
}

function storeInCache(cacheName, cachePath, data) {
  return caches.open(cacheName)
    .then(cache => cache.put(cachePath, new Response(data)))
    .then(() => data);
}


function fetchChunk(url, chunkInfo) {
  return fetch(url, {
    headers: {
      Range: `bytes=${chunkInfo.start}-${chunkInfo.end}`
    }
  })
    .then(res => res.arrayBuffer());
}

function fetchFileInfo(url, chunkSize) {
  return fetch(url, {
    method: 'HEAD',
    headers: {
      Range: 'bytes=0-0'
    }
  })
    .then(res => {
      const size = parseInt(res.headers.get('content-range').match(/\d+$/)[0]);

      return {
        url,
        size,
        chunks: getChunkInfos(size, chunkSize)
      };
    });
}
