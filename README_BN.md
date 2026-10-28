# ULM Smart Gallery

মোবাইল-ফ্রেন্ডলি, 3D অ্যানিমেশনসহ ফটো গ্যালারি — HTML, CSS এবং JavaScript।

## ফিচার
- Responsive mobile/desktop layout এবং animated 3D artwork
- ছবি যোগ করা, fullscreen viewer, আগের/পরের ছবি দেখা
- Album তৈরি, search, sort, favorites
- Grid/compact view, dark/light mode
- JSON backup export/import
- ছবি IndexedDB-তে এবং album/theme পছন্দ browser storage-এ থাকে

## ফোন থেকে GitHub Pages-এ প্রকাশ
1. ZIP ফোনে Extract করুন।
2. GitHub repository `ULM-Album` খুলুন।
3. `Add file` → `Upload files` চাপুন। না দেখালে Chrome-এর ⋮ মেনু থেকে **Desktop site** চালু করুন।
4. Extract করা ফোল্ডারের **ভেতরের ফাইলগুলো** আপলোড করুন: `index.html`, `style.css`, `app.js`, `README_BN.md`, `LICENSE.txt`। `index.html` অবশ্যই repository root-এ থাকবে।
5. `Commit changes` চাপুন।
6. Repository → Settings → Pages → `Deploy from a branch` নির্বাচন করুন; Branch `main`, folder `/(root)` বেছে `Save` চাপুন।
7. প্রকাশ সম্পন্ন হলে Pages সেটিংসের `Visit site` ব্যবহার করুন। সাধারণ URL কাঠামো: `https://USERNAME.github.io/REPOSITORY/`।

## গুরুত্বপূর্ণ
- Google Photos/Drive-এর সঙ্গে সরাসরি cloud sync এই সংস্করণে নেই; সেটির জন্য OAuth/API integration প্রয়োজন।
- ছবি বর্তমান browser/device-এ থাকে, অন্য ডিভাইসে নিজে থেকে sync হয় না। Browser data clear করলে ছবি হারাতে পারে—নিয়মিত **Backup** নিন।
- বড় ছবির সংগ্রহে browser storage limit প্রযোজ্য।
