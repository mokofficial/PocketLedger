const VERSION = 'v3';
const CACHE_NAME = `pocketledger-standalone-${VERSION}`;

// Core files needed for the app to load offline. Data itself lives in
// localStorage (see index.html), so refreshing/updating never wipes it.
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './pwa-install.js',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => {}) // don't block install if a shell asset can't be fetched right now
      .then(() => self.skipWaiting()) // activate the new SW immediately, don't wait on old tabs
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim()) // take control of open tabs right away
  );
});

// Lets the page force an update check/activation on demand.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // let CDN/cross-origin requests pass through untouched

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Network-first: always prefer the freshest copy so updates show up on refresh.
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // Offline + not cached: fall back to the app shell for page navigations.
          if (event.request.mode === 'navigate') return caches.match('./index.html');
          return undefined;
        })
      )
  );
});
