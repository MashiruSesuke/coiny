const CACHE_NAME = 'coiny-v0.5.0';
const urlsToCache = [
  '/',
  '/add',
  '/stats',
  '/profile',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512.png',
];

// Installation - cache main resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation - clear the old cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Delete old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Catch fetch - Stale-While-Revalidate strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Updating cache in the background but immediately returning cached response
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.ok && event.request.method === 'GET') {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
              });
            }
          })
          .catch(() => {
            // Network failed — ignored, user already got cached response
          });
        return cachedResponse;
      }

      // No cache — fetch from network
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.ok && event.request.method === 'GET') {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Network + cache both failed
          return new Response('Offline', { status: 503 });
        });
    })
  );
});
