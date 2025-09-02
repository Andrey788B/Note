const CACHE_NAME = 'reactnote-cache-v1';
const ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/favicon.ico',
  '/icons/16.png',
  '/icons/20.png',
  '/icons/29.png',
  '/icons/32.png',
  '/icons/40.png',
  '/icons/50.png',
  '/icons/57.png',
  '/icons/58.png',
  '/icons/60.png',
  '/icons/64.png',
  '/icons/72.png',
  '/icons/76.png',
  '/icons/80.png',
  '/icons/87.png',
  '/icons/100.png',
  '/icons/114.png',
  '/icons/120.png',
  '/icons/128.png',
  '/icons/144.png',
  '/icons/152.png',
  '/icons/167.png',
  '/icons/180.png',
  '/icons/192.png',
  '/icons/256.png',
  '/icons/512.png',
  '/icons/1024.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const asset of ASSETS) {
        try {
          const response = await fetch(asset);
          if (response.ok) {
            await cache.put(asset, response);
          } else {
            console.warn(`Not cached (bad response): ${asset}`);
          }
        } catch (err) {
          console.error(`Failed to cache: ${asset}`, err);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req)
        .then(res => {
          const copy = res.clone();
          caches
            .open(CACHE_NAME)
            .then(cache => cache.put(req, copy))
            .catch(() => {});
          return res;
        })
        .catch(() => caches.match('/offline.html'));
    })
  );
});
