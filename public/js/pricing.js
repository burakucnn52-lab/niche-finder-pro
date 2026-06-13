/* NICHIFY PRO - PRICING JS (Güvenli Versiyon) */

console.log('🚀 pricing.js başladı!');

const TRANSLATIONS = {
  tr: {
    'nav.features': 'Özellikler',
    'nav.pricing': 'Fiyatlandırma',
    'nav.faq': 'SSS',
    'nav.login': 'Giriş Yap',
    'nav.signup': 'Ücretsiz Başla',
    'hero.badge1': 'Lifetime Deal -',
    'hero.badge2': 'Slot Kaldı!',
    'hero.title1': 'Kazançlı Nişleri',
    'hero.title2': 'Keşfet',
    'hero.title3': 've Büyüt',
    'hero.subtitle': 'Tüm planlar 14 gün iade garantilidir.',
    'lifetime.founder': 'KURUCU ÜYE FIRSATI',
    'lifetime.title': 'Bir Defa Öde, Ömür Boyu Kullan',
    'lifetime.subtitle': 'İlk 100 kişiye özel. Tüm özellikler dahil.',
    'lifetime.left': 'kişilik kontenjan kaldı!',
    'lifetime.oneTime': 'tek seferlik ödeme',
    'lifetime.cta': 'Hemen Satın Al',
    'lifetime.guarantee': '⚡ Anında aktivasyon · 🔒 Güvenli ödeme · 💯 14 gün iade',
    'plans.title1': 'Aylık',
    'plans.title2': 'Planlar',
    'plans.subtitle': 'Bütçene göre planı seç',
    'plans.perMonth': '/ay',
    'plans.popular': 'EN POPÜLER',
    'plans.choose': 'Planı Seç',
    'starter.desc': 'Yeni başlayanlar için',
    'creator.desc': 'Aktif YouTuber\'lar için',
    'growth.desc': 'Büyüyen kanallar için',
    'allinone.desc': 'Profesyoneller için',
    'features.searchPerDay': 'niş arama/gün',
    'features.searches': 'arama',
    'features.basicData': 'Temel niş verileri',
    'features.microNiche': 'Mikro niş üretici',
    'features.countries': 'ülke trend verisi',
    'features.favorites': 'favori',
    'features.estimatedEarnings': 'Tahmini kazanç',
    'features.emailSupport': 'Email destek',
    'features.aiAssistant': 'AI Asistan',
    'features.hiddenOpp': 'Hidden Opportunity',
    'features.riskDetector': 'Risk Detector',
    'features.channelAnalysis': 'Kanal Analizi',
    'features.pdfExport': 'PDF Export',
    'features.allBasic': 'Tüm temel özellikler',
    'features.allCountries': '11 ülke trend verisi',
    'features.prioritySupport': 'Öncelikli destek',
    'features.unlimited': 'Sınırsız',
    'features.everything': 'Her şey dahil',
    'features.apiAccess': 'API Erişimi',
    'features.vipSupport': 'VIP Destek',
    'footer.rights': 'Tüm hakları saklıdır.'
  },
  en: {
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.login': 'Login',
    'nav.signup': 'Start Free',
    'hero.badge1': 'Lifetime Deal -',
    'hero.badge2': 'Slots Left!',
    'hero.title1': 'Discover Profitable',
    'hero.title2': 'Niches',
    'hero.title3': 'and Grow',
    'hero.subtitle': 'All plans come with 14-day money-back guarantee.',
    'lifetime.founder': 'FOUNDER MEMBER OFFER',
    'lifetime.title': 'Pay Once, Use Forever',
    'lifetime.subtitle': 'For first 100 users. All features included.',
    'lifetime.left': 'slots left!',
    'lifetime.oneTime': 'one-time payment',
    'lifetime.cta': 'Buy Now',
    'lifetime.guarantee': '⚡ Instant activation · 🔒 Secure payment · 💯 14-day refund',
    'plans.title1': 'Monthly',
    'plans.title2': 'Plans',
    'plans.subtitle': 'Choose the plan that fits your budget',
    'plans.perMonth': '/mo',
    'plans.popular': 'MOST POPULAR',
    'plans.choose': 'Choose Plan',
    'starter.desc': 'For beginners',
    'creator.desc': 'For active YouTubers',
    'growth.desc': 'For growing channels',
    'allinone.desc': 'For professionals',
    'features.searchPerDay': 'niche searches/day',
    'features.searches': 'searches',
    'features.basicData': 'Basic niche data',
    'features.microNiche': 'Micro niche generator',
    'features.countries': 'country trend data',
    'features.favorites': 'favorites',
    'features.estimatedEarnings': 'Estimated earnings',
    'features.emailSupport': 'Email support',
    'features.aiAssistant': 'AI Assistant',
    'features.hiddenOpp': 'Hidden Opportunity',
    'features.riskDetector': 'Risk Detector',
    'features.channelAnalysis': 'Channel Analysis',
    'features.pdfExport': 'PDF Export',
    'features.allBasic': 'All basic features',
    'features.allCountries': '11 countries trend data',
    'features.prioritySupport': 'Priority support',
    'features.unlimited': 'Unlimited',
    'features.everything': 'Everything included',
    'features.apiAccess': 'API Access',
    'features.vipSupport': 'VIP Support',
    'footer.rights': 'All rights reserved.'
  }
};

let currentLang = 'tr';
let currentCurrency = 'TRY';

async function detectLocation() {
  console.log('🌍 IP tespiti başlıyor...');
  
  try {
    const savedLang = localStorage.getItem('nichify_lang');
    const savedCur = localStorage.getItem('nichify_currency');
    
    if (savedLang && savedCur) {
      currentLang = savedLang;
      currentCurrency = savedCur;
      console.log('💾 Kayıtlı dil:', currentLang, currentCurrency);
      return;
    }
    
    const r = await fetch('https://ipapi.co/json/');
    const d = await r.json();
    console.log('🌐 IP ülke:', d.country_code);
    
    if (d.country_code === 'TR') {
      currentLang = 'tr';
      currentCurrency = 'TRY';
    } else {
      currentLang = 'en';
      currentCurrency = 'USD';
    }
    
    localStorage.setItem('nichify_lang', currentLang);
    localStorage.setItem('nichify_currency', currentCurrency);
  } catch (e) {
    console.log('❌ IP hatası:', e.message);
    currentLang = 'tr';
    currentCurrency = 'TRY';
  }
}

function applyTranslations() {
  try {
    console.log('📝 Çeviriler uygulanıyor:', currentLang);
    const t = TRANSLATIONS[currentLang];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });
    
    console.log('✅ Çeviriler tamam');
  } catch (e) {
    console.error('❌ Çeviri hatası:', e);
  }
}

function updatePrices() {
  try {
    console.log('💰 Fiyatlar güncelleniyor:', currentCurrency);
    const isTL = currentCurrency === 'TRY';
    
    const priceElements = document.querySelectorAll('[data-price-tr]');
    console.log('🏷️ Bulunan fiyat sayısı:', priceElements.length);
    
    priceElements.forEach(el => {
      const trPrice = el.getAttribute('data-price-tr');
      const enPrice = el.getAttribute('data-price-en');
      el.textContent = isTL ? trPrice : enPrice;
    });
    
    document.querySelectorAll('[data-currency-symbol]').forEach(el => {
      el.textContent = isTL ? '₺' : '$';
    });
    
    document.querySelectorAll('[data-old-tr]').forEach(el => {
      const trOld = el.getAttribute('data-old-tr');
      const enOld = el.getAttribute('data-old-en');
      el.textContent = isTL ? trOld : enOld;
    });
    
    console.log('✅ Fiyatlar tamam');
  } catch (e) {
    console.error('❌ Fiyat hatası:', e);
  }
}

function updateSwitcher() {
  try {
    const flag = document.getElementById('currentFlag');
    const lang = document.getElementById('currentLang');
    const cur = document.getElementById('currentCurrency');
    
    if (flag) flag.textContent = currentLang === 'tr' ? '🇹🇷' : '🌍';
    if (lang) lang.textContent = currentLang.toUpperCase();
    if (cur) cur.textContent = currentCurrency === 'TRY' ? 'TL' : 'USD';
  } catch (e) {
    console.error('❌ Switcher hatası:', e);
  }
}

function changeLang(lang, currency) {
  console.log('🔄 Dil değişiyor:', lang, currency);
  currentLang = lang;
  currentCurrency = currency;
  localStorage.setItem('nichify_lang', lang);
  localStorage.setItem('nichify_currency', currency);
  
  applyTranslations();
  updatePrices();
  updateSwitcher();
  
  const dropdown = document.getElementById('langDropdown');
  if (dropdown) dropdown.classList.remove('show');
}

function setupEvents() {
  try {
    const toggle = document.getElementById('langToggle');
    const dropdown = document.getElementById('langDropdown');
    
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dropdown) dropdown.classList.toggle('show');
      });
    }
    
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        const cur = opt.getAttribute('data-currency');
        changeLang(lang, cur);
      });
    });
    
    document.addEventListener('click', () => {
      if (dropdown) dropdown.classList.remove('show');
    });
    
    document.querySelectorAll('.plan-btn, #buyLifetimeBtn, #buyLifetimeBtn2').forEach(btn => {
      btn.addEventListener('click', () => {
        const plan = btn.getAttribute('data-plan');
        alert(currentLang === 'tr' 
          ? '🚀 Ödeme sistemi yakında aktif!'
          : '🚀 Payment system coming soon!'
        );
        setTimeout(() => {
          window.location.href = '/register?plan=' + plan;
        }, 1500);
      });
    });
    
    console.log('✅ Events tamam');
  } catch (e) {
    console.error('❌ Event hatası:', e);
  }
}

// BAŞLAT
(async function() {
  console.log('🎬 Init başlıyor...');
  await detectLocation();
  applyTranslations();
  updatePrices();
  updateSwitcher();
  setupEvents();
  console.log('✅ TÜM SİSTEM HAZIR!');
})();
