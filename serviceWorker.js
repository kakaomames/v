const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "https://www.youtube.com/s/desktop/e208051c/img/logos/favicon_144x144.png",
  "https://inv-ca1-c.nadeco.net/latest_version",
  "https://inv-us2-c.nadeko.net/latest_version",
  "https://www.googleapis.com/youtube/v3/videos",
  "https://www.googleapis.com/youtube/v3/search",
  "https://test-five-gules-98.vercel.app/channel",
  "./index.html",
  "./watch/index.html",
  "./channel/index.html",
  "./search/index.html",
  "/watch/index.html",
  "/channel/index.html"
];

// インストール時にキャッシュする
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// リクエストをキャッシュから返す
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 古いキャッシュを削除する
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
