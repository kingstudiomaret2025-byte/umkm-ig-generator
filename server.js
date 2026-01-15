// ===== UMKM Instagram Content Generator - Backend Server =====
// Express.js server untuk API content generation

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
// CORS Configuration untuk production
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5000',
            'https://umkm-ig-generator.netlify.app',
            'https://umkm-ig-generator-prod.up.railway.app',
            'https://umkm-ig-generator.vercel.app',
            process.env.FRONTEND_URL || ''
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// ===== CONTENT GENERATION ENGINE (In-Memory Database) =====

// Hook Generator
function generateHook(businessType, style) {
    const hooks = {
        casual: [
            '🤔 Udah tau belum bahaya ini?',
            '⚠️ Jangan sampai ketinggalan!',
            '😱 Ini baru banget!',
            '✨ Boleh gak sih beginilah?',
            '💡 Ada trick yang belum Anda coba...',
            '🔥 Ini trending banget sekarang!',
            '👀 Lihat hasil akhirnya!',
            '⏰ Kesempatan terbatas nih!'
        ],
        formal: [
            '📌 Penting untuk Anda ketahui',
            '💼 Solusi tepat untuk masalah Anda',
            '🎯 Cara efektif yang terbukti',
            '📊 Data menunjukkan...',
            '✅ Rekomendasi expert kami',
            '🏆 Pilihan terbaik di kelasnya',
            '💡 Inovasi terbaru kami',
            '🌟 Kualitas premium'
        ]
    };
    
    const hookList = hooks[style] || hooks.casual;
    return hookList[Math.floor(Math.random() * hookList.length)];
}

// Caption Generator
function generateCaption(businessName, productPromo, tone) {
    let caption = `Hi guys! 👋\n\n`;
    
    if (tone === 'santai' || tone === 'humor') {
        caption += `Kali ini ${businessName} mau kasih penawaran special nih!\n\n`;
        caption += `${productPromo}\n\n`;
        caption += `Jangan sampai terlewat ya, stock terbatas! 🔥\n\n`;
        caption += `Penasaran? Cek link di bio atau slide ke DM kami! 😊`;
    } else {
        caption += `Kami dengan bangga persembahkan solusi terbaik untuk kebutuhan Anda.\n\n`;
        caption += `${productPromo}\n\n`;
        caption += `Kualitas terjamin, harga terjangkau, dan layanan prima.\n\n`;
        caption += `Hubungi kami sekarang untuk info lebih lanjut. 💼`;
    }
    
    return caption;
}

// CTA Generator
function generateCTA(tone) {
    const ctas = {
        santai: [
            '👉 Tap link di bio sekarang!',
            '👉 DM kami untuk order!',
            '👉 Langsung order lewat WhatsApp!',
            '👉 Jangan tunda lagi, order sekarang!',
            '👉 Chat kami untuk penawaran terbaik!'
        ],
        formal: [
            '👉 Hubungi kami untuk pemesanan',
            '👉 Kunjungi website kami untuk details',
            '👉 Segera hubungi tim penjualan kami',
            '👉 Daftar sekarang untuk mendapatkan penawaran eksklusif',
            '👉 Hubungi kami via WhatsApp atau email'
        ]
    };
    
    const ctaList = ctas[tone] || ctas.santai;
    return ctaList[Math.floor(Math.random() * ctaList.length)];
}

// Hashtag Generator
function generateHashtag(businessType, businessName) {
    const baseHashtags = {
        kuliner: ['#MakananLezat', '#ResepMudah', '#HomemadeFood', '#CulineryLovers', '#FoodBusiness', '#CulinerIndonesia', '#JajananEnak'],
        fashion: ['#OOTD', '#FashionStyle', '#OnlineBoutique', '#StyleInspiration', '#FashionLover', '#TrendingFashion', '#GayaBerpakaian'],
        kecantikan: ['#BeautyTips', '#SkincareRoutine', '#GlowUp', '#BeautyJourney', '#SkinHealth', '#BeautyGoals', '#KecantikanAlami'],
        jasa: ['#LayananProfesional', '#TipsDanTrik', '#ServisUnggul', '#CustomerFirst', '#KualitasTerjamin', '#JasaTerpercaya'],
        online_shop: ['#OnlineShop', '#ShoppingOnline', '#NewArrivals', '#SpecialOffer', '#LimitedStock', '#JualBeli', '#TokoOnline'],
        kerajinan: ['#Handmade', '#KaryaTangan', '#UKMIndonesia', '#CraftArt', '#DesainUnik'],
        education: ['#BelajarOnline', '#KursusOnline', '#EdukasiBisnis', '#TipsMarketing', '#PengembangandiriGl'],
        fitness: ['#FitnessGoals', '#SehatItuAsik', '#OlahragaSehat', '#GymLife', '#TransformationJourney']
    };
    
    const selectedHashtags = baseHashtags[businessType] || baseHashtags.online_shop;
    const customHashtags = [
        '#' + businessName.replace(/\s/g, ''),
        '#Promo',
        '#Diskon',
        '#LimitedTime',
        '#JanganSampaiterlewat',
        '#IndonesiaBangga',
        '#SupportLokal'
    ];
    
    return [...selectedHashtags, ...customHashtags].slice(0, 15).join(' ');
}

// Feed Ideas Generator
function generateFeedIdeas(businessName, businessType, targetMarket, productPromo, tone) {
    const ideas = [
        {
            title: '1. "Cerita di Balik Produk Kami"',
            text: `Berbagi cerita bagaimana produk ${businessName} dibuat. Tunjukkan proses, ingredients, atau craftsmanship. Fokus pada value yang diterima customer.`
        },
        {
            title: '2. "Testimonial & Success Stories"',
            text: `Share foto + quote dari customer yang puas. Kasih nama, foto, dan apa yang mereka dapatkan. Real testimonial sangat powerful untuk persuasi.`
        },
        {
            title: '3. "Produk Showcase dengan Benefit"',
            text: `Foto produk Anda dengan copywriting jelas tentang benefit utama. Jangan hanya showcase, tapi jelaskan why customers perlu ini.`
        },
        {
            title: '4. "Tips & Trick Relevan untuk Audience"',
            text: `Share tips yang berguna untuk target market Anda. Contoh: Jika jualan skincare, share 5 cara merawat kulit. Tips itu harus relate dengan produk Anda (soft promotion).`
        },
        {
            title: '5. "Behind The Scenes & Fun Moments"',
            text: `Tunjukkan team, proses packing, atau momen fun di office/workshop. Build connection personal dengan audience. Tone bisa santai dan relatable.`
        }
    ];
    
    return ideas;
}

// Reels Ideas Generator
function generateReelsIdeas(businessName, businessType, targetMarket, productPromo, tone) {
    const ideas = [
        {
            title: '1. "Quick Tutorial atau Cara Pakai"',
            text: `Buat video pendek (15-30 detik) showing cara pakai/apply produk Anda. Format: Problem → Solution (produk Anda) → Result. Hook di awal 0.5 detik crucial.`
        },
        {
            title: '2. "Transformation atau Before-After"',
            text: `Jika applicable: Before → After hasil pakai produk. Visual yang shocking & satisfying = high engagement. Trending format yang proven convert.`
        },
        {
            title: '3. "Trending Sound + Product Placement"',
            text: `Gunakan trending music dari TikTok/Instagram. Integrate produk Anda secara natural. Jangan hard-sell, tapi creative & entertaining.`
        },
        {
            title: '4. "Quick Answer to Common Questions"',
            text: `Jawab pertanyaan yang sering diajukan audience tentang produk Anda. Format: Pertanyaan → Jawab cepat. Valuable content = more saves & shares.`
        },
        {
            title: '5. "Day in The Life atau Lifestyle"',
            text: `Tunjukkan lifestyle pemakai produk Anda. Bagaimana produk ini jadi bagian dari daily routine mereka. Aspiration marketing yang powerful.`
        }
    ];
    
    return ideas;
}

// Story Ideas Generator
function generateStoryIdeas(businessName, targetMarket, productPromo, tone) {
    const ideas = [
        {
            title: '1. "Flash Sale / Limited Offer"',
            text: `Announce promo mendadak (limited time). Create urgency & FOMO. Kasih countdown timer & clear CTA (tap link atau DM untuk order).`
        },
        {
            title: '2. "Question & Poll untuk Engagement"',
            text: `Tanyakan preference audience (A or B?). Audience lebih engage dengan story yang interactive. Data yang Anda kumpul bisa jadi market research.`
        },
        {
            title: '3. "New Product Launch Teaser"',
            text: `Build anticipation untuk produk baru. Kasih clue, behind-the-scenes, atau countdown untuk launch day. Keep audience engaged & excited.`
        },
        {
            title: '4. "Customer Spotlight & Appreciation"',
            text: `Feature customer yang loyal. Kasih shoutout, thank you message. Customer merasa diapresiasi = lebih sering order & recommend ke temen.`
        },
        {
            title: '5. "Motivasi & Quotes Relevan"',
            text: `Share inspirasi quotes yang relate dengan audience Anda. Soft promotion through value. Tone bisa santai, fun, atau motivatif sesuai brand Anda.`
        }
    ];
    
    return ideas;
}

// ===== API ENDPOINTS =====

// Root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: Generate Content
app.post('/api/generate-content', (req, res) => {
    try {
        const {
            businessName,
            businessType,
            targetMarket,
            productPromo,
            tone
        } = req.body;

        // Validation
        if (!businessName || !businessType || !targetMarket || !productPromo || !tone) {
            return res.status(400).json({
                success: false,
                message: 'Semua field harus diisi'
            });
        }

        // Generate all content
        const hookStyle = tone === 'santai' || tone === 'humor' ? 'casual' : 'formal';
        
        const response = {
            success: true,
            data: {
                businessName,
                businessType,
                timestamp: new Date().toISOString(),
                content: {
                    feed: generateFeedIdeas(businessName, businessType, targetMarket, productPromo, tone),
                    reels: generateReelsIdeas(businessName, businessType, targetMarket, productPromo, tone),
                    story: generateStoryIdeas(businessName, targetMarket, productPromo, tone),
                    copy: {
                        hook: generateHook(businessType, hookStyle),
                        caption: generateCaption(businessName, productPromo, tone),
                        cta: generateCTA(tone),
                        hashtag: generateHashtag(businessType, businessName)
                    }
                }
            }
        };

        res.json(response);

    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat generate konten'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'UMKM Instagram Content Generator API is running'
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    const env = process.env.NODE_ENV || 'development';
    const mode = env === 'production' ? '⚡ PRODUCTION' : '🔧 DEVELOPMENT';
    
    console.log(`\n`);
    console.log(`╔════════════════════════════════════════╗`);
    console.log(`║   UMKM Instagram Content Generator    ║`);
    console.log(`║   Server Running! ${mode}    ║`);
    console.log(`╠════════════════════════════════════════╣`);
    console.log(`║  Server: http://localhost:${PORT}`);
    console.log(`║  API: http://localhost:${PORT}/api     ║`);
    console.log(`║  Health: http://localhost:${PORT}/api/health`);
    console.log(`║  Environment: ${env.toUpperCase()}`);
    console.log(`╚════════════════════════════════════════╝`);
    console.log(`\nServer started at ${new Date().toLocaleString()}\n`);
});

module.exports = app;
