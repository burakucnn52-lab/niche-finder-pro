/**
 * ============================================
 * NICHIFY PRICING SYSTEM
 * ============================================
 * Kullanıcının ülkesini IP'den tespit eder.
 * Türkiye ise: TL fiyat gösterir
 * Diğer ülkeler: USD fiyat gösterir
 * Dil HER ZAMAN İngilizce kalır.
 * ============================================
 */

// 💰 FİYAT TABLOSU
// Buradan tüm fiyatları tek yerden değiştirebilirsin
const PRICES = {
  TR: {
    currency: '₺',
    lifetime: 2499,
    lifetime_old: 3499,
    starter: 499,
    creator: 799,
    allInOne: 1099,
    // Karşılaştırma tablosu için
    creator_yearly: 9588,
    creator_3y: 28764,
    creator_5y: 47940,
    creator_10y: 95880,
    save_1y: 7089,
    save_3y: 26265,
    save_5y: 45441,
    save_10y: 93381,
    format: (n) => `${n.toLocaleString('tr-TR')} ₺`
  },
  US: {
    currency: '$',
    lifetime: 89,
    lifetime_old: 199,
    starter: 9.99,
    creator: 17.99,
    allInOne: 33.99,
    creator_yearly: 215,
    creator_3y: 647,
    creator_5y: 1079,
    creator_10y: 2159,
    save_1y: 126,
    save_3y: 558,
    save_5y: 990,
    save_10y: 2070,
    format: (n) => `$${n}`
  }
};

/**
 * IP'den ülkeyi tespit eder
 * Cache kullanır (24 saat), böylece her sayfa açılışında tekrar API çağırmaz
 */
async function detectCountry() {
  // 1. Cache kontrol et (24 saat geçerli)
  const cached = localStorage.getItem('user_country');
  const cachedTime = localStorage.getItem('user_country_time');
  
  if (cached && cachedTime) {
    const age = Date.now() - parseInt(cachedTime);
    if (age < 24 * 60 * 60 * 1000) {
      return cached; // Cache'den dön
    }
  }
  
  // 2. Cache yoksa veya eskiyse, API'den al
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const country = data.country_code || 'US';
    
    // Cache'e kaydet
    localStorage.setItem('user_country', country);
    localStorage.setItem('user_country_time', Date.now().toString());
    
    return country;
  } catch (error) {
    console.warn('Country detection failed:', error);
    return 'US'; // Hata olursa varsayılan USD
  }
}

/**
 * Fiyat konfigürasyonunu döndürür
 * Türkiye = TR fiyatları, Diğer = US fiyatları
 */
function getPricing(country) {
  return country === 'TR' ? PRICES.TR : PRICES.US;
}

/**
 * Sayfadaki fiyat elementlerini otomatik günceller
 * HTML'deki data-price attribute'ları kullanır
 * 
 * Örnek HTML:
 * <span data-price="lifetime"></span>       → 2499 ₺  veya  $89
 * <span data-price="lifetime_old"></span>   → 3499 ₺  veya  $199
 */
function applyPrices(config) {
  // Tüm data-price elementlerini bul
  const elements = document.querySelectorAll('[data-price]');
  
  elements.forEach(el => {
    const key = el.dataset.price;
    
    // Format modu: sadece rakam mı, formatlı mı?
    const isFormatted = el.dataset.priceFormat !== 'raw';
    
    if (config[key] !== undefined) {
      if (isFormatted) {
        el.textContent = config.format(config[key]);
      } else {
        el.textContent = config[key];
      }
    }
  });
  
  // Global değişken - başka scriptler kullanabilsin
  window.PRICING = config;
  window.USER_COUNTRY = config === PRICES.TR ? 'TR' : 'US';
  
  // Custom event fırlat - başka scriptler dinleyebilsin
  document.dispatchEvent(new CustomEvent('pricingReady', { detail: config }));
}

/**
 * Sistemi başlat
 */
(async function initPricing() {
  const country = await detectCountry();
  const config = getPricing(country);
  applyPrices(config);
  console.log(`💰 Pricing loaded: ${country} (${config.currency})`);
})();
