# UMKM Instagram Content Generator

Platform web aplikasi untuk generate konten Instagram otomatis khusus untuk UMKM.

## 📋 Fitur Utama

- ✅ Generate 15 ide konten sekaligus (Feed, Reels, Story)
- ✅ Caption persuasif dengan hook dan CTA
- ✅ Hashtag relevan otomatis
- ✅ Multiple jenis usaha support
- ✅ Tone bahasa customizable
- ✅ Copy-paste hasil langsung ke Instagram
- ✅ API backend dengan Node.js Express
- ✅ Responsive design (mobile friendly)
- ✅ UI/UX premium seperti startup

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```bash
npm install
```

### 2. Jalankan Backend Server

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

### 3. Akses Aplikasi

Buka browser dan go ke:
```
http://localhost:3000
```

## 📁 Struktur Project

```
WEDDINGKONTEN_DESKTOP/
├── server.js              # Backend Express server
├── package.json           # Dependency management
├── public/                # Frontend files
│   ├── index.html        # Main HTML
│   ├── css/
│   │   └── style.css     # Styling
│   └── js/
│       └── app.js        # Frontend logic
└── README.md             # Documentation
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, CORS
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: RESTful API dengan JSON
- **Storage**: In-memory (bisa dikembangkan dengan database)

## 📡 API Endpoints

### POST /api/generate-content

Generate ide konten Instagram

**Request Body:**
```json
{
  "businessName": "Nama Bisnis",
  "businessType": "kuliner|fashion|kecantikan|jasa|online_shop|kerajinan|education|fitness",
  "targetMarket": "Deskripsi target market",
  "productPromo": "Deskripsi produk/promo",
  "tone": "formal|santai|inspiratif|humor|mix"
}
```

**Response Success:**
```json
{
  "success": true,
  "data": {
    "businessName": "...",
    "businessType": "...",
    "timestamp": "...",
    "content": {
      "feed": [...],
      "reels": [...],
      "story": [...],
      "copy": {
        "hook": "...",
        "caption": "...",
        "cta": "...",
        "hashtag": "..."
      }
    }
  }
}
```

### GET /api/health

Health check endpoint

## 🎯 Output Konten

Setiap generate akan menghasilkan:

1. **5 Feed Ideas** - Post regular Instagram
2. **5 Reels Ideas** - Video pendek TikTok/Reels style
3. **5 Story Ideas** - Instagram Stories content
4. **Copy Elements**:
   - Hook/Opening persuasif
   - Caption lengkap siap pakai
   - Call To Action clear
   - Hashtag relevan (15 hashtag)

## 💡 Cara Menggunakan

1. Isi form dengan:
   - Nama bisnis Anda
   - Jenis usaha
   - Target market Anda
   - Produk/promo yang diinginkan
   - Tone bahasa (formal/santai)

2. Klik "Generate Konten Sekarang"

3. Tunggu 2-3 detik untuk hasil

4. Baca hasil di 4 tab (Feed, Reels, Story, Copy)

5. Klik "Copy" pada setiap idea

6. Paste langsung ke Instagram atau editor

## 🔧 Development

### Menjalankan dengan Watch Mode

```bash
npm run dev
```

### Mengubah Port

Edit di `server.js` atau set environment variable:

```bash
set PORT=5000
npm start
```

## 📱 Supported Business Types

- Kuliner (Makanan & Minuman)
- Fashion & Pakaian
- Kecantikan & Skincare
- Jasa (Salon, Laundry, dll)
- Online Shop (General)
- Kerajinan & Handmade
- Pendidikan & Kursus
- Fitness & Kesehatan

## 🎨 Tone Bahasa

- **Formal** - Professional, corporate-style
- **Santai** - Casual, friendly tone
- **Inspiratif** - Motivational content
- **Humor** - Fun & entertaining
- **Mix** - Combination santai + profesional

## 📈 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication & login
- [ ] Save/bookmark favorites
- [ ] Schedule posting integration
- [ ] Analytics & performance tracking
- [ ] AI improvement dengan training data
- [ ] Premium features & pricing
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Template library customization

## 🐛 Troubleshooting

### Server tidak berjalan
```bash
# Check if port 3000 is already in use
netstat -ano | findstr :3000

# Kill process atau gunakan port lain
set PORT=3001
npm start
```

### CORS Error
```bash
# Already handled in server.js
# Jika error persisten, check CORS middleware
```

### Frontend tidak connect ke backend
```bash
# Make sure backend is running on http://localhost:3000
# Check browser console (F12) untuk error messages
```

## 📄 License

MIT License - Open Source

## 👨‍💻 Author

UMKM Instagram Content Generator Team

## 📞 Support

- Email: support@umkmigenerator.com
- WhatsApp: +62-812-3456-7890
- Documentation: Check README.md

---

**Happy Creating Content! 🚀📱**
