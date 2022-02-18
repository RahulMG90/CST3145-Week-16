var cacheName = 'petstore-v1';
var cacheFiles = [
    'checkout.html',
    'products.js',
    'petstore.webmanifest',
    './images/cat.jfif',
    './images/toaster.png',
    './images/dog.jfif',
    './images/shoe.png',
    './images/icon.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching al the files');
            return cache.addAll(cacheFiles);
        })
    );
});

/*self.addEventListener('fetch', function (e) {
    e.respondWith(
        // check if cache the cache has the file
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            // 'r' is the matching file if it exists in the cache
            return r
        })
    );
});*/

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download the file if it is not in cache,
            return r || fetch(e.request).then(function (response) {
                // add the new file to the cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});

