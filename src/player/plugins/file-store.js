import {Observable} from 'rxjs/Observable';


export function ensureFileCached(url) {
  return Observable.create(observer => {
    let done = false;

    observer.next(0);

    ensureFileInfoCached(url)
      .then(({chunks, size}) => {
        let progress = 0;

        const nextChunk = () => {
          if(chunks.length === 0 || done) {
            observer.complete();
            return;
          }

          const chunkInfo = chunks.shift();

          // TODO: Retry this a couple times in the event of failure
          return ensureChunkCached(url, chunkInfo)
            .then(() => {
              progress += chunkInfo.end - chunkInfo.start + 1;
              observer.next(progress / size);

              return nextChunk();
            });
        };

        return nextChunk();
      })
      .catch(err => observer.error(err));

    return () => {
      done = true;
    };
  });
}

export function deleteCachedFile() {}

export function listCachedFiles() {}


const dbPromise = getDatabase('podcasts');

function getEpisodeId(podcastName, index) {
  return podcastName + ':' + index;
}

function getEpisodeChunkId(podcastName, episodeIndex, index) {
  return podcastName + ':' + episodeIndex + ':' + index;
}

async function getDatabase(name) {
  const upgradeNeeded = db => {
    const podcasts = db.createObjectStore('podcasts', {keypath: 'name'});

    const episodes = db.createObjectStore('episodes', {keypath: 'id'});

    const images = db.createObjectStore('images', {keypath: 'id'});

    const audioChunks = db.createObjectStore('audioChunks', {keypath: 'id'});
  };

  return openPersistentDatabase(name, 1, upgradeNeeded);
}

function openPersistentDatabase(name, version, onUpgradeNeeded) {
  if(navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
    return promisifyOpenRequest(
      indexedDB.open(name, {version, storage: 'permanent'}),
      onUpgradeNeeded
    );
  } else {
    return promisifyOpenRequest(
      indexedDB.open(name, version),
      onUpgradeNeeded
    );

    if(navigator.storage && navigator.storage.persist) {
      const granted = await navigator.storage.persist();
      console.log('Persistent storage ' + (granted ? '' : 'not ') + 'granted');
    }

    return db;
  }
}

function promisifyOpenRequest(request, onUpgradeNeeded) {
  return new Promise((resolve, reject) => {
    request.onupgradeneeded = e => onUpgradeNeeded(e.target.result);
    request.onsuccess = e => resolve(e.target.result);
    request.onerror = reject;
  });
}

function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = e => resolve(e.target.result);
    request.onerror = reject;
  });
}


function ensureEpisodeCached(episode) {
  return Observable.create(async obs => {
    const {podcastName, episodeIndex, url} = episode;

    obs.next(0);

    const {size, chunks} = await fetchFileInfo(url);

    for(const [chunkIndex, chunkData] of chunks) {
      const chunkData = await fetchFileRange(url, chunk.start, chunk.end);

      await storeEpisodeChunk(podcastName, episodeIndex, chunkIndex, chunkData);

      obs.next((index + 1) / chunks.length);
    }

    obs.complete();
  });


}

async function fetchFileRange(url, start, end) {
  const res = await fetch(url, {
    headers: {
      Range: `bytes=${start}-${end}`
    }
  });

  return res.arrayBuffer();
}

async function storeEpisodeChunk(podcastName, episodeIndex, chunkIndex, chunkData) {
  const db = await dbPromise;

  const result = await db.transaction('episodes', 'readwrite').add({
    id: getEpisodeChunkId(podcastName, episodeIndex, chunkIndex),
    podcastName,
    episodeIndex,
    chunkIndex,
    chunkData
  });

  debugger;

  return result;
}

async function fetchFileInfo(url, chunkSize) {
  const res = await fetch(url, {
    method: 'HEAD',
    headers: {
      Range: 'bytes=0-0'
    }
  });

  const size = parseInt(res.headers.get('content-range').match(/\d+$/)[0]);

  return {
    url,
    size,
    chunks: calcFileChunks(size)
  };
}

function calcFileChunks(fileSize) {
  const chunkCount = Math.ceil(fileSize / DEFAULT_CHUNK_SIZE);

  const r = [];

  for(let i = 0; i < chunkCount; i++) {
    const start = i * DEFAULT_CHUNK_SIZE;
    const end = Math.min(start + DEFAULT_CHUNK_SIZE - 1, fileSize - 1);

    r.push({index: i, start, end});
  }

  return r;
}

function getChunksFromRange(chunks, start, end) {
  return chunks.filter(chunk => isChunkInRange(chunk, start, end));
}

function isChunkInRange(chunk, start, end) {
  if(
    start > chunk.end ||
    end < chunk.start
  ) {
    return false;
  }

  return true;
}
