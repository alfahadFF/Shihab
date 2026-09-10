const CACHE_NAME = 'abu-omar-van-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://res.cloudinary.com/dvzg70krq/image/upload/v1789063425/Icon-192_femixj.png',
  'https://res.cloudinary.com/dvzg70krq/image/upload/v1789062875/1789062579538_qnku1a.jpg',
  'https://res.cloudinary.com/dvzg70krq/image/upload/v1789062875/slider1_mqqrtd.jpg',
  'https://res.cloudinary.com/dvzg70krq/image/upload/v1789062874/logo_cnrd6r.jpg',
  'https://res.cloudinary.com/dvzg70krq/image/upload/v1789062876/slider2_ngqaww.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        return caches.match('./');
      });
    })
  );
});
