# 🚀 Quick Deployment Guide

Pilih salah satu cara di bawah:

## ⚡ CARA PALING CEPAT (Recommended)

### Setup di Local (5 menit)

```bash
cd d:\2026\APLIKASI\WEDDINGKONTEN_DESKTOP

# 1. Install dependencies
npm install

# 2. Commit ke Git
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

### Deploy Frontend ke Netlify (3 menit)

**Via Drag & Drop (Paling Cepat):**
```
1. Buka: https://app.netlify.com/drop
2. Drag folder "public" ke browser
3. Selesai! Dapat URL otomatis
```

**Via GitHub (Better):**
```
1. Buat repo di GitHub
2. Push code: git push origin main
3. Connect ke Netlify
4. Auto-deploy setiap kali push
```

### Deploy Backend ke Railway (3 menit)

```
1. Buka: https://railway.app
2. Login dengan GitHub
3. New Project → Deploy from GitHub
4. Select repo: umkm-ig-generator
5. Railway auto-detect & deploy
6. Copy URL dari "Deployments" tab
```

### Update API URL (1 menit)

Edit `public/js/app.js`:
```javascript
const API_URL = 'https://YOUR-RAILWAY-URL.up.railway.app/api/generate-content';
```

Push:
```bash
git add public/js/app.js
git commit -m "Update API URL"
git push origin main
```

## ✅ VERIFICATION

Test di: `https://YOUR-NETLIFY-URL.netlify.app`

Jika berhasil generate konten → **SUCCESS!** 🎉

---

## 📋 COMPARISON: Platform Pilihan

### Option A: Netlify + Railway ⭐ RECOMMENDED
```
✅ Netlify free tier bagus (100GB bandwidth)
✅ Railway lebih reliable dari Heroku
✅ Mudah setup
✅ Auto-redeploy saat push
✅ Total cost: $0/month (or $5-10 untuk scale)
```

### Option B: Vercel (All-in-One)
```
✅ One platform untuk semua
✅ Better performance
❌ Sedikit lebih complex untuk setup
❌ Paid untuk high traffic
```

### Option C: Heroku (Classic)
```
✅ Familiar untuk banyak developer
❌ Free dyno sleep after 30 min
❌ Maintenance mode
❌ Expensive untuk upgrade
```

---

## 🔗 Links

| Task | Link |
|------|------|
| Git Tutorial | https://github.com/git-tips/tips |
| Netlify | https://app.netlify.com |
| Railway | https://railway.app |
| Vercel | https://vercel.com |
| GitHub | https://github.com |

---

## 📞 Support

- **Error saat deploy?** Check DEPLOYMENT.md
- **API tidak connect?** Check DEPLOY_TUTORIAL.md
- **Need help?** Read README.md atau check logs di platform

---

## 🎯 Time Estimate

| Task | Time |
|------|------|
| Git setup | 5 min |
| Frontend deploy (Netlify) | 3 min |
| Backend deploy (Railway) | 3 min |
| Update API URL | 2 min |
| Testing | 2 min |
| **TOTAL** | **15 min** |

**Goal**: Aplikasi live dalam 15 menit! ⚡

---

Happy deployment! 🚀

