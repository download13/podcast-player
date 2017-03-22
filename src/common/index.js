import {h, render} from 'preact';
import {Provider} from 'preact-redux';


export function bootServiceWorker() {
  if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
  }
}

export function createApp(MainComponent, mountPoint) {
  render(
    <Provider store={store}>
      <MainComponent />
    </Provider>,
    mountPoint
  );
}
