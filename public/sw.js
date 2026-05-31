const CACHE_VERSION = 'v2';
const STATIC_CACHE = `resume-builder-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `resume-builder-dynamic-${CACHE_VERSION}`;

// Resources to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
];

// Install: pre-cache static shell
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Non-fatal — proceed even if some assets fail
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: purge old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== STATIC_CACHE && k !== DYNAMIC_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate for navigation, cache-first for assets
self.addEventListener('fetch', (e) => {
  const { request } = e;

  // Skip non-GET and cross-origin requests (except CDN assets)
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Navigation requests — network-first with offline fallback
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then((res) => {
          if (res.status === 200) {
            const copy = res.clone();
            caches.open(DYNAMIC_CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match('/').then((cached) => cached ?? caches.match('/index.html'))
        )
    );
    return;
  }

  // Static assets / CDN — cache-first
  if (
    url.origin === self.location.origin ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com' ||
    url.hostname === 'gc.zgo.at'
  ) {
    e.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          if (res.status === 200) {
            const copy = res.clone();
            caches.open(DYNAMIC_CACHE).then((c) => c.put(request, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // Everything else — network only
});
