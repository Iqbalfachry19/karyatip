// public/service-worker.js
self.addEventListener('install', e => {
  console.log('[Service Worker] Install');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('[Service Worker] Activate');
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
