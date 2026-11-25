const C='cadstudio-v7';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icon-192.png','icon-512.png','jewellery_master_db.json']).catch(()=>{})))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 const u=new URL(q.url);
 /* Let the browser handle other sites (Drive, YouTube, image hosts) and video range requests directly. */
 if(u.origin!==location.origin||q.headers.has('range'))return;
 e.respondWith(fetch(q,{cache:'no-cache'}).then(r=>{if(r.status===200&&r.type==='basic'&&!/\/media\//.test(u.pathname)){const k=r.clone();caches.open(C).then(c=>c.put(q,k)).catch(()=>{})}return r}).catch(()=>caches.match(q).then(m=>m||caches.match('index.html'))))});
