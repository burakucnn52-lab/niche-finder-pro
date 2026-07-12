// ============================================
// NICHIFY PRO - FAVORITES SYSTEM
// User favorites management with Supabase
// ============================================

const Favorites = {
  
  // Cache (hızlı erişim için)
  _cache: null,
  _cacheTime: 0,
  CACHE_DURATION: 60 * 1000, // 1 dakika cache
  
  // ============================================
  // INIT - Supabase client'ı al
  // ============================================
  async init() {
    if (!window.getSupabase()) {
      await window.initSupabase();
    }
    return window.getSupabase();
  },
  
  // ============================================
  // ADD - Favori ekle
  // ============================================
  async add(nicheId, notes = null) {
    try {
      const supabase = await this.init();
      
      // Kullanıcı giriş yapmış mı?
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return {
          success: false,
          message: 'Please log in to add favorites',
          requireLogin: true
        };
      }
      
      // Zaten favorilerde mi?
      const isAlready = await this.isFavorited(nicheId);
      if (isAlready) {
        return {
          success: false,
          message: 'Already in favorites',
          alreadyExists: true
        };
      }
      
      // Supabase'e ekle
      const { data, error } = await supabase
        .from('user_favorites')
        .insert([{
          user_id: user.id,
          niche_id: nicheId,
          notes: notes
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Cache'i temizle (yeniden yüklensin)
      this._clearCache();
      
      return {
        success: true,
        message: 'Added to favorites ⭐',
        data: data
      };
      
    } catch (error) {
      console.error('Add favorite error:', error);
      return {
        success: false,
        message: 'Failed to add favorite: ' + error.message
      };
    }
  },
  
  // ============================================
  // REMOVE - Favori sil
  // ============================================
  async remove(nicheId) {
    try {
      const supabase = await this.init();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, message: 'Please log in' };
      }
      
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('niche_id', nicheId);
      
      if (error) throw error;
      
      // Cache'i temizle
      this._clearCache();
      
      return {
        success: true,
        message: 'Removed from favorites'
      };
      
    } catch (error) {
      console.error('Remove favorite error:', error);
      return {
        success: false,
        message: 'Failed to remove: ' + error.message
      };
    }
  },
  
  // ============================================
  // TOGGLE - Ekle/sil (varsa sil, yoksa ekle)
  // ============================================
  async toggle(nicheId) {
    const isFav = await this.isFavorited(nicheId);
    
    if (isFav) {
      return await this.remove(nicheId);
    } else {
      return await this.add(nicheId);
    }
  },
  
  // ============================================
  // IS FAVORITED - Favorilerde mi?
  // ============================================
  async isFavorited(nicheId) {
    try {
      const allFavs = await this.getAll();
      return allFavs.some(f => f.niche_id === nicheId);
    } catch (error) {
      return false;
    }
  },
  
  // ============================================
  // GET ALL - Tüm favorileri getir (cache'li)
  // ============================================
  async getAll() {
    try {
      // Cache kontrol
      const now = Date.now();
      if (this._cache && (now - this._cacheTime) < this.CACHE_DURATION) {
        return this._cache;
      }
      
      const supabase = await this.init();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });
      
      if (error) throw error;
      
      // Cache'e kaydet
      this._cache = data || [];
      this._cacheTime = now;
      
      return this._cache;
      
    } catch (error) {
      console.error('Get favorites error:', error);
      return [];
    }
  },
  
  // ============================================
  // GET COUNT - Kaç favori var?
  // ============================================
  async getCount() {
    const all = await this.getAll();
    return all.length;
  },
  
  // ============================================
  // GET FAVORITE NICHES - Favori nişlerin tüm bilgisiyle
  // ============================================
  async getFavoriteNiches() {
    try {
      const favs = await this.getAll();
      if (favs.length === 0) return [];
      
      // Niş ID'lerini al
      const nicheIds = favs.map(f => f.niche_id);
      
      // NICHES_DATA'dan tam bilgileri bul (data/niches.js)
      if (window.NICHES_DATA) {
        return window.NICHES_DATA
          .filter(niche => nicheIds.includes(niche.id))
          .map(niche => ({
            ...niche,
            favorited_at: favs.find(f => f.niche_id === niche.id)?.added_at,
            notes: favs.find(f => f.niche_id === niche.id)?.notes
          }));
      }
      
      return [];
      
    } catch (error) {
      console.error('Get favorite niches error:', error);
      return [];
    }
  },
  
  // ============================================
  // CLEAR CACHE (internal)
  // ============================================
  _clearCache() {
    this._cache = null;
    this._cacheTime = 0;
  },
  
  // ============================================
  // CHECK LIMIT - Free kullanıcı limit kontrol
  // ============================================
  async checkLimit() {
    try {
      const supabase = await this.init();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { allowed: false, reason: 'Not logged in' };
      
      // Kullanıcı bilgilerini al
      const { data: userData } = await supabase
        .from('users')
        .select('is_premium, is_pro, lifetime, is_admin, role')
        .eq('id', user.id)
        .single();
      
      // Premium/admin sınırsız
      const isPremium = userData?.is_premium || 
                        userData?.is_pro || 
                        userData?.lifetime ||
                        userData?.is_admin || 
                        userData?.role === 'super_admin';
      
      if (isPremium) {
        return { allowed: true, unlimited: true };
      }
      
      // Free kullanıcı - 20 limit
      const count = await this.getCount();
      const FREE_LIMIT = 20;
      
      if (count >= FREE_LIMIT) {
        return {
          allowed: false,
          reason: 'Free plan limit reached (20 favorites)',
          current: count,
          limit: FREE_LIMIT,
          upgrade: true
        };
      }
      
      return {
        allowed: true,
        current: count,
        limit: FREE_LIMIT,
        remaining: FREE_LIMIT - count
      };
      
    } catch (error) {
      console.error('Check limit error:', error);
      return { allowed: true }; // Hata olursa izin ver
    }
  }
};

// Global
window.Favorites = Favorites;
