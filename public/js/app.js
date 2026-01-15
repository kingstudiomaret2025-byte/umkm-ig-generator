// ===== UMKM Instagram Content Generator - Frontend Application =====
// Client-side JavaScript untuk komunikasi dengan backend API

// ===== API CONFIGURATION =====
const API_URL = 'http://localhost:3000/api/generate-content';

// ===== FORM SUBMISSION =====
document.getElementById('generatorForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form values
    const businessName = document.getElementById('businessName').value;
    const businessType = document.getElementById('businessType').value;
    const targetMarket = document.getElementById('targetMarket').value;
    const productPromo = document.getElementById('productPromo').value;
    const tone = document.getElementById('tone').value;

    // Validation
    if (!businessName || !businessType || !targetMarket || !productPromo || !tone) {
        alert('❌ Semua field harus diisi!');
        return;
    }

    // Show loading state
    document.getElementById('loading').style.display = 'block';
    document.getElementById('generatorForm').querySelector('.generate-btn').disabled = true;

    try {
        // Call backend API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                businessName,
                businessType,
                targetMarket,
                productPromo,
                tone
            })
        });

        const data = await response.json();

        if (data.success) {
            // Display results
            displayResults(data.data.content);
            document.getElementById('generatorResults').style.display = 'block';
            scrollToSection('generatorResults');
        } else {
            alert('❌ Error: ' + data.message);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('❌ Terjadi kesalahan saat menghubungi server. Pastikan server sedang berjalan di port 3000');
    } finally {
        // Hide loading state
        document.getElementById('loading').style.display = 'none';
        document.getElementById('generatorForm').querySelector('.generate-btn').disabled = false;
    }
});

// ===== DISPLAY RESULTS =====
function displayResults(content) {
    // Display Feed Ideas
    displayIdeas(content.feed, 'feedResults');

    // Display Reels Ideas
    displayIdeas(content.reels, 'reelsResults');

    // Display Story Ideas
    displayIdeas(content.story, 'storyResults');

    // Display Copy & Hashtag
    displayCopyData(content.copy);
}

function displayIdeas(ideas, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    ideas.forEach((idea, index) => {
        const ideaText = idea.text.replace(/'/g, "\\'");
        const html = `
            <div class="idea-item">
                <div class="idea-title">${idea.title}</div>
                <div class="idea-text">${idea.text}</div>
                <button class="copy-btn" onclick="copyToClipboard('${ideaText}')">📋 Copy Ide</button>
            </div>
        `;
        container.innerHTML += html;
    });
}

function displayCopyData(data) {
    const container = document.getElementById('copyResults');
    
    const hookEscaped = data.hook.replace(/'/g, "\\'");
    const captionEscaped = data.caption.replace(/'/g, "\\'").replace(/\n/g, '\\n');
    const ctaEscaped = data.cta.replace(/'/g, "\\'");
    const hashtagEscaped = data.hashtag.replace(/'/g, "\\'");
    
    container.innerHTML = `
        <div class="idea-item">
            <div class="idea-title">🎣 Hook / Opening</div>
            <div class="idea-text">${data.hook}</div>
            <button class="copy-btn" onclick="copyToClipboard('${hookEscaped}')">📋 Copy Hook</button>
        </div>

        <div class="idea-item">
            <div class="idea-title">✍️ Recommended Caption</div>
            <div class="idea-text">${data.caption.replace(/\n/g, '<br>')}</div>
            <button class="copy-btn" onclick="copyToClipboard('${captionEscaped}')">📋 Copy Caption</button>
        </div>

        <div class="idea-item">
            <div class="idea-title">🎯 Call To Action</div>
            <div class="idea-text">${data.cta}</div>
            <button class="copy-btn" onclick="copyToClipboard('${ctaEscaped}')">📋 Copy CTA</button>
        </div>

        <div class="idea-item">
            <div class="idea-title">🏷️ Recommended Hashtags</div>
            <div class="idea-text">${data.hashtag}</div>
            <button class="copy-btn" onclick="copyToClipboard('${hashtagEscaped}')">📋 Copy Hashtags</button>
        </div>
    `;
}

// ===== TAB SWITCHING =====
function switchTab(tabName) {
    // Hide all contents
    document.querySelectorAll('.result-content').forEach(el => {
        el.classList.remove('active');
    });

    // Remove active from all tabs
    document.querySelectorAll('.result-tab').forEach(el => {
        el.classList.remove('active');
    });

    // Show selected content
    const contentElement = document.getElementById(tabName + '-content');
    if (contentElement) {
        contentElement.classList.add('active');
    }

    // Activate corresponding tab
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
    // Decode escaped characters
    text = text.replace(/\\n/g, '\n').replace(/\\'/g, "'");
    
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('copied');
    }, 2000);
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(elementId) {
    const element = document.getElementById(elementId) || document.querySelector(elementId);
    if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// Pricing & CTA Handlers
function buyNow(plan) {
    alert(`✅ Anda memilih paket ${plan}.\n\nAnda akan dialihkan ke halaman pembayaran untuk memulai platform kami.\n\nGratis 7 hari pertama!`);
}

function contactSales() {
    alert('Terima kasih minat dengan paket Enterprise.\n\nTim sales kami akan menghubungi Anda dalam 2x24 jam.\n\nEmail: sales@umkmigenerator.com\nWhatsApp: +62-812-3456-7890');
}

// ===== PAGE LOAD EVENT =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ UMKM Instagram Content Generator - Frontend Loaded');
    
    // Check if backend is running
    fetch('http://localhost:3000/api/health')
        .then(response => response.json())
        .then(data => {
            console.log('✅ Backend API Connected:', data);
        })
        .catch(error => {
            console.warn('⚠️ Backend not running. Make sure to start server with: npm start');
        });
});
