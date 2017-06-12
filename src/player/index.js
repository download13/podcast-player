import {bootServiceWorker} from '../common';
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import createStore from './store';
import {syncStoreToStorage} from './plugins/storage';
import {ensureEpisodeCached} from './plugins/cache';


bootServiceWorker();


const podcastName = location.pathname.match(/^\/p\/([a-zA-Z0-9]+)$/)[1];
store.dispatch({type: 'SET_PODCAST_NAME', payload: podcastName});

syncStoreToStorage(store);

render(
  <Provider store={store}>
    <Holder />
  </Provider>,
  document.getElementById('mount')
);
