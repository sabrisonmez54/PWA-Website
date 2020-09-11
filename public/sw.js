var CACHE_STATIC_NAME = "static-v4";
var CACHE_DYNAMIC_NAME = "dynamic-v2";

// self.addEventListener("install", function (event) {
//   console.log("[Service Worker] Installing Service Worker ...", event);
//   event.waitUntil(
//     caches.open(CACHE_STATIC_NAME).then(function (cache) {
//       console.log("[Service Worker] Precaching App Shell");
//       cache.addAll([
//         "/",
//         "/index.html",
//         "/src/js/app.js",
//         "/src/js/feed.js",
//         "/src/css/grid.css",
//         "/src/css/card.css",
//         "/src/js/material.min.js",
//         "/src/css/app.css",
//         "/src/css/feed.css",
//         "/src/images/main-image.jpg",
//         "/src/images/swiftLogo.jpg",
//         "/src/images/StrongArm_Logo.jpg",
//         "https://fonts.googleapis.com/css?family=Roboto:400,700",
//         "https://fonts.googleapis.com/icon?family=Material+Icons",
//         "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
//         "https://webdev.imgix.net/images/collections/pwa.svg",
//       ]);
//     })
//   );
// });
var STATIC_FILES = [
  "/",
  "/index.html",
  "/src/js/app.js",
  "/src/js/kube.min.js",
  "/src/js/pwa.js",
  "/src/js/feed.js",
  "/src/css/grid.css",
  "/src/css/card.css",
  "/src/js/material.min.js",
  "/src/css/app.css",
  "/src/css/oldStyles.css",
  "/src/css/mobile.css",
  "/src/images/Swift_logo_with_text.svg",
  "/src/images/StrongArm_Logo.jpg",
  "src/images/bmw-logo-light.svg",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://webdev.imgix.net/images/collections/pwa.svg",
  "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css"
];
self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(function (cache) {
      console.log("[Service Worker] Precaching App Shell");
      cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service Worker] Removing old cache.", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

function isInArray(string, array) {
  var cachePath;
  if (string.indexOf(self.origin) === 0) {
    // request targets domain where we serve the page from (i.e. NOT a CDN)
    console.log("matched ", string);
    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1;
}

self.addEventListener("message", function (event) {
  console.log("[Service Worker] message");
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

self.addEventListener("message", function (event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
// self.addEventListener('fetch', function (event) {

//   var url = 'https://httpbin.org/get';
//   if (event.request.url.indexOf(url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_DYNAMIC_NAME)
//         .then(function (cache) {
//           return fetch(event.request)
//             .then(function (res) {
//               // trimCache(CACHE_DYNAMIC_NAME, 3);
//               cache.put(event.request, res.clone());
//               return res;
//             });
//         })
//     );
//   } else if (isInArray(event.request.url, STATIC_FILES)) {
//     event.respondWith(
//       caches.match(event.request)
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request)
//         .then(function (response) {
//           if (response) {
//             return response;
//           } else {
//             return fetch(event.request)
//               .then(function (res) {
//                 return caches.open(CACHE_DYNAMIC_NAME)
//                   .then(function (cache) {
//                     // trimCache(CACHE_DYNAMIC_NAME, 3);
//                     cache.put(event.request.url, res.clone());
//                     return res;
//                   })
//               })
//               .catch(function (err) {
//                 return caches.open(CACHE_STATIC_NAME)
//                   .then(function (cache) {
//                     if (event.request.headers.get('accept').includes('text/html')) {
//                       return cache.match('/offline.html');
//                     }
//                   });
//               });
//           }
//         })
//     );
//   }
// });

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then(function (res) {
            return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
              cache.put(event.request.url, res.clone());
              return res;
            });
          })
          .catch(function (err) {
            return caches.open(CACHE_STATIC_NAME).then(function (cache) {
              return cache.match("/offline.html");
            });
          });
      }
    })
  );
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request)
//       .then(function(res) {
//         return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 })
//       })
//       .catch(function(err) {
//         return caches.match(event.request);
//       })
//   );
// });

// Cache-only
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//   );
// });

// Network-only
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     fetch(event.request)
//   );
// });
