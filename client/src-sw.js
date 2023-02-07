const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { StaleWhileRevalidate, CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register navigate page cache
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// Regiter route for caching images
// The cache first strategy is often the best choice for images because it saves bandwidth and improves performance.
registerRoute(({ request }) => 
    ["style", "script", "worker"].includes(request.destination), 
    new StaleWhileRevalidate({
      cachename: "asset-cache",
      plugins: [ new CacheableResponsePlugin({ statuses: [0,200]})],
  }) 
);