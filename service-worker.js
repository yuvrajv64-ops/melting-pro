const CACHE_NAME = "meltingpro-cache-v1";
const OFFLINE_URLS = [
  "index.html",
  "manifest.json",
  "style.css",
  "app.js",
  "icon-A-192.png",
  "icon-gear-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
