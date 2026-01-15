# 🎯 Step-by-Step Tutorial: Deploy ke Netlify + Railway

Panduan praktis deploy aplikasi dalam 15 menit.

---

## STEP 1: Setup GitHub Repository (5 menit)

### 1.1 Install Git (jika belum)
```bash
# Check jika sudah install
git --version

# Jika belum, download dari https://git-scm.com
```

### 1.2 Create GitHub Account
- Buka https://github.com
- Sign up dengan email Anda
- Verify email

### 1.3 Create New Repository

Di dashboard GitHub:
1. Klik **"+"** → **"New repository"**
2. Nama: `umkm-ig-generator`
3. Description: "Instagram Content Generator for UMKM"
4. Public repository
5. **Create repository**

### 1.4 Push Code ke GitHub

```bash
# Buka terminal di folder project
cd d:\2026\APLIKASI\WEDDINGKONTEN_DESKTOP

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: UMKM Instagram Content Generator"

# Add remote (ganti YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/umkm-ig-generator.git

# Change branch name to main
git branch -M main

# Push ke GitHub
git push -u origin main
```

**Result**: Semua code sudah di GitHub! ✅

---

## STEP 2: Deploy Frontend ke Netlify (5 menit)

### 2.1 Signup Netlify
- Buka https://app.netlify.com
- Klik **"Sign up"**
- Pilih **"Sign up with GitHub"**
- Authorize & Login

### 2.2 Deploy via GitHub

1. Di dashboard Netlify, klik **"Add new site"** → **"Import an existing project"**
2. Pilih **GitHub**, authorize jika perlu
3. Select repository: `umkm-ig-generator`
4. Configure build:
   - **Build command**: (kosongkan)
   - **Publish directory**: `public`
5. Klik **"Deploy site"**

**Waiting**: Netlify akan build & deploy dalam 1-2 menit

### 2.3 Get Frontend URL

Di Netlify dashboard:
- Copy URL dari bagian atas (contoh: `https://umkm-ig-generator.netlify.app`)
- Ini adalah frontend URL Anda

**Result**: Frontend live di Netlify! ✅

---

## STEP 3: Deploy Backend ke Railway (5 menit)

Railway adalah alternatif Heroku yang lebih baik.

### 3.1 Signup Railway
- Buka https://railway.app
- Klik **"Start Project"**
- Sign up dengan GitHub atau email

### 3.2 Create New Project
1. Klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Authorize & select: `umkm-ig-generator`
4. Confirm deployment

### 3.3 Configure Environment

Railway akan auto-detect Node.js app.

Di Railway dashboard, tab **"Variables"**:
```
PORT = 3000
NODE_ENV = production
```

### 3.4 Get Backend URL

Di tab **"Deployments"**:
- Wait sampai deploy selesai (status: green)
- Copy domain URL (contoh: `https://umkm-ig-generator-prod.up.railway.app`)
- Ini adalah backend URL Anda

**Result**: Backend live di Railway! ✅

---

## STEP 4: Connect Frontend & Backend (2 menit)

### 4.1 Update Frontend API URL

Edit file `public/js/app.js`:

```javascript
// Cari baris ini:
const API_URL = 'http://localhost:3000/api/generate-content';

// Ganti menjadi (gunakan URL Railway Anda):
const API_URL = 'https://umkm-ig-generator-prod.up.railway.app/api/generate-content';
```

### 4.2 Update Backend CORS

Edit file `server.js`, cari bagian CORS:

```javascript
// Ubah dari:
app.use(cors());

// Menjadi:
app.use(cors({
  origin: [
    'https://umkm-ig-generator.netlify.app',
    'http://localhost:3000'
  ]
}));
```

### 4.3 Push Changes ke GitHub

```bash
cd d:\2026\APLIKASI\WEDDINGKONTEN_DESKTOP

git add .
git commit -m "Update API URLs for production"
git push origin main
```

### 4.4 Auto Redeploy

- Netlify akan auto-redeploy frontend (check bagian "Deploys")
- Railway akan auto-redeploy backend (check bagian "Deployments")
- Wait 1-2 menit sampai deploy selesai

**Result**: Frontend & Backend terhubung! ✅

---

## ✅ TESTING

### Test Frontend
1. Buka: `https://umkm-ig-generator.netlify.app`
2. Isi form
3. Klik "Generate Konten"
4. Jika muncul hasil → **Success!** 🎉

### Test Backend
```bash
# Open browser atau Postman
# Buka: https://umkm-ig-generator-prod.up.railway.app/api/health

# Should return:
{
  "status": "ok",
  "message": "UMKM Instagram Content Generator API is running"
}
```

---

## 🚀 Your Production URLs

Setelah semuanya berhasil:

```
Frontend:  https://umkm-ig-generator.netlify.app
Backend:   https://umkm-ig-generator-prod.up.railway.app
API:       https://umkm-ig-generator-prod.up.railway.app/api
```

Bagikan URL frontend ke users!

---

## 🔧 Troubleshooting

### Frontend blank / tidak load
- [ ] Check Netlify deploy logs
- [ ] Check CSS/JS di browser DevTools (F12)
- [ ] Clear browser cache (Ctrl+Shift+Delete)

### API Error 404 / tidak connect
- [ ] Check Railway deployment status (green?)
- [ ] Verify backend URL di `public/js/app.js`
- [ ] Check Railway logs untuk errors
- [ ] Pastikan PORT=3000 di environment variables

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```

Solution:
- Add frontend URL ke CORS di `server.js`
- Push changes ke GitHub
- Wait untuk redeploy

### Blank page after deployment
- [ ] Check Network tab di DevTools
- [ ] Check console untuk JS errors
- [ ] Check Netlify build logs

### API response error
- Check Railway logs: `heroku logs --tail` atau cek di Railway dashboard
- Restart dyno/server jika perlu

---

## 🎯 Maintenance Checklist

### Daily
- [ ] Check if app is working
- [ ] Check error logs

### Weekly
- [ ] Review analytics (jika ada)
- [ ] Check performance
- [ ] Monitor error rate

### Monthly
- [ ] Update dependencies: `npm outdated`
- [ ] Security audit: `npm audit`
- [ ] Backup database (jika ada)
- [ ] Review costs

---

## 💡 Next Steps untuk Production

1. **Custom Domain** (optional)
   - Buy domain dari Namecheap, GoDaddy, etc
   - Setup di Netlify & Railway
   - Cost: $1-15/year

2. **Email Notifications**
   - Setup alert jika app down
   - Email alerts di Railway dashboard

3. **Database** (if needed future)
   - Supabase PostgreSQL (free tier)
   - MongoDB Atlas (free tier)

4. **Analytics**
   - Add Google Analytics
   - Track user behavior

5. **Monitoring**
   - Uptime monitoring (Uptimerobot.com)
   - Error tracking (Sentry.io)

---

## 📞 Support Links

- **Netlify Docs**: https://docs.netlify.com
- **Railway Docs**: https://docs.railway.app
- **GitHub Docs**: https://docs.github.com
- **Node.js Docs**: https://nodejs.org/docs

---

## ✨ Congratulations!

Aplikasi Anda sekarang **LIVE** dan bisa diakses dari mana saja! 🎉

Share URL-nya ke bisnis UMKM dan mulai generate konten! 📱

