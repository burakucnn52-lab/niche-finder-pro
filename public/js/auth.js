// ============================================
// NICHIFY PRO - AUTH
// Login, Register, Logout, Session
// ============================================

const Auth = {
  
  // Init Supabase
  async init() {
    if (!window.getSupabase()) {
      await window.initSupabase();
    }
    return window.getSupabase();
  },
  
  // ============================================
  // REGISTER
  // ============================================
  async register(email, password, name) {
    try {
      const supabase = await this.init();
      
      // 1. Save to Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      
      if (authError) throw authError;
      
      // 2. Insert into users table
      if (authData.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([{
            id: authData.user.id,
            email: email,
            name: name,
            role: email === CONFIG.ADMIN_EMAIL ? 'super_admin' : 'user',
            is_admin: email === CONFIG.ADMIN_EMAIL,
            is_premium: false
          }]);
        
        // No error if user already exists
        if (dbError && dbError.code !== '23505') {
          console.warn('User insert warning:', dbError);
        }
      }
      
      return {
        success: true,
        user: authData.user,
        message: 'Registration successful! Please verify your email address.'
      };
      
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  },
  
  // ============================================
  // LOGIN
  // ============================================
  async login(email, password) {
    try {
      const supabase = await this.init();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      return {
        success: true,
        user: data.user,
        session: data.session,
        message: 'Login successful!'
      };
      
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  },
  
  // ============================================
  // GOOGLE LOGIN
  // ============================================
  async loginWithGoogle() {
    try {
      const supabase = await this.init();
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (error) throw error;
      
      return { success: true, data };
      
    } catch (error) {
      console.error('Google login error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  },
  
  // ============================================
  // LOGOUT
  // ============================================
  async logout() {
    try {
      const supabase = await this.init();
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      window.location.href = '/';
      return { success: true };
      
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, message: error.message };
    }
  },
  
  // ============================================
  // RESET PASSWORD
  // ============================================
  async resetPassword(email) {
    try {
      const supabase = await this.init();
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password'
      });
      
      if (error) throw error;
      
      return {
        success: true,
        message: 'A password reset link has been sent to your email address.'
      };
      
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  },
  
  // ============================================
  // GET CURRENT USER
  // ============================================
  async getCurrentUser() {
    try {
      const supabase = await this.init();
      
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) return null;
      
      // Fetch detailed info from users table
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return {
        ...user,
        ...userData
      };
      
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  },
  
  // ============================================
  // GET SESSION
  // ============================================
  async getSession() {
    try {
      const supabase = await this.init();
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  },
  
  // ============================================
  // CHECK IF LOGGED IN
  // ============================================
  async isLoggedIn() {
    const session = await this.getSession();
    return !!session;
  },
  
  // ============================================
  // CHECK IF ADMIN
  // ============================================
  async isAdmin() {
    const user = await this.getCurrentUser();
    return user?.is_admin === true || user?.role === 'super_admin';
  },
  
  // ============================================
  // CHECK IF PREMIUM
  // ============================================
  async isPremium() {
    const user = await this.getCurrentUser();
    return user?.is_premium === true;
  },
  
  // ============================================
  // PROTECT PAGE
  // ============================================
  async requireAuth(redirectTo = '/login') {
    const isLoggedIn = await this.isLoggedIn();
    
    if (!isLoggedIn) {
      window.location.href = redirectTo;
      return false;
    }
    
    return true;
  },
  
  async requireAdmin(redirectTo = '/dashboard') {
    const isAdmin = await this.isAdmin();
    
    if (!isAdmin) {
      window.location.href = redirectTo;
      return false;
    }
    
    return true;
  },
  
  // ============================================
  // ERROR MESSAGES (English)
  // ============================================
  getErrorMessage(error) {
    const message = error.message || error.toString();
    
    const messages = {
      'Invalid login credentials': 'Invalid email or password',
      'Email not confirmed': 'Please verify your email address',
      'User already registered': 'This email address is already registered',
      'Password should be at least 6 characters': 'Password must be at least 6 characters',
      'Unable to validate email address: invalid format': 'Invalid email format',
      'Email rate limit exceeded': 'Too many attempts. Please wait a moment.',
      'For security purposes, you can only request this once every 60 seconds': 'For security reasons, you can only try this once every 60 seconds'
    };
    
    return messages[message] || message;
  },
  
  // ============================================
  // LISTEN AUTH CHANGES
  // ============================================
  async onAuthChange(callback) {
    const supabase = await this.init();
    
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }
};

// Global
window.Auth = Auth;
