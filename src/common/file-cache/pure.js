const CACHE_NAME_PREFIX = '_bs:';


export function isFileKey(str) {
  return str.startsWith(CACHE_NAME_PREFIX);
}

export function fileKeyToUrl(key) {
  return key.substr(CACHE_NAME_PREFIX.length);
}

export function getChunkInfos(size, chunkSize) {
  const chunkCount = Math.ceil(size / chunkSize);

  const r = [];

  for(let i = 0; i < chunkCount; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize - 1, size - 1);

    r.push({index: i, start, end});
  }

  return r;
}
