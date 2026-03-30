const CACHE_NAME = 'monster-survival-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon.png'
];

// Install event: Download and cache all game files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Caching game assets...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Fetch event: Serve the game from the device cache if they are offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // Return the cached version if we have it, otherwise fetch from the internet
            return response || fetch(event.request);
        })
    );
});