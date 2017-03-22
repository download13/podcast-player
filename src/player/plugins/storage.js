import {onIdleOrActive} from './idle';


export function syncStoreToStorage(store) {
  onIdleOrActive(
    () => {
      //console.log('active -> idle');
    },
    () => {
      //console.log('idle -> active');
      loadRemote(store);
    }
  );

  addEventListener('beforeunload', e => {
    saveLocal(store);
  });

  let lastPlaying = false;
  let saveInterval;
  let lastEpisodes;

  store.subscribe(() => {
    const {playing, episodes} = store.getState();

    if(lastPlaying && !playing) {
      clearInterval(saveInterval);
      saveRemote(store);
    } else if(!lastPlaying && playing) {
      saveInterval = setInterval(() => saveLocal(store), 15000);
    }

    if(lastEpisodes !== episodes) {
      saveEpisodes(store);
    }

    lastPlaying = playing;
    lastEpisodes = episodes;
  });

  loadEpisodes(store);
  loadRemote(store);
}


function saveRemote(store) {
  saveLocal(store);

  const token = localStorage.getItem('authToken');
  if(!token) return;

  const {podcastName} = store.getState();

  return fetch(`/sync/store/${podcastName}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: getLocal(podcastName)
  })
    .then(res => res.ok);
}

function loadRemote(store) {
  const token = localStorage.getItem('authToken');
  if(!token) {
    loadLocal(store);
    return;
  };

  const {podcastName} = store.getState();

  return fetch(`/sync/get/${podcastName}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(
      blob => {
        if(blob) {
          setLocal(podcastName, blob);
          loadLocal(store);
        }
      },
      err => loadLocal(store)
    );
}


export function saveEpisodes(store) {
  const {podcastName, episodes} = store.getState();

  setEpisodes(podcastName, JSON.stringify(episodes));
}

function loadEpisodes(store) {
  const {podcastName} = store.getState();

  try {
    const episodes = JSON.parse(getEpisodes(podcastName));
    store.dispatch({type: 'SET_EPISODES', payload: episodes});
  } catch(e) {
    console.log('Unable to load invalid saved JSON - episodes');
  }
}

function saveLocal(store) {
  const {
    podcastName,
    index,
    playing,
    uiPosition,
    autoplay,
    volume
  } = store.getState();

  const blob = JSON.stringify({
    index,
    playing,
    position: uiPosition,
    autoplay,
    volume
  });

  setLocal(podcastName, blob);
}

function loadLocal(store) {
  const {podcastName} = store.getState();

  try {
    const loadedState = JSON.parse(getLocal(podcastName));
    store.dispatch({type: 'RESTORE_STATE', payload: loadedState});
  } catch(e) {
    console.log('Unable to load invalid saved JSON - place');
  }
}


function getLocal(podcastName) {
  return localStorage.getItem(podcastName + '_place');
}

function setLocal(podcastName, blob) {
  localStorage.setItem(podcastName + '_place', blob);
}

function getEpisodes(podcastName) {
  return localStorage.getItem(podcastName + '_episodes');
}

function setEpisodes(podcastName, blob) {
  localStorage.setItem(podcastName + '_episodes', blob);
}
