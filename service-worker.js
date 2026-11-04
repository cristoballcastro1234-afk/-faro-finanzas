const CACHE='faro-v3-pages-2026-11';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(resp=>{if(resp.ok){const cloned=resp.clone();caches.open(CACHE).then(cache=>cache.put(event.request,cloned))}return resp})))});
