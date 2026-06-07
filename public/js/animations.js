// ============================================
// NICHIFY PRO - ANIMATIONS JS
// Number counters, scroll reveal, interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ============================================
  // 1. NUMBER COUNTER ANIMATION
  // ============================================
  const counters = document.querySelectorAll('[data-target]');
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const format = element.getAttribute('data-format');
    const duration = 2000;
    const startTime = performance.now();
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * easeOut);
      
      if (format === 'number') {
        if (current >= 1000000) {
          element.textContent = (current / 1000000).toFixed(1) + 'M';
        } else if (current >= 1000) {
          element.textContent = (current / 1000).toFixed(1) + 'K';
        } else {
          element.textContent = current.toLocaleString('tr-TR');
        }
      } else {
        element.textContent = current.toLocaleString('tr-TR');
      }
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    
    requestAnimationFrame(update);
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
  
  // ============================================
  // 2. SCROLL REVEAL
  // ============================================
  const reveals = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  reveals.forEach(el => revealObserver.observe(el));
  
  // ============================================
  // 3. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ============================================
  // 4. NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // ============================================
  // 5. LIVE STOCK COUNTER UPDATE
  // ============================================
  // (Sonra Supabase'den çekeceğiz)
  const stockCounter = document.getElementById('stock-counter');
  const lifetimeCounter = document.getElementById('lifetime-counter');
  const stockFill = document.querySelector('.stock-fill');
  
  // Şimdilik statik - sonra Supabase'den gelecek
  const updateStock = (sold = 12) => {
    const total = 100;
    const remaining = total - sold;
    const percentage = (sold / total) * 100;
    
    if (stockCounter) stockCounter.textContent = remaining;
    if (lifetimeCounter) lifetimeCounter.textContent = `${sold}/${total}`;
    if (stockFill) stockFill.style.width = percentage + '%';
  };
  
  updateStock();
  
  // ============================================
  // 6. CONSOLE EASTER EGG 🎉
  // ============================================
  console.log(
    '%c🎯 NICHIFY PRO',
    'background: linear-gradient(135deg, #4da3ff, #a78bfa); color: white; padding: 8px 16px; font-size: 16px; font-weight: bold; border-radius: 4px;'
  );
  console.log(
    '%c👋 Hoş geldin developer!',
    'color: #4da3ff; font-size: 14px; font-weight: bold;'
  );
  console.log(
    '%cBu projeyi inceliyor musun? GitHub: github.com/...',
    'color: #8a99b8; font-size: 12px;'
  );
  
});
