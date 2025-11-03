
const CACHE_NAME = "melting-pro-aarav-v1";
const urlsToCache = [
  ".",
  "index.html",
  "manifest.json",
  "script.js",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); return Promise.resolve(); })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => { cache.put(event.request, fetchRes.clone()); return fetchRes; });
      }).catch(()=> cacheRes);
    })
  );
});
