self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("click-speed-test-v1").then((cache) => {
        return cache.addAll([
          "index.html",
          "style.css",
          "script.js",
          "manifest.json",
          "click.png"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  