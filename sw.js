// Mise en cache pour la lecture hors ligne. Changer VERSION à chaque mise à jour de index.html.
const VERSION = "veille-sodexam-2026-10-26";
const CORE = ["./", "index.html", "data.json", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const fresh = req.mode === "navigate" || url.pathname.endsWith("/data.json") || url.pathname.endsWith("/index.html");
  if (fresh) {
    // réseau d'abord, copie locale si pas de connexion
    e.respondWith(fetch(req).then(r => {
      if (r.ok) { const c = r.clone(); caches.open(VERSION).then(k => k.put(url.pathname.endsWith("/data.json") ? "data.json" : req, c)); }
      return r;
    }).catch(() => caches.match(url.pathname.endsWith("/data.json") ? "data.json" : req).then(m => m || caches.match("index.html"))));
    return;
  }
  // polices et icônes : cache d'abord
  e.respondWith(caches.match(req).then(m => m || fetch(req).then(r => {
    if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(VERSION).then(k => k.put(req, c)); }
    return r;
  })));
});
