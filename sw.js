const CACHE_NAME = 'v1_static_cache';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json'
];

// Установка: кешируем ресурсы
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Активация: чистим старый кеш
self.addEventListener('activate', (event) => {
    console.log('Service Worker активирован');
});

// Запрос: отвечаем из кеша, если нет сети
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
