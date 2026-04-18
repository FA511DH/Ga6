const CACHE_NAME = 'mining-empire-v1';
const APP_URL = 'https://cdn-consumer.marketjs.com/game/idle-mining-empire/';

// عند التثبيت: سحب الملفات الأساسية
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './index.html',
                APP_URL
            ]);
        })
    );
});

// اعتراض الطلبات: إذا كان الملف موجود في الذاكرة سحب منه، وإلا سحبه من الإنترنت وحفظه
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) return response; // إذا موجود محلياً
            
            return fetch(event.request).then((networkResponse) => {
                // حفظ النسخة الجديدة في الذاكرة للاستخدام القادم
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        }).catch(() => {
            // إذا فشل الإنترنت وفشل التخزين (حالة طوارئ)
            return caches.match(APP_URL);
        })
    );
});
