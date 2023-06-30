'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "03acefc4795e8573b194262cd3a4419f",
"index.html": "ca5abd8a78494f56d29ef9b027fdcf58",
"/": "ca5abd8a78494f56d29ef9b027fdcf58",
"main.dart.js": "031aadb985725de3067e4a3b53aee5ea",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/favicon-16x16.png": "524668d2f93642f377361fd647ec05b7",
"icons/favicon.ico": "99d8346c44902d4cf9e886cdde967232",
"icons/apple-icon.png": "79f3cc1e6a66e4c34246d3a2dddd18f4",
"icons/apple-icon-144x144.png": "379fac059a3b6011146c0c3bde605a92",
"icons/android-icon-192x192.png": "68c88535432be4093e3787a620924a10",
"icons/apple-icon-precomposed.png": "79f3cc1e6a66e4c34246d3a2dddd18f4",
"icons/apple-icon-114x114.png": "8d85015040d4b485fbeb482e08f6440b",
"icons/ms-icon-310x310.png": "0dd0215d525d880546ff638aa6b10977",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/ms-icon-144x144.png": "2e54667a26b957064c95829546c7a44a",
"icons/apple-icon-57x57.png": "39ea1fc4f258bcc856580fb7328e6d87",
"icons/apple-icon-152x152.png": "589e82ddd1866fec707122cdcc7f9f5c",
"icons/ms-icon-150x150.png": "fd2f832319882dcd6e8f258048bcbb73",
"icons/android-icon-72x72.png": "b27918817a9d5cc7939771fd53ba6309",
"icons/android-icon-96x96.png": "97aaab60b33bf12cbdec9146e9a1203c",
"icons/android-icon-36x36.png": "8a2b89ed2938228455372a90c7214e86",
"icons/apple-icon-180x180.png": "d6504f5494a3317e5a75d4ebc8fc8804",
"icons/favicon-96x96.png": "3b6036dd52f3ae4b4f4acc35652515bf",
"icons/android-icon-48x48.png": "dd40ee95ce4d559ef472462a99925f87",
"icons/apple-icon-76x76.png": "d8b262816d6911aedb9c152579593ba1",
"icons/apple-icon-60x60.png": "47d0ff2d3ed032eb743fc8230a9e989d",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/android-icon-144x144.png": "379fac059a3b6011146c0c3bde605a92",
"icons/apple-icon-72x72.png": "b27918817a9d5cc7939771fd53ba6309",
"icons/apple-icon-120x120.png": "8a509775c2eac687a67caef22730a1bb",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/favicon-32x32.png": "143b0f5953518e8bf0db757c956b4931",
"icons/ms-icon-70x70.png": "3ebb8ef63623735efca19af0c6cf0e84",
"manifest.json": "e011b8fe8691424909862a694a6ac486",
"assets/AssetManifest.json": "c678203d2c3058038aa170b1456c5176",
"assets/NOTICES": "e2fe96f4ab130860e80f12a5cf2e32a7",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.smcbin": "a4dd5dd7b18d9774ebd2496f649457dc",
"assets/fonts/MaterialIcons-Regular.otf": "f16e6fec652317e7155db58da85da39c",
"assets/assets/images/icon1.png": "3aa577c62e9fe094fb1756eaa81f5f00",
"assets/assets/images/apple.png": "1e3c4773b5c56480f5dab0d9639f9fcd",
"assets/assets/images/me.jpeg": "d257734783e4e86737c95b73e25d1f26",
"assets/assets/images/icon3.png": "1febd921ea16cd56c89fd131004d4fd0",
"assets/assets/images/icon2.png": "37aae9cef5759925ec4cc5cca672f3d5",
"assets/assets/images/icon4.png": "487b816cc8a7c9a7158ea2ab6ad6e603",
"assets/assets/images/google.png": "fd53fc3ed492c70d4db90920da79f7d3",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "6ee8463380bee545847bd17be7407be0",
"canvaskit/chromium/canvaskit.js": "a4552398e7eb819f30a495bad7fef865",
"canvaskit/chromium/canvaskit.wasm": "551b4fbeee2da852f86cd6782b5745ae",
"canvaskit/canvaskit.js": "f29ce259449210c0021d70650097873a",
"canvaskit/canvaskit.wasm": "012abba5ffbbe6952b4b97bcfa99456a",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
