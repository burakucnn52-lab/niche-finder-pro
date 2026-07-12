// ============================================
// NICHIFY PRO - SIDEBAR COMPONENT
// Reusable sidebar for all dashboard pages
// ============================================

const Sidebar = {
  
  // ============================================
  // MENU CONFIG
  // Yeni link eklemek için buraya ekle!
  // ============================================
  menuItems: {
    main: [
      { id: 'home',      icon: '🏠', label: 'Home',              url: '/dashboard' },
      { id: 'niches',    icon: '🎯', label: 'Niche Discovery',   url: '/nis-kesfi' },
      { id: 'favorites', icon: '⭐', label: 'My Favorites',      url: '/favorilerim' },
      { id: 'trending',  icon: '🔥', label: 'Trending Channels', url: '/yukselen-kanallar' },
      { id: 'analysis',  icon: '📊', label: 'Channel Analysis',  url: '/kanal-analizi' }
    ],
    tools: [
      { id: 'risk',      icon: '🛡️', label: 'Risk Detector',    url: '/risk-detector' },
      { id: 'ai',        icon: '🤖', label: 'AI Assistant',      url: '/ai-asistan', badge: 'PRO' },
      { id: 'roadmap',   icon: '🗺️', label: 'Roadmap',          url: '/yol-haritasi' }
    ],
    admin: [
      { id: 'admin',     icon: '⚙️', label: 'Admin Panel',       url: '/admin' }
    ]
  },
  
  // ============================================
  // RENDER SIDEBAR
  // ============================================
  async render(activePage) {
    const container = document.getElementById('sidebar-container');
    if (!container) {
      console.error('Sidebar container not found! Add: <div id="sidebar-container"></div>');
      return;
    }
    
    // Build menu HTML
    const mainMenu = this._buildMenu(this.menuItems.main, activePage);
    const toolsMenu = this._buildMenu(this.menuItems.tools, activePage);
    const adminMenu = this._buildMenu(this.menuItems.admin, activePage);
    
    // Sidebar HTML
    container.outerHTML = `
      <aside class="sidebar" id="sidebar">
        
        <!-- Logo -->
        <div class="sidebar-logo">
          <span class="sidebar-logo-icon">🎯</span>
          <div>
            <div class="sidebar-logo-text">NICHIFY</div>
            <div class="sidebar-version">PRO v2.0</div>
          </div>
        </div>
        
        <!-- Navigation -->
        <nav class="sidebar-nav">
          
          <div class="sidebar-section">
            <div class="sidebar-section-title">Main Menu</div>
            ${mainMenu}
          </div>
          
          <div class="sidebar-section">
            <div class="sidebar-section-title">Tools</div>
            ${toolsMenu}
          </div>
          
          <div class="sidebar-section" id="adminSection" style="display: none;">
            <div class="sidebar-section-title">👑 Admin</div>
            ${adminMenu}
          </div>
          
        </nav>
        
        <!-- Lifetime Card -->
        <div class="sidebar-lifetime" id="lifetimeCard">
          <div class="sidebar-lifetime-old" data-price="lifetime_old"></div>
          <div class="sidebar-lifetime-price" data-price="lifetime"></div>
          <div class="sidebar-lifetime-label">🔥 Lifetime Deal</div>
          <a href="/fiyatlandirma" class="btn btn-primary btn-sm btn-block" style="margin-top: 8px;">
            Get It Now
          </a>
          <div class="sidebar-lifetime-stock">⚡ <span id="lifetimeStock">88</span>/100 left</div>
        </div>
        
        <!-- User Section -->
        <div class="sidebar-user">
          <div class="avatar" id="userAvatar">U</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name" id="userName">Loading...</div>
            <div class="sidebar-user-email" id="userEmail">-</div>
          </div>
          <div class="sidebar-user-menu" id="logoutBtn" title="Log Out">⏻</div>
        </div>
        
      </aside>
    `;
    
    // Load user info
    await this._loadUserInfo();
    
    // Load lifetime stock
    await this._loadLifetimeStock();
    
    // Setup logout button
    this._setupLogout();
  },
  
  // ============================================
  // BUILD MENU (internal)
  // ============================================
  _buildMenu(items, activePage) {
    return items.map(item => {
      const isActive = item.id === activePage;
      const badge = item.badge 
        ? `<span class="badge badge-pro sidebar-item-badge">${item.badge}</span>` 
        : '';
      
      return `
        <a href="${item.url}" class="sidebar-item ${isActive ? 'active' : ''}">
          <span class="sidebar-item-icon">${item.icon}</span>
          <span>${item.label}</span>
          ${badge}
        </a>
      `;
    }).join('');
  },
  
  // ============================================
  // LOAD USER INFO
  // ============================================
  async _loadUserInfo() {
    try {
      const user = await Auth.getCurrentUser();
      if (!user) return;
      
      const displayName = user.name || user.email.split('@')[0];
      
      // Set user info
      const nameEl = document.getElementById('userName');
      const emailEl = document.getElementById('userEmail');
      const avatarEl = document.getElementById('userAvatar');
      
      if (nameEl) nameEl.textContent = displayName;
      if (emailEl) emailEl.textContent = user.email;
      if (avatarEl) avatarEl.textContent = displayName.charAt(0).toUpperCase();
      
      // Show admin section if admin
      if (user.is_admin || user.role === 'super_admin') {
        const adminSection = document.getElementById('adminSection');
        if (adminSection) adminSection.style.display = 'block';
      }
      
      // Hide lifetime card if premium
      if (user.is_premium || user.is_pro || user.lifetime) {
        const lifetimeCard = document.getElementById('lifetimeCard');
        if (lifetimeCard) lifetimeCard.style.display = 'none';
      }
      
    } catch (error) {
      console.error('Load user info error:', error);
    }
  },
  
  // ============================================
  // LOAD LIFETIME STOCK
  // ============================================
  async _loadLifetimeStock() {
    try {
      const supabase = await Auth.init();
      const { count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('premium_type', 'lifetime');
      
      const remaining = 100 - (count || 0);
      const stockEl = document.getElementById('lifetimeStock');
      if (stockEl) stockEl.textContent = remaining;
      
    } catch (error) {
      console.error('Load lifetime stock error:', error);
    }
  },
  
  // ============================================
  // SETUP LOGOUT
  // ============================================
  _setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return;
    
    logoutBtn.addEventListener('click', async () => {
      if (confirm('Are you sure you want to log out?')) {
        await Auth.logout();
      }
    });
  }
};

// ============================================
// GLOBAL SHORTCUT
// Kolay kullanım için: renderSidebar('dashboard')
// ============================================
window.renderSidebar = function(activePage) {
  return Sidebar.render(activePage);
};

// Global
window.Sidebar = Sidebar;
