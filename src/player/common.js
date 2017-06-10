function getRemoteFile(url, onProgress) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.responseType = 'arraybuffer';
    if(onProgress) {
      x.onprogress = e => onProgress(Math.floor(e.loaded / e.total));
    }
    x.onerror = reject;
    x.onload = () => {
      if(x.status === 200) {
        resolve(x.response);
      } else {
        reject(new Error('Got ' + x.status + ' from ' + url))
      }
    };
    x.open('GET', url, true);
    x.send();
  });
}

function getBlob(res) {
  if(res && res.ok) {
    return res.blob();
  }
  return null;
}
