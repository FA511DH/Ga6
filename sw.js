const CACHE_NAME = 'mining-empire-eternal-v1';
// قائمة الملفات التي سيتم تخزينها في الجوال للأبد
const urlsToCache = [
  './',
  './index.html',
  './game.css?v=1776229083',
  './game.js?v=1776229083'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
