const CACHE_NAME = "ucll-mobile-starter-v1";
const APP_SHELL = [
  "/",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const appResponse = await fetch("/");
      if (!appResponse.ok) {
        throw new Error(`App shell request failed: ${appResponse.status}`);
      }

      const html = await appResponse.clone().text();
      await cache.put("/", appResponse);
      const bundleUrls = Array.from(
        html.matchAll(/(?:src|href)="(\/_expo\/[^"]+)"/g),
        ([, url]) => url,
      );
      await cache.addAll([...APP_SHELL.slice(1), ...bundleUrls]);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName.startsWith("ucll-mobile-starter-") && cacheName !== CACHE_NAME,
          )
          .map((cacheName) => caches.delete(cacheName)),
      ),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response.clone());
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) ?? caches.match("/")),
    );
    return;
  }

  const { pathname } = new URL(request.url);
  if (
    pathname.startsWith("/_expo/") ||
    pathname.startsWith("/icons/") ||
    pathname === "/manifest.json"
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then(async (response) => {
          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response.clone());
          }
          return response;
        });
      }),
    );
  }
});
