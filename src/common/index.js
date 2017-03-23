export function bootServiceWorker() {
  if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
  }
}
