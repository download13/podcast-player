import {bootServiceWorker} from '../common';
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import createStore from './store';
import Holder from './components/holder';
import {syncStoreToStorage} from './plugins/storage';


bootServiceWorker();


const store = createStore();

const podcastName = location.pathname.match(/^\/p\/([a-zA-Z0-9]+)$/)[1];
store.dispatch({type: 'SET_PODCAST_NAME', payload: podcastName});

syncStoreToStorage(store);

window.store = store;

render(
  <Provider store={store}>
    <Holder />
  </Provider>,
  document.getElementById('mount')
);
