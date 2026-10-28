# ULM Smart Gallery Pro — Online + Offline

মোবাইল-ফ্রেন্ডলি ফটো গ্যালারি, 3D অ্যানিমেশন, অ্যালবাম, সার্চ, ফেভারিট, grid/compact view, dark/light mode, JSON backup/import এবং 160+ সেটিংস কন্ট্রোল প্যানেল।

## আগে জেনে নিন
- **অফলাইন গ্যালারি:** ছবি এই ব্রাউজারের IndexedDB-তে থাকে। ব্রাউজার ডেটা মুছে গেলে লোকাল ছবি হারাতে পারে; Backup ব্যবহার করুন।
- **অনলাইন অ্যাকাউন্ট ও বহু ডিভাইস সিঙ্ক:** Supabase project configure এবং database/storage setup করার পর চালু হবে। শুধু GitHub Pages প্রকাশ করলেই cloud storage তৈরি হয় না।
- 160+ অপশন সেটিংস তালিকায় আছে। যেগুলোতে **পরিকল্পিত / সেটআপ দরকার** লেখা, সেগুলো UI-তে দৃশ্যমান কিন্তু পূর্ণ ফিচার হিসেবে বাস্তবায়িত নয়—এগুলোকে চালু করলেই ফিচার সম্পূর্ণ হবে না।
- Supabase anon/public key frontend-এ ব্যবহার করা যায়, কিন্তু কখনো service-role key ব্যবহার করবেন না। Database RLS policy ব্যবহার করুন।

## GitHub Pages-এ ফোন থেকে প্রকাশ
1. ZIP extract করুন।
2. GitHub-এ আপনার `ULM-Album` repository খুলুন।
3. `Add file` → `Upload files` বেছে **এই ফোল্ডারের ভেতরের ফাইলগুলো** upload করুন। `index.html`, `style.css`, `app.js`, `README_BN.md`, `LICENSE.txt`, `supabase-schema.sql` root-এ রাখুন।
4. `Commit changes` চাপুন।
5. Repository → Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save।
6. Pages-এর `Visit site` চাপুন।

## Cloud setup (Supabase)
1. https://supabase.com এ একটি project তৈরি করুন।
2. SQL Editor-এ `supabase-schema.sql` ফাইলের SQL চালান।
3. Storage-এ `gallery-photos` নামে private bucket তৈরি করুন। Bucket public করবেন না।
4. Storage policies SQL ফাইলে দেওয়া আছে। SQL চালানোর পরে policy ও RLS যাচাই করুন।
5. Project Settings → API থেকে Project URL এবং anon/public key নিন।
6. Gallery → Account → Project URL ও anon key দিন → Cloud connect → Sign up → email confirmation (যদি চালু থাকে) → Sign in → Sync now।
7. অন্য ডিভাইসে একই Pages URL খুলে একই Supabase URL/key দিয়ে লগইন করে Sync now চাপুন।

## সীমাবদ্ধতা ও নিরাপত্তা
- এটি starter implementation; production ব্যবহারের আগে RLS/storage policy, upload size, sync conflicts, deletion propagation, retry/offline queue এবং privacy policy পরীক্ষা করুন।
- বর্তমান সিঙ্ক নতুন ছবি আপলোড করে এবং বিদ্যমান ছবির metadata/favorite আপডেট করে; cloud থেকে অনুপস্থিত লোকাল ছবিগুলো ডাউনলোড করে। লোকাল delete এখনো cloud delete-এ propagate করে না।
- GitHub Pages static hosting; কোনো server secret এখানে রাখা যাবে না।
- Supabase Auth password browser code-এ সংরক্ষণ করা হয় না। Project URL/anon key browser localStorage-এ থাকে; shared/public device-এ ব্যবহারে সতর্ক থাকুন।
- Cloud sync-এ বড় ফাইলের জন্য storage/bandwidth limits প্রযোজ্য।

## Files
- `index.html` — app UI
- `style.css` — responsive theme and 3D animation
- `app.js` — offline gallery, 160+ settings, optional Supabase auth/sync
- `supabase-schema.sql` — database and storage policy starter
- `README_BN.md` — setup instructions
- `LICENSE.txt` — MIT License
