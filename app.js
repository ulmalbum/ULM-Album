(() => {
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const DB_KEY = "smriti_album_v1";
let photos = [], albums = [], currentView = "all", currentAlbum = "", viewerIndex = 0, toastTimer;
try { const saved = JSON.parse(localStorage.getItem(DB_KEY) || "{}"); photos = saved.photos || []; albums = saved.albums || []; } catch {}
const save = () => { try { localStorage.setItem(DB_KEY, JSON.stringify({photos,albums})); } catch { toast("ব্রাউজারের স্টোরেজ পূর্ণ। Export করুন বা কম ছবি যোগ করুন।"); } };
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2800)}
function dateText(t){try{return new Intl.DateTimeFormat("bn-BD",{year:"numeric",month:"short",day:"numeric"}).format(new Date(t))}catch{return new Date(t).toLocaleDateString()}}
function renderAlbums(){ $("#albumList").innerHTML=albums.map(a=>`<button class="album-link" data-album="${esc(a.id)}"><span class="album-swatch"></span>${esc(a.name)}</button>`).join(""); $$(".album-link").forEach(b=>b.onclick=()=>{currentView="album";currentAlbum=b.dataset.album;render()});}
function render(){
 renderAlbums(); $("#allCount").textContent=photos.length;
 let list=photos.filter(p=>currentView==="favorites"?p.favorite:currentView==="album"?p.albums?.includes(currentAlbum):true);
 const q=$("#searchInput").value.trim().toLowerCase(); if(q)list=list.filter(p=>p.name.toLowerCase().includes(q));
 const sort=$("#sortSelect").value; list.sort((a,b)=>sort==="oldest"?a.added-b.added:sort==="name"?a.name.localeCompare(b.name):b.added-a.added);
 $("#pageTitle").textContent=currentView==="favorites"?"আপনার প্রিয় ছবি":currentView==="album"?(albums.find(a=>a.id===currentAlbum)?.name||"অ্যালবাম"):"আপনার স্মৃতির গ্যালারি";
 $("#resultLabel").textContent=currentView==="favorites"?"প্রিয় ছবি":currentView==="album"?"অ্যালবাম":"সব ছবি"; $("#resultCount").textContent=`${list.length}টি ছবি`;
 const gallery=$("#gallery");gallery.className="gallery "+$("#styleSelect").value;
 gallery.innerHTML=list.map(p=>`<article class="photo-card" data-id="${p.id}" tabindex="0" aria-label="${esc(p.name)}"><img src="${p.data}" alt="${esc(p.name)}" loading="lazy"><div class="photo-actions"><button class="mini-action delete" title="ছবি সরান" data-id="${p.id}">×</button></div><div class="photo-info"><div><b>${esc(p.name)}</b><small>${dateText(p.added)}</small></div><button class="heart ${p.favorite?"liked":""}" data-id="${p.id}" title="প্রিয় হিসেবে চিহ্নিত">${p.favorite?"♥":"♡"}</button></div></article>`).join("");
 $("#emptyState").classList.toggle("show",list.length===0);gallery.style.display=list.length?"":"none";
 $$(".photo-card").forEach(card=>{card.onclick=e=>{if(e.target.closest("button"))return;openViewer(card.dataset.id)};card.onkeydown=e=>{if(e.key==="Enter")openViewer(card.dataset.id)}});
 $$(".heart").forEach(b=>b.onclick=e=>{e.stopPropagation();const p=photos.find(x=>x.id===b.dataset.id);p.favorite=!p.favorite;save();render()});
 $$(".delete").forEach(b=>b.onclick=e=>{e.stopPropagation();if(confirm("এই ছবি অ্যালবাম থেকে সরাতে চান?")){photos=photos.filter(p=>p.id!==b.dataset.id);save();render();toast("ছবি সরানো হয়েছে")}})
}
function openViewer(id){const p=photos.find(x=>x.id===id);if(!p)return;viewerIndex=photos.indexOf(p);showViewer();$("#viewer").classList.add("open");$("#viewer").setAttribute("aria-hidden","false")}
function showViewer(){const p=photos[viewerIndex];if(!p)return;$("#viewerImage").src=p.data;$("#viewerImage").alt=p.name;$("#viewerName").textContent=p.name;$("#viewerMeta").textContent=dateText(p.added)}
function closeViewer(){$("#viewer").classList.remove("open");$("#viewer").setAttribute("aria-hidden","true")}
function modal(html){$("#modalContent").innerHTML=html;$("#modal").classList.add("open");$("#modal").setAttribute("aria-hidden","false")}
function closeModal(){$("#modal").classList.remove("open");$("#modal").setAttribute("aria-hidden","true")}
function importFiles(fileList){const files=[...fileList].filter(f=>f.type.startsWith("image/"));if(!files.length){toast("কোনো ছবি নির্বাচন করা হয়নি");return}let done=0;files.forEach(file=>{const reader=new FileReader();reader.onload=()=>{photos.unshift({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),name:file.name.replace(/\.[^.]+$/,""),data:reader.result,added:Date.now(),favorite:false,albums:[]});done++;if(done===files.length){save();render();toast(`${done}টি ছবি যোগ করা হয়েছে`);}};reader.onerror=()=>{done++;if(done===files.length){save();render();toast("কিছু ছবি পড়া যায়নি")}};reader.readAsDataURL(file)})}
$("#uploadBtn").onclick=()=>$("#fileInput").click();$("#emptyUploadBtn").onclick=()=>$("#fileInput").click();$("#fileInput").onchange=e=>{importFiles(e.target.files);e.target.value=""};
$("#searchInput").oninput=render;$("#sortSelect").onchange=render;$("#styleSelect").onchange=render;
$("#themeBtn").onclick=()=>{document.body.classList.toggle("light");$("#themeBtn").textContent=document.body.classList.contains("light")?"☾":"☼"};
$$(".nav-item").forEach(b=>b.onclick=()=>{currentView=b.dataset.view;currentAlbum="";$$(".nav-item").forEach(x=>x.classList.toggle("active",x===b));render()});
$("#newAlbumBtn").onclick=()=>{modal(`<h2>নতুন অ্যালবাম তৈরি করুন</h2><p>আপনার ছবিগুলো একটি সংগ্রহে সাজান।</p><input id="albumName" type="text" placeholder="যেমন: ভ্রমণ ২০২৬" maxlength="60"><button id="createAlbum" class="primary">অ্যালবাম তৈরি</button>`);$("#createAlbum").onclick=()=>{const name=$("#albumName").value.trim();if(!name)return toast("অ্যালবামের নাম লিখুন");albums.push({id:String(Date.now()),name});save();closeModal();render();toast("নতুন অ্যালবাম তৈরি হয়েছে")}}
$("#exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify({photos,albums},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="smriti-album-backup.json";a.click();URL.revokeObjectURL(a.href);toast("ব্যাকআপ ফাইল তৈরি হয়েছে")};
$("#importBtn").onclick=()=>$("#jsonInput").click();$("#jsonInput").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result);if(!Array.isArray(data.photos)||!Array.isArray(data.albums))throw Error();if(confirm("বর্তমান অ্যালবামের সঙ্গে ব্যাকআপের ছবি যোগ করবেন? Cancel করলে বর্তমান ডেটা প্রতিস্থাপন হবে।"))photos=[...data.photos,...photos];else photos=data.photos;albums=data.albums;save();render();toast("ব্যাকআপ Import সম্পন্ন")}catch{toast("এই ব্যাকআপ ফাইলটি সঠিক নয়")}};r.readAsText(f);e.target.value=""};
$("#closeViewer").onclick=closeViewer;$("#viewer").onclick=e=>{if(e.target===$("#viewer"))closeViewer()};$("#prevPhoto").onclick=()=>{viewerIndex=(viewerIndex-1+photos.length)%photos.length;showViewer()};$("#nextPhoto").onclick=()=>{viewerIndex=(viewerIndex+1)%photos.length;showViewer()};document.onkeydown=e=>{if(e.key==="Escape"){closeViewer();closeModal()}if($("#viewer").classList.contains("open")){if(e.key==="ArrowLeft")$("#prevPhoto").click();if(e.key==="ArrowRight")$("#nextPhoto").click()}};
$("#modalClose").onclick=closeModal;$("#modal").onclick=e=>{if(e.target===$("#modal"))closeModal()};
const driveText=`<h2>Google Drive সংযোগ</h2><p>এই ZIP-এ Google Drive-এর জন্য প্রস্তুত সংযোগের নির্দেশিকা রয়েছে, তবে আপনার Google অ্যাকাউন্টে সরাসরি সংযোগ চালু করা হয়নি।</p><ol><li>Google Cloud Console-এ একটি project তৈরি করুন।</li><li>Google Drive API চালু করুন এবং OAuth consent screen সেট করুন।</li><li>OAuth Web Client তৈরি করে আপনার ওয়েবসাইটের origin যোগ করুন।</li><li>README-তে দেওয়া নির্দেশনা অনুসারে নিরাপদ backend বা Google Identity Services ব্যবহার করে অনুমতি নিন।</li></ol><p><b>নিরাপত্তা:</b> OAuth client secret কখনো HTML/JavaScript ফাইলে রাখবেন না। এই ডেমো নিজে থেকে Drive-এর ফাইল পড়ছে না।</p><p>API documentation: <code>https://developers.google.com/drive/api</code></p>`;
const photosText=`<h2>Google Photos সংযোগ</h2><p>Google Photos-এর API নীতিতে পরিবর্তন হয়েছে এবং সাধারণ ব্যক্তিগত লাইব্রেরির সব ছবি নির্বিচারে পড়ার অনুমতি ধরে নেওয়া যাবে না। এই ডেমো সরাসরি Google Photos থেকে ছবি সংগ্রহ করে না।</p><p>সমর্থিত Google Photos Picker API flow ব্যবহার করে ব্যবহারকারীকে ছবি নির্বাচন করতে দিতে হবে; অনুমোদিত API scope ও বর্তমান নীতিমালা যাচাই করুন।</p><p>API documentation: <code>https://developers.google.com/photos</code></p><p>বিকল্পভাবে Google Photos থেকে ছবি ডাউনলোড করে এখানে আপলোড করতে পারবেন।</p>`;
$("#driveInfoBtn").onclick=()=>modal(driveText);$("#photosInfoBtn").onclick=()=>modal(photosText);
render();
})();