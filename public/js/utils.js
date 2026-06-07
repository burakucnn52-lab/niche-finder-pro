// ============================================
// NICHIFY PRO - UTILITIES
// Helper functions for the entire app
// ============================================

const Utils = {
  
  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================
  toast: {
    container: null,
    
    init() {
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
      }
    },
    
    show(message, type = 'info', duration = 3000) {
      this.init();
      
      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      };
      
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
        <span style="font-size: 1.25rem;">${icons[type]}</span>
        <span style="flex: 1;">${message}</span>
        <button style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.25rem;" onclick="this.parentElement.remove()">×</button>
      `;
      
      this.container.appendChild(toast);
      
      // Auto remove
      setTimeout(() => {
        toast.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },
    
    success(message, duration) { this.show(message, 'success', duration); },
    error(message, duration) { this.show(message, 'error', duration); },
    warning(message, duration) { this.show(message, 'warning', duration); },
    info(message, duration) { this.show(message, 'info', duration); }
  },
  
  // ============================================
  // NUMBER FORMATTING
  // ============================================
  formatNumber(num) {
    if (num === null || num === undefined) return '0';
    num = parseFloat(num);
    
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString('tr-TR');
  },
  
  formatNumberFull(num) {
    return parseFloat(num).toLocaleString('tr-TR');
  },
  
  formatCurrency(num, currency = '$') {
    return currency + parseFloat(num).toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },
  
  formatPercent(num, decimals = 1) {
    return parseFloat(num).toFixed(decimals) + '%';
  },
  
  // ============================================
  // DATE FORMATTING
  // ============================================
  formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  },
  
  formatDateTime(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  timeAgo(date) {
    if (!date) return '';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    const intervals = [
      { label: 'yıl', seconds: 31536000 },
      { label: 'ay', seconds: 2592000 },
      { label: 'hafta', seconds: 604800 },
      { label: 'gün', seconds: 86400 },
      { label: 'saat', seconds: 3600 },
      { label: 'dakika', seconds: 60 }
    ];
    
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label} önce`;
      }
    }
    return 'Az önce';
  },
  
  // ============================================
  // STRING UTILS
  // ============================================
  truncate(str, length = 100) {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  },
  
  slugify(text) {
    const trMap = {
      'ç':'c', 'ğ':'g', 'ı':'i', 'ö':'o', 'ş':'s', 'ü':'u',
      'Ç':'c', 'Ğ':'g', 'İ':'i', 'Ö':'o', 'Ş':'s', 'Ü':'u'
    };
    
    return text.toString()
      .replace(/./g, c => trMap[c] || c)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  },
  
  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  
  // ============================================
  // VALIDATION
  // ============================================
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  // ============================================
  // CLIPBOARD
  // ============================================
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.toast.success('Panoya kopyalandı!');
      return true;
    } catch (error) {
      this.toast.error('Kopyalama başarısız');
      return false;
    }
  },
  
  // ============================================
  // DEBOUNCE & THROTTLE
  // ============================================
  debounce(func, wait = 300) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },
  
  throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // ============================================
  // LOADING STATE
  // ============================================
  showLoading(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (element) {
      element.classList.add('loading');
      element.disabled = true;
    }
  },
  
  hideLoading(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (element) {
      element.classList.remove('loading');
      element.disabled = false;
    }
  },
  
  // ============================================
  // LOCAL STORAGE
  // ============================================
  storage: {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
    
    get(key, defaultValue = null) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
      } catch {
        return defaultValue;
      }
    },
    
    remove(key) {
      localStorage.removeItem(key);
    },
    
    clear() {
      localStorage.clear();
    }
  },
  
  // ============================================
  // URL PARAMS
  // ============================================
  getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  },
  
  setUrlParam(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, '', url);
  },
  
  // ============================================
  // SCROLL UTILS
  // ============================================
  scrollToTop(smooth = true) {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  },
  
  scrollToElement(selector, offset = 80) {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    
    if (element) {
      const position = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  },
  
  // ============================================
  // YOUTUBE HELPERS
  // ============================================
  youtube: {
    getChannelUrl(channelId) {
      return `https://www.youtube.com/channel/${channelId}`;
    },
    
    getVideoUrl(videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    },
    
    getThumbnail(videoId, quality = 'high') {
      const qualities = {
        default: 'default',
        medium: 'mqdefault',
        high: 'hqdefault',
        standard: 'sddefault',
        max: 'maxresdefault'
      };
      return `https://i.ytimg.com/vi/${videoId}/${qualities[quality]}.jpg`;
    },
    
    parseChannelId(url) {
      const patterns = [
        /youtube\.com\/channel\/([^\/\?]+)/,
        /youtube\.com\/c\/([^\/\?]+)/,
        /youtube\.com\/@([^\/\?]+)/,
        /youtube\.com\/user\/([^\/\?]+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
      return null;
    }
  },
  
  // ============================================
  // SCORE CALCULATIONS
  // ============================================
  getScoreColor(score) {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    if (score >= 40) return 'var(--info)';
    return 'var(--danger)';
  },
  
  getScoreLabel(score) {
    if (score >= 90) return 'Mükemmel';
    if (score >= 80) return 'Çok İyi';
    if (score >= 70) return 'İyi';
    if (score >= 60) return 'Orta';
    if (score >= 50) return 'Zayıf';
    return 'Çok Zayıf';
  },
  
  getRiskLevel(score) {
    if (score >= 80) return { label: 'Çok Güvenli', color: 'var(--success)', icon: '✅' };
    if (score >= 60) return { label: 'Güvenli', color: 'var(--success)', icon: '🟢' };
    if (score >= 40) return { label: 'Orta Risk', color: 'var(--warning)', icon: '⚠️' };
    if (score >= 20) return { label: 'Yüksek Risk', color: 'var(--danger)', icon: '🔴' };
    return { label: 'Çok Riskli', color: 'var(--danger)', icon: '❌' };
  }
};

// Global
window.Utils = Utils;
