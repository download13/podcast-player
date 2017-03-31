import {Observable, storeObservable} from './common';
import {keepEpisodesCached} from './cache';
import {
  syncTitle,
  playerKeyControls,
  mediaSessionControls
} from './browser';
import {listCachedFiles} from '../../common/file-cache';


export function syncStoreToStorage(store) {
  const rawState$ = storeObservable(store);

  const state$ = rawState$
    .distinctUntilChanged()
    .share();

  const podcastName$ = state$
    .pluck('podcastName')
    .distinctUntilChanged()
    .share();

  const episodes$ = state$
    .pluck('episodes')
    .distinctUntilChanged()
    .share();

  const bookmarks$ = state$
    .pluck('bookmarks')
    .distinctUntilChanged();

  const throttledPosition$ = state$
    .pluck('uiPosition')
    .distinctUntilChanged()
    .throttleTime(5000);

  const paused$ = state$
    .pluck('playing')
    .distinctUntilChanged()
    .filter(playing => !playing);

  Observable.combineLatest(
    state$,
    throttledPosition$,
    paused$,
    Observable.fromEvent(window, 'beforeunload')
  )
    .subscribe(([state]) => savePlaceToStorage(state));

  Observable.combineLatest(podcastName$, bookmarks$)
    .subscribe(([podcastName, bookmarks]) => {
      saveBookmarksToStorage(podcastName, bookmarks);
      saveBookmarksToServer(podcastName, bookmarks);
    });

  Observable.combineLatest(podcastName$, episodes$)
    .subscribe(([podcastName, episodes]) => saveEpisodesToStorage(podcastName, episodes));

  const state = store.getState();

  loadEpisodesFromServer(state.podcastName)
    .then(() => {
      loadEpisodesFromStorage(store);

      loadCachedEpisodeState();
      // TODO: When episodes loaded, inventory all the cached episodes and set the cacheProgress for each episode

      loadPlaceFromStorage(store);
    });

  loadBookmarksFromServer(state.podcastName)
    .then(() => loadBookmarksFromStorage(store));

  syncTitle(state$);
  mediaSessionControls(store, state$);
  playerKeyControls(store);
  keepEpisodesCached(store, rawState$, episodes$);
}


function saveBookmarksToServer(podcastName, bookmarks) {
  const token = localStorage.getItem('authToken');
  if(!token) {
    return;
  }

  return fetch(`/sync/store/${podcastName}-bookmarks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(bookmarks)
  })
    .then(
      res => res.ok,
      err => {
        console.error('saveBookmarksToServer error ' + podcastName);
        console.error(err);
      }
    );
}


function loadCachedEpisodeState() {
  return listCachedFiles()
    .then(files =>
      files
        .filter(url => {
          if(url.endsWith('/audio')) {
            const match = url.match(/episodes\/([0-9]+)\/audio$/);
            return match && match[1];
          }
          return false;
        })
        .map(url => {
          const index = parseInt(url.match(/episodes\/([0-9]+)\/audio$/)[1]);
          return index;
        })
    )
    .then(indexes => {
      const {episodes} = store.getState();

      const newEpisodes = episodes.map((episode, i) => {
        const cached = indexes.find(item => item === i);

        return {
          ...episode,
          cacheProgress: cached ? 1 : 0
        };
      });

      store.dispatch({type: 'SET_EPISODES', payload: newEpisodes});
    });
}

function loadEpisodesFromServer(podcastName) {
  return fetch(`/p/${podcastName}/list`)
    .then(res => res.json())
    .then(publicEpisodes.bind(null, podcastName))
    .then(episodes => {
      saveEpisodesToStorage(podcastName, episodes);
    });
}

function loadBookmarksFromServer(podcastName) {
  const token = localStorage.getItem('authToken');
  if(!token) {
    return Promise.resolve();
  };

  return loadFromServer(podcastName, 'bookmarks', token)
}

function loadFromServer(podcastName, type, token) {
  return fetch(`/sync/get/${podcastName}_${type}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(
      blob => {
        if(blob) {
          setRaw(podcastName, type, blob);
        }
      },
      err => {
        console.error('loadFromServer error ' + podcastName + '-' + type);
        console.error(err);
      }
    );
}


function saveEpisodesToStorage(podcastName, episodes) {
  set(podcastName, 'episodes', episodes);
}

function saveBookmarksToStorage(podcastName, bookmarks) {
  set(podcastName, 'bookmarks', bookmarks);
}

function savePlaceToStorage(state) {
  const {
    podcastName,
    index,
    playing,
    uiPosition,
    autoplay,
    volume
  } = state;

  set(podcastName, 'place', {
    index,
    playing,
    position: uiPosition,
    autoplay,
    volume
  });
}


function loadEpisodesFromStorage(store) {
  const {podcastName} = store.getState();

  const episodes = get(podcastName, 'episodes');

  store.dispatch({type: 'SET_EPISODES', payload: episodes});
}

function loadPlaceFromStorage(store) {
  const {podcastName} = store.getState();

  const loadedState = get(podcastName, 'place');

  store.dispatch({type: 'RESTORE_STATE', payload: loadedState});
}

function loadBookmarksFromStorage(store) {
  const {podcastName} = store.getState();

  const bookmarks = get(podcastName, 'bookmarks');

  store.dispatch({type: 'SET_BOOKMARKS', payload: bookmarks});
}


function get(podcastName, type) {
  if(podcastName) {
    const json = localStorage.getItem(podcastName + '_' + type);

    try {
      return JSON.parse(json);
    } catch(e) {
      console.log('Unable to load invalid saved JSON - ' + type);
      console.error(e);
      console.log(json);
      return null;
    }
  }
}

function set(podcastName, type, data) {
  if(podcastName) {
    setRaw(podcastName, type, JSON.stringify(data));
  }
}

function setRaw(podcastName, type, blob) {
  localStorage.setItem(podcastName + '_' + type, blob);
}


function publicEpisodes(podcastName, episodes) {
  return episodes.map(episode => {
    const episodeUrlPrefix = `${location.protocol}//${location.host}/p/${podcastName}/episodes/${episode.index}/`;

    return {
      ...episode,
      imageUrl: episodeUrlPrefix + 'image',
      audioUrl: episodeUrlPrefix + 'audio',
      cacheProgress: 0
    };
  });
}
