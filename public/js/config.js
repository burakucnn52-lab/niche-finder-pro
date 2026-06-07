// ============================================
// NICHIFY PRO - CONFIG
// Supabase + App Configuration
// ============================================

const CONFIG = {
  // Supabase
  SUPABASE_URL: 'YOUR_SUPABASE_URL',
  SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY',
  
  // App Info
  APP_NAME: 'NICHIFY PRO',
  APP_VERSION: '2.0.0',
  
  // Lifetime Deal
  LIFETIME_PRICE: 89,
  LIFETIME_OLD_PRICE: 149,
  LIFETIME_MAX_SLOTS: 100,
  
  // Cache
  CACHE_DURATION_HOURS: 6,
  
  // Limits (Free tier)
  FREE_DAILY_SEARCHES: 10,
  FREE_AI_QUESTIONS: 5,
  
  // Admin Email (sen)
  ADMIN_EMAIL: 'bucun648@gmail.com',
  
  // URLs
  LEMONSQUEEZY_CHECKOUT_URL: '', // Sonra ekleyeceğiz
  
  // Routes
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profil',
    ADMIN: '/admin',
    PRICING: '/fiyatlandirma'
  }
};

// Supabase Client'ı yükle (CDN'den)
let supabaseClient = null;

const initSupabase = async () => {
  if (typeof supabase === 'undefined') {
    // CDN'den yüklenmemişse yükle
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  supabaseClient = supabase.createClient(
    CONFIG.SUPABASE_URL,
    CONFIG.SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }
  );
  
  return supabaseClient;
};

// Global olarak kullanılabilir hale getir
window.CONFIG = CONFIG;
window.initSupabase = initSupabase;
window.getSupabase = () => supabaseClient;
