# 🚀 Deployment Guide - UMKM Instagram Content Generator

Panduan lengkap untuk deploy aplikasi ke production. Ada 2 opsi utama:

---

## 📋 OPSI 1: Netlify + Heroku (Recommended untuk Pemula)

Opsi ini membagi frontend dan backend:
- **Frontend** → Netlify (Static)
- **Backend** → Heroku/Railway/Render (Server)

### Keuntungan:
✅ Netlify free tier cukup baik untuk frontend  
✅ Heroku free tier masih bisa untuk backend  
✅ Mudah di-manage  
✅ Scaling terpisah  

### Kekurangan:
❌ 2 platform berbeda  
❌ Perlu maintain 2 deployment  

---

## 🔧 OPSI 1A: Frontend ke Netlify + Backend ke Heroku

### Step 1: Persiapan Frontend (Netlify)

1. **Prepare Frontend Files**
   ```bash
   # Pastikan semua file di folder public sudah siap
   # index.html, css/style.css, js/app.js
   ```

2. **Update API URL** di `public/js/app.js`:
   ```javascript
   // Ubah dari:
   const API_URL = 'http://localhost:3000/api/generate-content';
   
   // Menjadi:
   const API_URL = 'https://your-backend.herokuapp.com/api/generate-content';
   ```

3. **Create Netlify Configuration** - buat file `netlify.toml`:
   ```toml
   [build]
   command = "echo 'No build needed'"
   publish = "public"

   [[redirects]]
   from = "/api/*"
   to = "https://your-backend.herokuapp.com/api/:splat"
   status = 200
   ```

### Step 2: Deploy Frontend ke Netlify

**Via Git (Recommended):**

1. Push code ke GitHub:
   ```bash
   cd d:\2026\APLIKASI\WEDDINGKONTEN_DESKTOP
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/umkm-ig-generator.git
   git branch -M main
   git push -u origin main
   ```

2. Buka https://app.netlify.com
3. Klik **"New site from Git"**
4. Pilih GitHub, pilih repository
5. Configure:
   - Build command: (kosongkan atau `echo ''`)
   - Publish directory: `public`
6. Deploy!

**Via Drag & Drop (Quick):**

1. Kerjakan semua file di folder `public` dan dependencies
2. Buka https://app.netlify.com/drop
3. Drag & drop folder `public` ke Netlify
4. Selesai!

---

### Step 3: Deploy Backend ke Heroku

**Prerequisites:**
- Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
- Buat akun Heroku: https://www.heroku.com

**Deploy Steps:**

1. **Login ke Heroku:**
   ```bash
   heroku login
   ```

2. **Create Heroku App:**
   ```bash
   cd d:\2026\APLIKASI\WEDDINGKONTEN_DESKTOP
   heroku create your-app-name-backend
   ```

3. **Deploy code ke Heroku:**
   ```bash
   git push heroku main
   ```

4. **Lihat logs:**
   ```bash
   heroku logs --tail
   ```

5. **Get URL:**
   ```bash
   heroku apps:info
   ```
   Backend URL: `https://your-app-name-backend.herokuapp.com`

### Step 4: Update Frontend dengan Backend URL

1. Buka `public/js/app.js`
2. Update:
   ```javascript
   const API_URL = 'https://your-app-name-backend.herokuapp.com/api/generate-content';
   ```

3. Commit & push ke GitHub (Netlify auto-redeploy)
   ```bash
   git add public/js/app.js
   git commit -m "Update API URL for production"
   git push origin main
   ```

---

## 🔥 OPSI 1B: Frontend ke Netlify + Backend ke Railway (More Reliable)

Railway lebih stable daripada Heroku untuk free tier.

### Deploy Backend ke Railway

1. Buka https://railway.app
2. Sign up / Login
3. Klik **"New Project"**
4. Pilih **"Deploy from GitHub"**
5. Authorize & select repository
6. Pilih **"Node.js"**
7. Railway auto-detect & deploy
8. Di tab **"Variables"**, set:
   ```
   PORT=3000
   NODE_ENV=production
   ```
9. Copy URL dari tab **"Deployments"**
   Contoh: `https://umkm-ig-generator-prod.up.railway.app`

10. Update `public/js/app.js`:
    ```javascript
    const API_URL = 'https://umkm-ig-generator-prod.up.railway.app/api/generate-content';
    ```

---

## 💎 OPSI 2: Vercel (Best for Node.js - All in One)

Vercel adalah platform terbaik untuk full-stack Node.js apps.

### Keuntungan:
✅ Backend & Frontend dalam 1 platform  
✅ Auto-scaling  
✅ Better performance  
✅ Easy environment variables  
✅ Integrated CDN  

### Kekurangan:
❌ Paid untuk high traffic  
❌ Sedikit lebih complex setup  

### Deploy Steps:

1. **Setup Vercel Project Structure**
   ```bash
   # Buat folder untuk serverless functions
   mkdir -p api
   
   # Move server logic ke api/generate.js
   # (lihat file berikutnya untuk kode)
   ```

2. **Create `vercel.json`:**
   ```json
   {
     "buildCommand": "npm install",
     "regions": ["sin1"],
     "functions": {
       "api/**/*.js": {
         "memory": 1024,
         "maxDuration": 60
       }
     }
   }
   ```

3. **Update `public/js/app.js`:**
   ```javascript
   const API_URL = window.location.origin + '/api/generate-content';
   ```

4. **Push ke GitHub & Deploy:**
   ```bash
   git push origin main
   ```

5. **Vercel auto-detect dan deploy!**
   URL: `https://your-project.vercel.app`

---

## 🔐 Environment Variables & CORS

### Untuk Heroku/Railway:

1. Di dashboard, set environment variables:
   ```
   PORT=3000
   NODE_ENV=production
   CORS_ORIGIN=https://your-netlify-site.netlify.app
   ```

2. Update `server.js`:
   ```javascript
   const corsOptions = {
     origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
     credentials: true
   };
   app.use(cors(corsOptions));
   ```

---

## 📝 Complete Deployment Checklist

### Pre-Deployment:
- [ ] Test aplikasi di local
- [ ] Update API URLs sesuai environment
- [ ] Setup .env files dengan secrets
- [ ] Review error handling
- [ ] Test di production mode: `NODE_ENV=production npm start`

### Frontend Deployment (Netlify):
- [ ] Push ke GitHub
- [ ] Connect repo ke Netlify
- [ ] Set build settings
- [ ] Configure environment variables
- [ ] Test production URL
- [ ] Setup custom domain (optional)

### Backend Deployment (Heroku/Railway):
- [ ] Login ke platform
- [ ] Create app
- [ ] Set environment variables
- [ ] Deploy code
- [ ] Check logs
- [ ] Test API endpoints
- [ ] Configure custom domain (optional)

### Post-Deployment:
- [ ] Test full application flow
- [ ] Check CORS issues
- [ ] Monitor logs
- [ ] Setup monitoring/alerts
- [ ] Configure auto-scaling (optional)

---

## 🐛 Troubleshooting

### CORS Error di Production
```javascript
// Di server.js
app.use(cors({
  origin: ['https://netlify-url.netlify.app', 'https://custom-domain.com'],
  credentials: true
}));
```

### API Timeout
- Heroku free dyno sleep after 30 min → Upgrade atau gunakan Railway
- Check backend logs: `heroku logs --tail`

### Netlify Deployment Failed
- Check build logs
- Verify folder structure
- Make sure `public` folder exists

### HTTPS Mixed Content
- Make sure API URL di frontend gunakan `https://`
- Netlify auto-redirect HTTP ke HTTPS

---

## 💰 Cost Estimate

### Option 1A: Netlify + Heroku
| Service | Tier | Cost |
|---------|------|------|
| Netlify | Free (100GB bandwidth) | $0 |
| Heroku | Free Dyno (sleep after 30min) | $0 |
| **Total** | | **$0** (basic) |

Upgrade:
- Heroku Eco Dyno: $7/month (no sleep)
- Netlify Pro: $19/month (higher limits)

### Option 1B: Netlify + Railway
| Service | Tier | Cost |
|---------|------|------|
| Netlify | Free | $0 |
| Railway | Pay-as-you-go ($5/month credit) | $0-5 |
| **Total** | | **$0-5** |

### Option 2: Vercel
| Service | Tier | Cost |
|---------|------|------|
| Vercel | Hobby (free) | $0 |
| Vercel | Pro (scaling) | $20/month |
| **Total** | | **$0-20** |

---

## 🎯 Recommended Setup for Production

**Best Balance (Recommended):**
```
Frontend: Netlify (Free tier bagus)
Backend: Railway (Better than Heroku free)
Database: Supabase (PostgreSQL free, jika butuh)
```

**URL Example:**
- Frontend: `https://umkm-ig-generator.netlify.app`
- Backend: `https://umkm-ig-generator-prod.up.railway.app`
- Custom Domain: `https://umkm.konten.id` (optional, $1-15/year)

---

## 📞 Quick Links

- **Netlify**: https://www.netlify.com
- **Heroku**: https://www.heroku.com
- **Railway**: https://railway.app
- **Vercel**: https://vercel.com
- **GitHub**: https://github.com

---

## 🚀 Next Steps

1. **Pilih opsi** (Opsi 1A, 1B, atau 2)
2. **Setup Git repo** di GitHub
3. **Deploy frontend** ke Netlify
4. **Deploy backend** ke Heroku/Railway
5. **Update API URLs**
6. **Test production**
7. **Setup monitoring**
8. **Custom domain** (optional)

Good luck! 🎉

