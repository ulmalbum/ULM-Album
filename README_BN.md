# স্মৃতি (Smriti) Smart Photo Album

বাংলা ভাষার responsive photo album starter project। HTML, CSS ও JavaScript দিয়ে তৈরি।

## এখনই কী কাজ করে
- মোবাইল/কম্পিউটার থেকে একসঙ্গে একাধিক ছবি যোগ করা
- Masonry, Grid ও Polaroid layout
- Dark/Light theme
- ছবি খোঁজা, নতুন/পুরোনো/নাম অনুযায়ী sort
- ফুলস্ক্রিন photo viewer এবং আগের/পরের ছবি
- Favorite mark
- অ্যালবাম তৈরি
- JSON backup export/import
- Responsive mobile layout

## চালু করার নিয়ম
1. ZIP extract করুন।
2. `index.html` ব্রাউজারে খুলুন। কোনো build step লাগে না।
3. `＋ ছবি যোগ করুন` দিয়ে ছবি বেছে নিন।

প্রস্তাবিত: Chrome/Edge/Firefox-এর আধুনিক সংস্করণ ব্যবহার করুন।

## গুরুত্বপূর্ণ সীমাবদ্ধতা
এটি একটি front-end starter, সম্পূর্ণ cloud-connected service নয়। ছবির data URL এবং metadata আপনার browser-এর `localStorage`-এ থাকে। অনেক বড় ছবি/অনেক ছবি যোগ করলে browser storage সীমা পূর্ণ হতে পারে। `Export` দিয়ে JSON backup রাখুন। Export ফাইলে ছবির ডেটাও থাকে, তাই ফাইলটি ব্যক্তিগতভাবে সংরক্ষণ করুন। Browser data clear করলে export করা backup ছাড়া ছবি হারাতে পারেন।

## Google Drive / Google Photos
এই প্রজেক্ট নিজে থেকে আপনার Google account-এ প্রবেশ করে না এবং cloud থেকে স্বয়ংক্রিয়ভাবে ছবি সংগ্রহ করে না।

### Google Drive
Production integration-এর জন্য Google Cloud project, Drive API, OAuth consent configuration এবং Google Identity Services/OAuth flow লাগবে। প্রয়োজনের তুলনায় সীমিত scope নিন। OAuth client secret কখনো browser-side code-এ রাখবেন না। বেশি নির্ভরযোগ্য private album-এর জন্য backend, user authentication এবং object storage ব্যবহার করুন।

Official docs: https://developers.google.com/drive/api

### Google Photos
Google Photos API access ও library permissions-এর নিয়ম পরিবর্তিত হয়েছে। বর্তমান API policy অনুযায়ী সমর্থিত Picker API flow দিয়ে ব্যবহারকারীকে ছবি নির্বাচন করতে দিতে হতে পারে। সব ব্যক্তিগত Photos library-তে unrestricted access আছে ধরে নেবেন না।

Official docs: https://developers.google.com/photos

### Production architecture
- Frontend: HTML/CSS/JavaScript বা React
- Authentication: OAuth 2.0 / Google Identity Services
- Backend: Node.js + Express
- Database: PostgreSQL/Supabase/Firebase
- Image storage: Google Drive references অথবা private object storage
- Security: server-side token handling, least-privilege scopes, per-user authorization

## ফাইল
- `index.html`: পেজের কাঠামো
- `style.css`: responsive ডিজাইন ও থিম
- `app.js`: gallery interaction, local browser storage, import/export
- `README_BN.md`: বাংলা নির্দেশিকা

এই ZIP হলো ব্যবহারযোগ্য local prototype এবং integration-এর ভিত্তি; Google OAuth credentials বা cloud deployment এতে অন্তর্ভুক্ত নয়।
