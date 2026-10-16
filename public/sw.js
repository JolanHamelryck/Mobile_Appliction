self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("active", (event) => event.waitUntil(clients.claim()));
