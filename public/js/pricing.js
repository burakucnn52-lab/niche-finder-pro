/**
 * ============================================
 * NICHIFY PRICING SYSTEM
 * ============================================
 * Kullanıcının ülkesini IP'den tespit eder.
 * Türkiye ise: TL fiyat gösterir
 * Diğer ülkeler: USD fiyat gösterir
 * Dil HER ZAMAN İngilizce kalır.
 * ============================================
 * 
 * SON GÜNCELLEME: Fiyatlar dengelendi (Kasım 2025)
 * - Lifetime: 3.299 ₺ / $89 (VPN arbitraj riski azaldı)
 * - Aylık planlar döviz kuruna uygun ($1 = ~46₺)
 * ============================================
 */

// 💰 FİYAT TABLOSU
// Buradan tüm fiyatları tek yerden değiştirebilirsin
const PRICES = {
  TR: {
    currency: '₺',
    
    // Lifetime (Ana Ürün)
    lifetime: 3299,          // ⬆️ 2499 → 3299 (VPN riski azaldı)
    lifetime_old: 4999,      // ⬆️ 3499 → 4999 (indirim daha çekici)
    
    // Aylık Planlar
    starter: 449,            // ⬇️ 499 → 449 ($9.99 karşılığı)
    creator: 849,            // ⬆️ 799 → 849 ($17.99 karşılığı)
    allInOne: 1599,          // ⬆️ 1099 → 1599 ($33.99 karşılığı)
    
    // Karşılaştırma tablosu için (Creator × 12, 36, 60, 120)
    creator_yearly: 10188,   // 849 × 12
    creator_3y: 30564,       // 849 × 36
    creator_5y: 50940,       // 849 × 60
    creator_10y: 101880,     // 849 × 120
    
    // Tasarruf hesabı (Aylık toplam - Lifetime)
    save_1y: 6889,           // 10188 - 3299
    save_3y: 27265,          // 30564 - 3299
    save_5y: 47641,          // 50940 - 3299
    save_10y: 98581,         // 101880 - 3299
    
    format: (n) => `${n.toLocaleString('tr-TR')} ₺`
  },
  
  US: {
    currency: '$',
    
    // Lifetime (Ana Ürün)
    lifetime: 89,
    lifetime_old: 199,
    
    // Aylık Planlar
    starter: 9.99,
    creator: 17.99,
    allInOne: 33.99,
    
    // Karşılaştırma tablosu için
    creator_yearly: 215,     // 17.99 × 12
    creator_3y: 647,         // 17.99 × 36
    creator_5y: 1079,        // 17.99 × 60
    creator_10y: 2159,       // 17.99 × 120
    
    // Tasarruf hesabı
    save_1y: 126,            // 215 - 89
    save_3y: 558,            // 647 - 89
    save_5y: 990,            // 1079 - 89
    save_10y: 2070,          // 2159 - 89
    
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
 * <span data-price="lifetime"></span>       → 3.299 ₺  veya  $89
 * <span data-price="lifetime_old"></span>   → 4.999 ₺  veya  $199
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
