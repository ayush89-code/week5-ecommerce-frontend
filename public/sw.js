const CACHE_NAME = 'ecommerce-v1'
const STATIC_CACHE = ['/', '/index.html']

self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => 
      cache.addAll(STATIC_CACHE)
    )
  )
})

self.addEventListener('fetch', event => {
  // ✅ SKIP VITE DEV FILES
  if (event.request.url.includes('@vite') || 
      event.request.url.includes('@react-refresh') ||
      event.request.url.includes('localhost:5173/src/')) {
    return fetch(event.request)
  }
  
  event.respondWith(
    caches.match(event.request).then(response => 
      response || fetch(event.request)
    )
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.map(cache => 
          cache !== CACHE_NAME && caches.delete(cache)
        )
      )
    )
  )
  self.clients.claim()
})
