
const CACHE_NAME = "melting-pro-2-v1";
const urlsToCache = [".","index.html","manifest.json","app.js","style.css","icons/icon-192.png","icons/icon-512.png"];
self.addEventListener('install', e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)));self.skipWaiting();});
self.addEventListener('activate', e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):Promise.resolve()))));self.clients.claim();});
self.addEventListener('fetch', e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{caches.open(CACHE_NAME).then(c=>c.put(e.request,n.clone()));return n;}).catch(()=>r)));});
