// ============================================
// NICHIFY PRO - FAVORITES SYSTEM
// User favorites management with Supabase
// ============================================

const Favorites = {
  
  _cache: null,
  _cacheTime: 0,
  CACHE_DURATION: 60 * 1000,
  
  async init() {
    if (!window.getSupabase()) {
      await window.initSupabase();
    }
    return window.getSupabase();
  },
  
  async add(nicheId, notes = null) {
    try {
      const supabase = await this.init();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Please log in to add favorites',
          requireLogin: true
        };
      }
      
      const isAlready = await this.isFavorited(nicheId);
      if (isAlready) {
        return {
          success: false,
          message: 'Already in favorites',
          alreadyExists: true
        };
      }
      
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
  
  async remove(nicheId) {
    try {
      const supabase = await this.init();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return { success: false, message: 'Please log in' };
      
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('niche_id', nicheId);
      
      if (error) throw error;
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
  
  async toggle(nicheId) {
    const isFav = await this.isFavorited(nicheId);
    if (isFav) {
      return await this.remove(nicheId);
    } else {
      return await this.add(nicheId);
    }
  },
  
  async isFavorited(nicheId) {
    try {
      const allFavs = await this.getAll();
      return allFavs.some(f => f.niche_id === nicheId);
    } catch (error) {
      return false;
    }
  },
  
  async getAll() {
    try {
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
      
      this._cache = data || [];
      this._cacheTime = now;
      
      return this._cache;
      
    } catch (error) {
      console.error('Get favorites error:', error);
      return [];
    }
  },
  
  async getCount() {
    const all = await this.getAll();
    return all.length;
  },
  
  async getFavoriteNiches() {
    try {
      const favs = await this.getAll();
      if (favs.length === 0) return [];
      
      const nicheIds = favs.map(f => f.niche_id);
      
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
  
  _clearCache() {
    this._cache = null;
    this._cacheTime = 0;
  },
  
  async checkLimit() {
    try {
      const supabase = await this.init();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return { allowed: false, reason: 'Not logged in' };
      
      const { data: userData } = await supabase
        .from('users')
        .select('is_premium, is_pro, lifetime, is_admin, role')
        .eq('id', user.id)
        .single();
      
      const isPremium = userData?.is_premium || 
                        userData?.is_pro || 
                        userData?.lifetime ||
                        userData?.is_admin || 
                        userData?.role === 'super_admin';
      
      if (isPremium) {
        return { allowed: true, unlimited: true };
      }
      
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
      return { allowed: true };
    }
  }
};

window.Favorites = Favorites;
