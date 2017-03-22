const MOTION_EVENTS = [
  'visibilitychange',
  'mousemove',
  'keydown',
  'DOMMouseScroll',
  'mousewheel',
  'mousedown',
  'touchstart',
  'touchmove'
];


export function onIdleOrActive(idleCb, activeCb, {timeout = 60000} = {}) {
  let status = 'active';
  let idleTimeout;

  const handleMotion = () => {
    if(status === 'idle') {
      status = 'active';
      activeCb();
    }

    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      status = 'idle';
      idleCb();
    }, timeout);
  };

  watchForMotion(handleMotion);

  return () => unwatchMotion(handleMotion);
}

function watchForMotion(fn) {
  MOTION_EVENTS.forEach(name => {
    document.addEventListener(name, fn);
  });
}

function unwatchMotion(fn) {
  MOTION_EVENTS.forEach(name => {
    document.removeEventListener(name, fn);
  });
}
