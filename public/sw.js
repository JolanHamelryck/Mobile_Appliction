const CACHE_PREFIX = "ucll-tour-app-";
const CACHE_NAME = `${CACHE_PREFIX}v3`;
const APP_SHELL = ["/", "/manifest.json", "/icons/icon-192.png", "/icons/tourIcon.png"];

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
      await cache.addAll(APP_SHELL.slice(1));

      const bundleUrls = Array.from(
        html.matchAll(/(?:src|href)=["']([^"']*\/_expo\/[^"']+)["']/g),
        ([, url]) => new URL(url, self.location.origin).href,
      );
      if (bundleUrls.length === 0) {
        throw new Error("No Expo JavaScript bundles were found in the app shell.");
      }
      await cache.addAll(bundleUrls);

      const bundles = await Promise.all(
        bundleUrls.map(async (url) => cache.match(url).then((response) => response?.text())),
      );
      const assetPaths = new Set();
      for (const bundle of bundles) {
        if (!bundle) {
          continue;
        }
        for (const [, , path] of bundle.matchAll(/(["'])\/assets\/([^"'\\\s)]+)\1/g)) {
          assetPaths.add(`/assets/${path}`);
        }
      }

      const assetUrls = Array.from(
        assetPaths,
        (url) => new URL(url, self.location.origin).href,
      );
      if (assetUrls.length > 0) {
        await cache.addAll(assetUrls);
      }

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
              (cacheName.startsWith(CACHE_PREFIX) ||
                cacheName.startsWith("ucll-mobile-starter-")) &&
              cacheName !== CACHE_NAME,
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
            return response;
          }

          const cachedPage = await caches.match(request);
          if (cachedPage) {
            return cachedPage;
          }
          return response.status === 404
            ? (await caches.match("/")) ?? response
            : response;
        })
        .catch(async () => (await caches.match(request)) ?? (await caches.match("/"))),
    );
    return;
  }

  const { pathname } = new URL(request.url);
  if (
    pathname.startsWith("/_expo/") ||
    pathname.startsWith("/assets/") ||
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
