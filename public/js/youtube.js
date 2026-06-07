// ============================================
// NICHIFY PRO - YOUTUBE API CLIENT
// Frontend'den YouTube API çağrıları
// ============================================

const YouTube = {
  
  // Base API URL
  API_BASE: '/api/youtube',
  
  // ============================================
  // TRENDING VIDEOS
  // ============================================
  async getTrending(region = 'TR', category = '') {
    try {
      let url = `${this.API_BASE}?endpoint=trending&region=${region}`;
      if (category) url += `&category=${category}`;
      
      const response = await fetch(url);
      const result = await response.json();
      
      return {
        success: !result.error,
        data: result.data || null,
        source: result.source || 'unknown',
        error: result.error || null
      };
    } catch (error) {
      console.error('Trending error:', error);
      return { success: false, error: error.message };
    }
  },
  
  // ============================================
  // SEARCH (Kanal/Video Arama)
  // ============================================
  async search(query, options = {}) {
    try {
      const params = new URLSearchParams({
        endpoint: 'search',
        q: query,
        type: options.type || 'channel',
        region: options.region || 'TR',
        lang: options.lang || 'tr'
      });
      
      const response = await fetch(`${this.API_BASE}?${params}`);
      const result = await response.json();
      
      return {
        success: !result.error,
        data: result.data || null,
        source: result.source || 'unknown',
        error: result.error || null
      };
    } catch (error) {
      console.error('Search error:', error);
      return { success: false, error: error.message };
    }
  },
  
  // ============================================
  // CHANNEL DETAILS
  // ============================================
  async getChannel(channelId) {
    try {
      const response = await fetch(`${this.API_BASE}?endpoint=channel&id=${channelId}`);
      const result = await response.json();
      
      return {
        success: !result.error,
        data: result.data || null,
        source: result.source || 'unknown',
        error: result.error || null
      };
    } catch (error) {
      console.error('Channel error:', error);
      return { success: false, error: error.message };
    }
  },
  
  // ============================================
  // CHANNEL VIDEOS
  // ============================================
  async getChannelVideos(channelId) {
    try {
      const response = await fetch(`${this.API_BASE}?endpoint=videos&channelId=${channelId}`);
      const result = await response.json();
      
      return {
        success: !result.error,
        data: result.data || null,
        source: result.source || 'unknown',
        error: result.error || null
      };
    } catch (error) {
      console.error('Videos error:', error);
      return { success: false, error: error.message };
    }
  },
  
  // ============================================
  // API STATUS
  // ============================================
  async getStatus() {
    try {
      const response = await fetch(`${this.API_BASE}?endpoint=status`);
      return await response.json();
    } catch (error) {
      return { status: 'error', error: error.message };
    }
  },
  
  // ============================================
  // HELPERS - Channel Score Calculator
  // ============================================
  calculateChannelScore(channel) {
    const stats = channel.statistics || {};
    const subscribers = parseInt(stats.subscriberCount || 0);
    const views = parseInt(stats.viewCount || 0);
    const videos = parseInt(stats.videoCount || 0);
    
    // Engagement score
    const avgViewsPerVideo = videos > 0 ? views / videos : 0;
    const subsToViewsRatio = subscribers > 0 ? (avgViewsPerVideo / subscribers) * 100 : 0;
    
    let score = 0;
    
    // Subscriber score (max 30)
    if (subscribers > 1000000) score += 30;
    else if (subscribers > 100000) score += 25;
    else if (subscribers > 10000) score += 20;
    else if (subscribers > 1000) score += 15;
    else score += 5;
    
    // Engagement score (max 40)
    if (subsToViewsRatio > 50) score += 40;
    else if (subsToViewsRatio > 25) score += 30;
    else if (subsToViewsRatio > 10) score += 20;
    else if (subsToViewsRatio > 5) score += 10;
    else score += 5;
    
    // Activity score (max 30)
    if (videos > 500) score += 30;
    else if (videos > 100) score += 25;
    else if (videos > 50) score += 20;
    else if (videos > 10) score += 15;
    else score += 5;
    
    return Math.min(score, 100);
  },
  
  // ============================================
  // RISK CALCULATOR
  // ============================================
  calculateRisk(channel) {
    const snippet = channel.snippet || {};
    const title = (snippet.title || '').toLowerCase();
    const description = (snippet.description || '').toLowerCase();
    
    let riskScore = 100;
    const issues = [];
    const recommendations = [];
    
    // Banned keywords check
    const riskKeywords = ['copyright', 'reupload', 'music', 'official audio'];
    riskKeywords.forEach(kw => {
      if (title.includes(kw) || description.includes(kw)) {
        riskScore -= 15;
        issues.push(`"${kw}" kelimesi tespit edildi`);
      }
    });
    
    // Recommendations
    if (riskScore >= 80) {
      recommendations.push('✅ Düzenli yükleme yapın');
      recommendations.push('✅ Orijinal içerik üretin');
      recommendations.push('✅ Topluluk kurallarına uyun');
    } else if (riskScore >= 60) {
      recommendations.push('⚠️ İçerik politikalarını gözden geçirin');
      recommendations.push('⚠️ Telif hakkı olan içeriklerden kaçının');
    } else {
      recommendations.push('🚨 Royalty-free müzik kullanın');
      recommendations.push('🚨 Public domain içerikler tercih edin');
      recommendations.push('🚨 Kendi görsellerinizi oluşturun');
    }
    
    return {
      score: Math.max(0, riskScore),
      level: Utils.getRiskLevel(riskScore),
      issues,
      recommendations
    };
  }
};

// Global
window.YouTube = YouTube;
