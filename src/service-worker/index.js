import {
    on,
    cacheAll,
    createRouter,
    cacheFirst
} from 'swkit';
import {handleAndCacheFile} from '../common/file-cache';


// TODO: handleAndCacheFile for audio files
// cache image files as well
const router = createRouter();

const precache = cacheFirst('precache');

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
  router.get(path, precache);
});

router.get('/p/:podcast', (req, params) => {
  return precache(new Request('/p/'), params);
});
router.get('/p/:podcast/icon', precache);
router.get('/p/:podcast/list', precache);

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
