export function bootServiceWorker() {
  if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
  }
}

export function formatTime(n) {
  if(isNaN(n)) {
    return '00:00';
  }

  let hours = Math.floor(n / 60);
  if(hours < 10) hours = '0' + hours;

  let minutes = Math.floor(n % 60);
  if(minutes < 10) minutes = '0' + minutes;

  return hours + ':' + minutes;
}
