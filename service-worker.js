const CACHE_NAME = "inventory-cache-v1";
const FILES_TO_CACHE = ["/index.html","/xlsx.full.min.js","/manifest.json","/icon.png"];
self.addEventListener("install", evt => { evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))); self.skipWaiting(); });
self.addEventListener("activate", evt => { evt.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)))); self.clients.claim(); });
self.addEventListener("fetch", evt => { evt.respondWith(caches.match(evt.request).then(resp => resp || fetch(evt.request))); });
