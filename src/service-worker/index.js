import {
    on,
    cacheAll,
    createRouter,
    cacheFirst
} from 'swkit';
import {handleAndCacheFile} from '../common/file-cache';


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
  '/js/player.js',
  '/js/sync.js'
];

precachePaths.forEach(path => {
  router.get(path, precache);
});

router.get('/p/:podcast', (req, params) => precache(new Request('/p/'), params));

router.get('/p/:podcast/icon', precache);
router.get('/p/:podcast/list', precache);

router.get('/p/:podcast/episodes/:index/image', handleAndCacheFile);
router.get('/p/:podcast/episodes/:index/audio', handleAndCacheFile);

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
