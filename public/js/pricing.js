/* ============================================
   NICHIFY PRO - PRICING PAGE JS
   IP Tespit + Dil/Para Toggle + LemonSqueezy
   ============================================ */

// ============================================
// LEMONSQUEEZY CHECKOUT URL'LERİ
// BURAYA LEMONSQUEEZY'DEN ALDIĞIN URL'LERİ YAPIŞTIR
// ============================================
const CHECKOUT_URLS = {
  starter: {
    TRY: 'https://nichify.lemonsqueezy.com/buy/STARTER-TR-VARIANT-ID',
    USD: 'https://nichify.lemonsqueezy.com/buy/STARTER-GLOBAL-VARIANT-ID'
  },
  creator: {
    TRY: 'https://nichify.lemonsqueezy.com/buy/CREATOR-TR-VARIANT-ID',
    USD: 'https://nichify.lemonsqueezy.com/buy/CREATOR-GLOBAL-VARIANT-ID'
  },
  growth: {
    TRY: 'https://nichify.lemonsqueezy.com/buy/GROWTH-TR-VARIANT-ID',
    USD: 'https://nichify.lemonsqueezy.com/buy/GROWTH-GLOBAL-VARIANT-ID'
  },
  allinone: {
    TRY: 'https://nichify.lemonsqueezy.com/buy/ALLINONE-TR-VARIANT-ID',
    USD: 'https://nichify.lemonsqueezy.com/buy/ALLINONE-GLOBAL-VARIANT-ID'
  },
  lifetime: {
    TRY: 'https://nichify.lemonsqueezy.com/buy/LIFETIME-TR-VARIANT-ID',
    USD: 'https://nichify.lemonsqueezy.com/buy/LIFETIME-GLOBAL-VARIANT-ID'
  }
};

// ============================================
// ÇEVİRİLER
// ============================================
const TRANSLATIONS = {
  tr: {
    'pageTitle': 'Fiyatlandırma - NICHIFY PRO',
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
    'hero.subtitle': 'Tüm planlar 14 gün iade garantilidir. İhtiyacın olan planı seç, istediğin zaman değiştir.',
    'lifetime.founder': 'KURUCU ÜYE FIRSATI',
    'lifetime.title': 'Bir Defa Öde, Ömür Boyu Kullan',
    'lifetime.subtitle': 'İlk 100 kişiye özel. Tüm özellikler + gelecek güncellemeler dahil.',
    'lifetime.left': 'kişilik kontenjan kaldı!',
    'lifetime.oneTime': 'tek seferlik ödeme',
    'lifetime.cta': 'Hemen Satın Al',
    'lifetime.guarantee': '⚡ Anında aktivasyon · 🔒 Güvenli ödeme · 💯 14 gün iade',
    'plans.title1': 'Aylık',
    'plans.title2': 'Planlar',
    'plans.subtitle': 'Bütçene ve ihtiyaçlarına göre planı seç',
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
    'features.whiteLabel': 'Beyaz Etiket',
    'features.vipSupport': 'VIP Destek',
    'free.title': 'Ücretsiz Başla, Sonra Yükselt',
    'free.subtitle': 'Kredi kartı gerekmez · 3 niş arama/gün · Temel özellikler · Sonsuza dek ücretsiz',
    'free.cta': 'Ücretsiz Hesap Aç',
    'compare.title1': 'Karşılaştırma',
    'compare.title2': 'Tablosu',
    'compare.subtitle': 'Tüm planları detaylı karşılaştırın',
    'compare.feature': 'Özellik',
    'compare.free': 'Ücretsiz',
    'compare.search': 'Niş Arama',
    'compare.day': 'gün',
    'compare.support': 'Destek',
    'compare.community': 'Topluluk',
    'compare.priority': 'Öncelikli',
    'compare.yearlyTotal': 'Yıllık Toplam',
    'testimonials.badge': 'KULLANICI YORUMLARI',
    'testimonials.title1': 'Erken Üyelerimiz',
    'testimonials.title2': 'Ne Diyor?',
    'testimonials.t1': 'NICHIFY ile 2 hafta içinde doğru nişi buldum ve YouTube kanalımı başlattım. Risk detector özelliği harika!',
    'testimonials.t1Role': 'YouTuber, 3K abone',
    'testimonials.t2': 'Hidden Opportunity özelliği sayesinde kimsenin görmediği bir niş yakaladım. RPM\'im $15+!',
    'testimonials.t2Role': 'İçerik üreticisi',
    'testimonials.t3': 'Lifetime planı inanılmaz bir fırsat. Diğer araçların aylık ücretine geliyor. Tavsiye ederim!',
    'testimonials.t3Role': 'Faceless kanal sahibi',
    'faq.title1': 'Sıkça Sorulan',
    'faq.title2': 'Sorular',
    'faq.q1': 'Lifetime gerçekten ömür boyu mu?',
    'faq.a1': 'Evet! Tek seferlik ödeme yaparsın, NICHIFY hizmette olduğu sürece sonsuza kadar kullanırsın. Gelecek tüm güncellemeler ve yeni özellikler ücretsiz olarak hesabına eklenir.',
    'faq.q2': 'İstediğim zaman planımı değiştirebilir miyim?',
    'faq.a2': 'Evet, istediğin zaman planını yükseltebilir veya düşürebilirsin. Yükseltme anında aktif olur, düşürme sonraki fatura döneminde geçerli olur.',
    'faq.q3': 'Para iade garantisi var mı?',
    'faq.a3': 'Evet, tüm planlarımız için 14 gün koşulsuz para iade garantisi sunuyoruz. Memnun kalmazsan tam iade alırsın, soru sormadan.',
    'faq.q4': 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
    'faq.a4': 'Kredi kartı, banka kartı, Apple Pay, Google Pay ve PayPal kabul ediyoruz. Tüm ödemeler LemonSqueezy üzerinden güvenli şekilde işlenir.',
    'faq.q5': 'Aboneliği iptal etmek kolay mı?',
    'faq.a5': 'Evet, hesap ayarlarından tek tıkla iptal edebilirsin. Hiçbir sorun çıkarılmaz. İptal sonrası dönem sonuna kadar kullanmaya devam edebilirsin.',
    'finalCta.title': 'Karar Verme Zamanı 🚀',
    'finalCta.subtitle': 'İlk 100 kurucu üyenin biri ol, ömür boyu erişim kazan.',
    'finalCta.lifetimeCta': 'Lifetime Al',
    'finalCta.freeCta': 'Ücretsiz Dene',
    'finalCta.note': '⚡ Anında aktivasyon · 🔒 14 gün iade garantisi · 💳 Güvenli ödeme',
    'footer.desc': 'YouTube\'da kazançlı niş bulmanın en akıllı yolu.',
    'footer.product': 'Ürün',
    'footer.account': 'Hesap',
    'footer.legal': 'Yasal',
    'footer.signup': 'Kayıt Ol',
    'footer.dashboard': 'Dashboard',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.terms': 'Kullanım Şartları',
    'footer.rights': 'Tüm hakları saklıdır.'
  },
  en: {
    'pageTitle': 'Pricing - NICHIFY PRO',
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
    'hero.subtitle': 'All plans come with 14-day money-back guarantee. Choose the plan you need, change anytime.',
    'lifetime.founder': 'FOUNDER MEMBER OFFER',
    'lifetime.title': 'Pay Once, Use Forever',
    'lifetime.subtitle': 'Exclusive for first 100 users. All features + future updates included.',
    'lifetime.left': 'slots left!',
    'lifetime.oneTime': 'one-time payment',
    'lifetime.cta': 'Buy Now',
    'lifetime.guarantee': '⚡ Instant activation · 🔒 Secure payment · 💯 14-day refund',
    'plans.title1': 'Monthly',
    'plans.title2': 'Plans',
    'plans.subtitle': 'Choose the plan that fits your needs and budget',
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
    'features.whiteLabel': 'White Label',
    'features.vipSupport': 'VIP Support',
    'free.title': 'Start Free, Upgrade Later',
    'free.subtitle': 'No credit card required · 3 niche searches/day · Basic features · Free forever',
    'free.cta': 'Create Free Account',
    'compare.title1': 'Comparison',
    'compare.title2': 'Table',
    'compare.subtitle': 'Compare all plans in detail',
    'compare.feature': 'Feature',
    'compare.free': 'Free',
    'compare.search': 'Niche Search',
    'compare.day': 'day',
    'compare.support': 'Support',
    'compare.community': 'Community',
    'compare.priority': 'Priority',
    'compare.yearlyTotal': 'Yearly Total',
    'testimonials.badge': 'USER REVIEWS',
    'testimonials.title1': 'What Our Early Users',
    'testimonials.title2': 'Say?',
    'testimonials.t1': 'With NICHIFY I found the right niche in 2 weeks and started my YouTube channel. Risk detector feature is amazing!',
    'testimonials.t1Role': 'YouTuber, 3K subs',
    'testimonials.t2': 'Thanks to Hidden Opportunity, I caught a niche no one saw. My RPM is $15+!',
    'testimonials.t2Role': 'Content creator',
    'testimonials.t3': 'Lifetime plan is an incredible deal. Cheaper than monthly fees of other tools. Highly recommend!',
    'testimonials.t3Role': 'Faceless channel owner',
    'faq.title1': 'Frequently Asked',
    'faq.title2': 'Questions',
    'faq.q1': 'Is Lifetime really forever?',
    'faq.a1': 'Yes! You pay once, use forever as long as NICHIFY is in service. All future updates and new features are added to your account for free.',
    'faq.q2': 'Can I change my plan anytime?',
    'faq.a2': 'Yes, you can upgrade or downgrade your plan anytime. Upgrades take effect instantly, downgrades on the next billing cycle.',
    'faq.q3': 'Is there a money-back guarantee?',
    'faq.a3': 'Yes, we offer 14-day unconditional money-back guarantee for all plans. Get a full refund if not satisfied, no questions asked.',
    'faq.q4': 'What payment methods do you accept?',
    'faq.a4': 'We accept credit card, debit card, Apple Pay, Google Pay and PayPal. All payments are securely processed through LemonSqueezy.',
    'faq.q5': 'Is it easy to cancel?',
    'faq.a5': 'Yes, you can cancel with one click from account settings. No hassle. After cancellation, you can continue using until the end of the period.',
    'finalCta.title': 'Time to Decide 🚀',
    'finalCta.subtitle': 'Be one of the first 100 founder members, get lifetime access.',
    'finalCta.lifetimeCta': 'Get Lifetime',
    'finalCta.freeCta': 'Try Free',
    'finalCta.note': '⚡ Instant activation · 🔒 14-day refund guarantee · 💳 Secure payment',
    'footer.desc': 'The smartest way to find profitable niches on YouTube.',
    'footer.product': 'Product',
    'footer.account': 'Account',
    'footer.legal': 'Legal',
    'footer.signup': 'Sign Up',
    'footer.dashboard': 'Dashboard',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': 'All rights reserved.'
  }
};

// ============================================
// STATE
// ============================================
let currentLang = 'tr';
let currentCurrency = 'TRY';

// ============================================
// IP TESPİT (OTOMATİK)
// ============================================
async function detectLocation() {
  // Önce localStorage'a bak
  const savedLang = localStorage.getItem('nichify_lang');
  const savedCurrency = localStorage.getItem('nichify_currency');
  
  if (savedLang && savedCurrency) {
    currentLang = savedLang;
    currentCurrency = savedCurrency;
    return;
  }
  
  // IP'den ülke tespit et
  try {
    const response = await fetch('https://ipapi.co/json/', { 
      signal: AbortSignal.timeout(3000) 
    });
    const data = await response.json();
    
    if (data.country_code === 'TR') {
      currentLang = 'tr';
      currentCurrency = 'TRY';
    } else {
      currentLang = 'en';
      currentCurrency = 'USD';
    }
  } catch (error) {
    // IP tespiti başarısız → tarayıcı dilini kullan
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('tr')) {
      currentLang = 'tr';
      currentCurrency = 'TRY';
    } else {
      currentLang = 'en';
      currentCurrency = 'USD';
    }
  }
  
  // Kaydet
  localStorage.setItem('nichify_lang', currentLang);
  localStorage.setItem('nichify_currency', currentCurrency);
}

// ============================================
// ÇEVİRİ UYGULA
// ============================================
function applyTranslations() {
  const t = TRANSLATIONS[currentLang];
  
  // data-i18n attribute'u olan tüm elementleri çevir
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  
  // Page title
  document.title = t['pageTitle'];
  document.getElementById('pageTitle').textContent = t['pageTitle'];
  
  // HTML lang
  document.getElementById('htmlRoot').setAttribute('lang', currentLang);
}

// ============================================
// FİYATLARI GÜNCELLE
// ============================================
function updatePrices() {
  const isTL = currentCurrency === 'TRY';
  
  // Plan fiyatları
  document.querySelectorAll('[data-price-tr]').forEach(el => {
    const trPrice = el.getAttribute('data-price-tr');
    const enPrice = el.getAttribute('data-price-en');
    el.textContent = isTL ? trPrice : enPrice;
  });
  
  // Para birimi sembolü
  document.querySelectorAll('[data-currency-symbol]').forEach(el => {
    el.textContent = isTL ? '₺' : '$';
  });
  
  // Eski fiyatlar (lifetime)
  document.querySelectorAll('[data-old-tr]').forEach(el => {
    const trOld = el.getAttribute('data-old-tr');
    const enOld = el.getAttribute('data-old-en');
    el.textContent = isTL ? trOld : enOld;
  });
  
  // Yıllık toplamlar (compare table)
  document.querySelectorAll('[data-yearly-tr]').forEach(el => {
    const trYear = el.getAttribute('data-yearly-tr');
    const enYear = el.getAttribute('data-yearly-en');
    el.textContent = isTL ? trYear : enYear;
  });
}

// ============================================
// DİL/PARA SWITCHER UI
// ============================================
function updateSwitcherUI() {
  const flag = currentLang === 'tr' ? '🇹🇷' : '🌍';
  const lang = currentLang.toUpperCase();
  const currency = currentCurrency === 'TRY' ? 'TL' : 'USD';
  
  document.getElementById('currentFlag').textContent = flag;
  document.getElementById('currentLang').textContent = lang;
  document.getElementById('currentCurrency').textContent = currency;
  
  // Active option
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.remove('active');
    if (opt.getAttribute('data-lang') === currentLang) {
      opt.classList.add('active');
    }
  });
}

// ============================================
// DİL DEĞİŞTİR
// ============================================
function changeLanguage(lang, currency) {
  currentLang = lang;
  currentCurrency = currency;
  
  localStorage.setItem('nichify_lang', lang);
  localStorage.setItem('nichify_currency', currency);
  
  applyTranslations();
  updatePrices();
  updateSwitcherUI();
  
  // Dropdown'ı kapat
  document.getElementById('langDropdown').classList.remove('show');
}

// ============================================
// LIFETIME STOK SAYACI
// ============================================
async function loadLifetimeStock() {
  try {
    if (typeof Auth === 'undefined' || !Auth.init) {
      // Auth yoksa varsayılan değerler
      document.getElementById('stockText').textContent = '12/100';
      document.getElementById('stockNumber').textContent = '88';
      document.getElementById('stockFill').style.width = '12%';
      return;
    }
    
    const supabase = await Auth.init();
    const { count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('premium_type', 'lifetime');
    
    const maxSlots = (typeof CONFIG !== 'undefined' && CONFIG.LIFETIME_MAX_SLOTS) || 100;
    const sold = count || 0;
    const remaining = maxSlots - sold;
    const percent = (sold / maxSlots) * 100;
    
    document.getElementById('stockText').textContent = `${sold}/${maxSlots}`;
    document.getElementById('stockNumber').textContent = remaining;
    document.getElementById('stockFill').style.width = percent + '%';
  } catch (error) {
    console.error('Stock load error:', error);
  }
}

// ============================================
// SATIN AL BUTONU
// ============================================
function handleBuy(plan) {
  const url = CHECKOUT_URLS[plan]?.[currentCurrency];
  
  if (!url || url.includes('VARIANT-ID')) {
    // URL henüz girilmemiş
    if (typeof Utils !== 'undefined' && Utils.toast) {
      Utils.toast.info(currentLang === 'tr' 
        ? '🚀 Ödeme sistemi yakında aktif! Şimdilik kayıt olabilirsin.'
        : '🚀 Payment system coming soon! You can register for now.'
      );
    } else {
      alert(currentLang === 'tr' 
        ? 'Ödeme sistemi yakında aktif!'
        : 'Payment system coming soon!'
      );
    }
    
    setTimeout(() => {
      window.location.href = `/register?plan=${plan}`;
    }, 1500);
    return;
  }
  
  // Kullanıcı giriş yapmış mı?
  const isLoggedIn = typeof Auth !== 'undefined' && Auth.isLoggedIn && Auth.isLoggedIn();
  
  if (!isLoggedIn) {
    // Kayıt sayfasına yönlendir, planı parametre olarak gönder
    window.location.href = `/register?plan=${plan}&redirect=${encodeURIComponent(url)}`;
    return;
  }
  
  // LemonSqueezy checkout'a yönlendir
  window.location.href = url;
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
  // Dil toggle butonu
  const langToggle = document.getElementById('langToggle');
  const langDropdown = document.getElementById('langDropdown');
  
  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });
  }
  
  // Dil seçenekleri
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.getAttribute('data-lang');
      const currency = opt.getAttribute('data-currency');
      changeLanguage(lang, currency);
    });
  });
  
  // Dışarı tıklayınca dropdown kapansın
  document.addEventListener('click', () => {
    if (langDropdown) langDropdown.classList.remove('show');
  });
  
  // Satın al butonları
  document.querySelectorAll('.plan-btn, #buyLifetimeBtn, #buyLifetimeBtn2').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      if (plan) handleBuy(plan);
    });
  });
}

// ============================================
// INIT
// ============================================
(async function init() {
  await detectLocation();
  applyTranslations();
  updatePrices();
  updateSwitcherUI();
  setupEventListeners();
  await loadLifetimeStock();
})();
