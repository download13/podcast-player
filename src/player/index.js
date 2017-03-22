import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import createStore from './store';
import Player from './components/player';
import {
  mediaSessionControls,
  playerKeyControls
} from './plugins/controls';
import {syncStoreToStorage} from './plugins/storage';
import {
  loadEpisodes,
  syncTitle
} from './plugins/other';
import {keepEpisodesCached} from './plugins/cache';


if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}


const store = createStore();

const podcastName = location.pathname.match(/^\/p\/([a-zA-Z0-9]+)$/)[1];
store.dispatch({type: 'SET_PODCAST_NAME', payload: podcastName});

syncStoreToStorage(store);

playerKeyControls(store);
mediaSessionControls(store);

syncTitle(store);
loadEpisodes(store);

keepEpisodesCached(store);

render(
  <Provider store={store}>
    <Player />
  </Provider>,
  document.getElementById('mount')
);


window.store = store;
