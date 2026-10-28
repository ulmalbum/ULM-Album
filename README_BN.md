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

## আপনার Supabase প্রজেক্টের জন্য সেটআপ (ফোন থেকেই)

এই প্যাকেজে আপনার দেওয়া Project URL ও publishable key আগে থেকেই সেট করা আছে। তাই ওয়েবসাইটে Account খুললে URL/key আবার টাইপ করার দরকার নেই। Publishable key ব্রাউজারে ব্যবহারযোগ্য; **Database password বা service-role/secret key কখনো HTML/JavaScript-এ দেবেন না।** আপনার দেওয়া `postgresql://...:[YOUR-PASSWORD]...` লিংকটি অসম্পূর্ণ placeholder এবং এই static website-এর জন্য দরকার নেই।

### ধাপ ১ — ডেটাবেস টেবিল তৈরি
1. ফোনের Chrome-এ https://supabase.com/dashboard খুলে আপনার project `ebrdatestjseullzqyuu` নির্বাচন করুন।
2. বাম মেনু থেকে **SQL Editor** খুলুন → **New query** চাপুন।
3. GitHub-এ এই ZIP-এর `supabase-schema.sql` ফাইল খুলুন, পুরো SQL কপি করে SQL Editor-এ পেস্ট করুন → **Run** চাপুন।
4. সফল হলে `gallery_photos` টেবিল ও নিরাপত্তা policy তৈরি হবে।

### ধাপ ২ — Private Storage bucket তৈরি
1. Supabase Dashboard → **Storage** → **New bucket**।
2. নাম দিন `gallery-photos` এবং **Private** রাখুন (Public করবেন না) → Create bucket।
3. `supabase-schema.sql`-এর Storage policy অংশও SQL Editor-এ চালানো যেতে পারে; যদি পুরো ফাইল একসঙ্গে আগে চালিয়ে থাকেন, আবার চালানো নিরাপদ হওয়ার জন্য policy-গুলো `drop policy if exists` দিয়ে লেখা।

### ধাপ ৩ — Email ও Google লগইন
**Email লগইন**
1. Dashboard → Authentication → Sign In / Providers-এ Email provider চালু রাখুন।
2. Email confirmation চালু থাকলে signup-এর পর inbox থেকে confirmation link খুলুন।

**Google লগইন ও স্বয়ংক্রিয় প্রোফাইল ছবি**
1. Google Cloud Console-এ একটি OAuth 2.0 Client ID (Web application) তৈরি করুন।
2. Supabase Dashboard → Authentication → Sign In / Providers → Google-এ Google provider চালু করুন। Google Client ID ও Client Secret বসিয়ে Save করুন।
3. Supabase Dashboard → Authentication → URL Configuration-এ **Site URL** হিসেবে আপনার প্রকাশিত ওয়েবসাইটের আসল URL দিন, যেমন `https://YOUR-USERNAME.github.io/ULM-Album/`। `YOUR-USERNAME` ও repository নাম আপনার নিজেরটি দিয়ে বদলাবেন।
4. একই পৃষ্ঠার **Redirect URLs**-এ ওই প্রকাশিত URL যোগ করুন। স্থানীয় পরীক্ষার জন্য চাইলে `http://localhost:5500/**` আলাদাভাবে যোগ করতে পারেন, কিন্তু production Site URL হিসেবে localhost রাখবেন না।
5. Google Cloud Console-এর OAuth client-এ Supabase Dashboard-এর Google provider পৃষ্ঠায় দেখানো **Callback URL**-টি Authorized redirect URI হিসেবে যোগ করুন।
6. প্রকাশিত HTTPS সাইটে Account → **Google দিয়ে চালিয়ে যান** চাপুন। Google থেকে পাওয়া `avatar_url` / `picture` থাকলে সেটি Account বোতামের পাশে স্বয়ংক্রিয়ভাবে দেখাবে।

**লোকালহোস্ট সমস্যা:** `index.html` সরাসরি ফোনে/কম্পিউটারে খুললে অথবা localhost server থেকে খুললে সেটি শুধু ওই ডিভাইসের local address-এ চলে, অন্য কেউ ইন্টারনেট থেকে খুলতে পারবে না। সবার জন্য চালাতে GitHub Pages বা অন্য HTTPS static hosting-এ প্রকাশ করুন। Google OAuth-এর redirect URL বর্তমান সাইটের origin থেকে তৈরি হয়, তাই Supabase-এর URL Configuration-এ প্রকাশিত site URL অবশ্যই allowlist করতে হবে।

### ধাপ ৪ — GitHub Pages-এ আপলোড
1. ZIP Extract করুন।
2. GitHub app বা Chrome-এ `ULM-Album` repository খুলুন → **Add file** → **Upload files**।
3. `ULM_Smart_Gallery_Pro` ফোল্ডারের ভেতরের ফাইলগুলো নির্বাচন করে root-এ আপলোড করুন: `index.html`, `style.css`, `app.js`, `supabase-schema.sql`, `README_BN.md`, `LICENSE.txt`। পুরো ফোল্ডারকে root-এর ভিতরে আরেক ফোল্ডার হিসেবে আপলোড করবেন না।
4. **Commit changes** চাপুন। তারপর Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save।

### ধাপ ৫ — অ্যাকাউন্ট ও সিঙ্ক পরীক্ষা
1. প্রকাশিত GitHub Pages সাইট খুলুন → **Account** চাপুন। URL ও key আগে থেকেই বসানো থাকবে।
2. **ক্লাউড সংযোগ** চাপুন → ইমেইল ও কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিয়ে **অ্যাকাউন্ট তৈরি** করুন।
3. ইমেইল নিশ্চিত করতে বললে আপনার ইমেইল থেকে confirm করুন, তারপর **লগইন** চাপুন।
4. ছবি যোগ করুন → **এখন সিঙ্ক** চাপুন। অন্য ফোনে একই সাইটে একই অ্যাকাউন্টে লগইন করে Sync চাপুন।

**গুরুত্বপূর্ণ:** আমি আপনার Supabase Dashboard-এ সরাসরি লগইন করে SQL চালাতে বা bucket তৈরি করতে পারি না। উপরোক্ত ধাপগুলো একবার আপনার করতে হবে। `supabase login`, `supabase init`, `supabase link` কমান্ডগুলো শুধু Supabase CLI ব্যবহার করলে লাগে; GitHub Pages-এ প্রকাশ করতে এগুলো বাধ্যতামূলক নয়।

## সীমাবদ্ধতা ও নিরাপত্তা
- এটি starter implementation; production ব্যবহারের আগে RLS/storage policy, upload size, sync conflicts, deletion propagation, retry/offline queue এবং privacy policy পরীক্ষা করুন।
- বর্তমান সিঙ্ক নতুন ছবি আপলোড করে এবং বিদ্যমান ছবির metadata/favorite আপডেট করে; cloud থেকে অনুপস্থিত লোকাল ছবিগুলো ডাউনলোড করে। লোকাল delete এখনো cloud delete-এ propagate করে না।
- GitHub Pages static hosting; কোনো server secret এখানে রাখা যাবে না।
- Supabase Auth password browser code-এ সংরক্ষণ করা হয় না। Project URL/anon key browser localStorage-এ থাকে; shared/public device-এ ব্যবহারে সতর্ক থাকুন।
- Cloud sync-এ বড় ফাইলের জন্য storage/bandwidth limits প্রযোজ্য।

## Files
- `index.html` — app UI
- `style.css` — responsive theme and 3D animation
- `app.js` — offline gallery, 160+ settings, Supabase email/Google auth, profile avatar and sync
- `supabase-schema.sql` — database and storage policy starter
- `README_BN.md` — setup instructions
- `LICENSE.txt` — MIT License
