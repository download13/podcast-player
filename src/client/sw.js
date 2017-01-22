import {
    on,
    cacheAll,
    createRouter,
    networkFirst
} from 'swkit';


const router = createRouter();

const precacheNetworkFirst = networkFirst('precache');

const precachePaths = [
  '/',
  '/sync',
  '/css/common.css',
  '/css/icons-codes.css',
  '/css/icons.woff',
  '/css/index.css',
  '/css/player.css',
  '/css/sync.css',
  '/images/podcast_300.png',
  '/js/app.js',
  '/list'
];

precachePaths.forEach(path => {
  router.get(path, precacheNetworkFirst);
});

router.get('/p/:podcast', (req, params) => {
  return precacheNetworkFirst(new Request('/'), params);
});
router.get('/p/:podcast/icon', precacheNetworkFirst);
router.get('/p/:podcast/list', precacheNetworkFirst);

on('fetch', router.dispatch);

on('install', e => {
  e.waitUntil(
    cacheAll('precache', precachePaths)
    .then(skipWaiting())
  );
});

on('activate', e => {
  e.waitUntil(clients.claim());
});
