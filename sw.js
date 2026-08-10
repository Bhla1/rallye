const CACHE = "rallye-cache-v5";
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./stations.json",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
  "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
];

self.addEventListener('install', evt=>{
  evt.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', evt=>{
  evt.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', evt=>{
  evt.respondWith(caches.match(evt.request).then(resp=>resp || fetch(evt.request)));
});
