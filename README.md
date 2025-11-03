"test"Melting Pro — Bilingual (English/Hindi) React PWA
=================================================

This project is prepared for quick deployment to GitHub Pages and as a PWA.

How to deploy (one-time, on your machine):
1. Unzip and open the project folder.
2. Install dependencies:
   npm install
3. Create a GitHub repository named `melting-pro` under the account `yuvrajv64-ops`:
   https://github.com/new
4. Initialize git and push:
   git init
   git remote add origin https://github.com/yuvrajv64-ops/melting-pro.git
   git add .
   git commit -m "Initial Melting Pro bilingual upload"
   git branch -M main
   git push -u origin main
5. Deploy to GitHub Pages:
   npm run deploy
6. Open the app at: https://yuvrajv64-ops.github.io/melting-pro
7. On Android Chrome: open the link -> menu -> Add to Home screen

Notes:
- The app includes manifest.json and a basic service-worker for offline caching.
- If you want a proper production PWA with runtime caching and updates, integrate Workbox or modify service-worker logic.
- Icons are included (placeholder). Replace icons/icon-192.png and icons/icon-512.png with your preferred logos.
