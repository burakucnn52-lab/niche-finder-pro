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
 * SON GÜNCELLEME: Fiyatlar güncellendi (Kasım 2025)
 * - Lifetime: 4.299 ₺ / $119 (Founding Member Fiyatı)
 * - Aylık planlar güncel kur ($1 = ~47₺)
 * - YILLIK PLANLAR EKLENDİ (-%20 indirim)
 * ============================================
 */

// 💰 FİYAT TABLOSU
// Buradan tüm fiyatları tek yerden değiştirebilirsin
const PRICES = {
  TR: {
    currency: '₺',
    
    // Lifetime (Ana Ürün)
    lifetime: 4299,          // ⬆️ 3299 → 4299
    lifetime_old: 4999,      // Eski üstü çizili fiyat
    
    // Aylık Planlar
    starter: 449,            // Aynı kaldı
    creator: 849,            // Aynı kaldı
    allInOne: 1399,          // ⬇️ 1599 → 1399
    
    // YILLIK Planlar (aylık eşdeğeri - %20 indirim)
    starter_yearly: 359,     // 449 × 0.80 (aylık gösterim)
    creator_yearly_price: 679,  // 849 × 0.80
    allInOne_yearly: 1119,   // 1399 × 0.80
    
    // YILLIK TOPLAM (12 ay peşin)
    starter_yearly_total: 4309,   // 359 × 12
    creator_yearly_total: 8149,   // 679 × 12
    allInOne_yearly_total: 13429, // 1119 × 12
    
    // Karşılaştırma tablosu için (Creator × 12, 36, 60, 120)
    creator_yearly: 10188,   // 849 × 12
    creator_3y: 30564,       // 849 × 36
    creator_5y: 50940,       // 849 × 60
    creator_10y: 101880,     // 849 × 120
    
    // Tasarruf hesabı (Aylık toplam - Lifetime)
    save_1y: 5889,           // 10188 - 4299
    save_3y: 26265,          // 30564 - 4299
    save_5y: 46641,          // 50940 - 4299
    save_10y: 97581,         // 101880 - 4299
    
    format: (n) => `${n.toLocaleString('tr-TR')} ₺`
  },
  
  US: {
    currency: '$',
    
    // Lifetime (Ana Ürün)
    lifetime: 119,           // ⬆️ 89 → 119
    lifetime_old: 199,
    
    // Aylık Planlar
    starter: 9.99,
    creator: 17.99,
    allInOne: 33.99,
    
    // YILLIK Planlar (aylık eşdeğeri - %20 indirim)
    starter_yearly: 7.99,       // 9.99 × 0.80
    creator_yearly_price: 14.39, // 17.99 × 0.80
    allInOne_yearly: 27.19,     // 33.99 × 0.80
    
    // YILLIK TOPLAM (12 ay peşin)
    starter_yearly_total: 95.90,   // 7.99 × 12
    creator_yearly_total: 172.70,  // 14.39 × 12
    allInOne_yearly_total: 326.30, // 27.19 × 12
    
    // Karşılaştırma tablosu için
    creator_yearly: 215,     // 17.99 × 12
    creator_3y: 647,         // 17.99 × 36
    creator_5y: 1079,        // 17.99 × 60
    creator_10y: 2159,       // 17.99 × 120
    
    // Tasarruf hesabı (Lifetime 119 baz alındı)
    save_1y: 96,             // 215 - 119
    save_3y: 528,            // 647 - 119
    save_5y: 960,            // 1079 - 119
    save_10y: 2040,          // 2159 - 119
    
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
 * <span data-price="lifetime"></span>       → 4.299 ₺  veya  $119
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
