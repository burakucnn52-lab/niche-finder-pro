// ============================================
// NICHIFY PRO - TÜRKÇE NİŞ VERİTABANI
// 100+ Niş, kategori, alt niş, RPM bilgileri
// ============================================

const NICHES_DATA = [
  
  // ============================================
  // TEKNOLOJİ (8)
  // ============================================
  {
    id: 'ai-tools',
    icon: '🤖',
    name: 'AI Araçları ve Otomasyon',
    category: 'Teknoloji',
    subCategories: ['ChatGPT', 'Midjourney', 'Claude', 'AI Workflow'],
    keywords: ['AI tools', 'artificial intelligence', 'ChatGPT', 'AI automation'],
    rpm: { min: 8, max: 15 },
    competition: 75,
    growth: 95,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'AI araçlarını tanıtma, kullanım rehberleri ve otomasyon ipuçları'
  },
  {
    id: 'nocode',
    icon: '⚙️',
    name: 'No-Code Otomasyon',
    category: 'Teknoloji',
    subCategories: ['Zapier', 'Make', 'Notion', 'Airtable'],
    keywords: ['no-code', 'automation', 'zapier', 'make.com'],
    rpm: { min: 10, max: 18 },
    competition: 45,
    growth: 88,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Kod yazmadan otomasyon kurma, iş akışları'
  },
  {
    id: 'prompt-engineering',
    icon: '💡',
    name: 'Prompt Mühendisliği',
    category: 'Teknoloji',
    subCategories: ['ChatGPT Prompts', 'Midjourney Prompts', 'AI Writing'],
    keywords: ['prompt engineering', 'AI prompts', 'ChatGPT tips'],
    rpm: { min: 7, max: 13 },
    competition: 50,
    growth: 92,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'AI modellerinden en iyi sonucu almak için prompt yazma'
  },
  {
    id: 'tech-reviews',
    icon: '📱',
    name: 'Teknoloji İncelemeleri',
    category: 'Teknoloji',
    subCategories: ['Telefon', 'Laptop', 'Gadget', 'Akıllı Saat'],
    keywords: ['tech review', 'gadget', 'iphone review', 'smartphone'],
    rpm: { min: 6, max: 12 },
    competition: 85,
    growth: 70,
    sustainability: 90,
    facelessSupport: false,
    shortsSupport: true,
    description: 'Akıllı telefon, laptop ve gadget incelemeleri'
  },
  {
    id: 'coding',
    icon: '💻',
    name: 'Programlama Eğitimi',
    category: 'Teknoloji',
    subCategories: ['Python', 'JavaScript', 'Web Dev', 'Mobile Dev'],
    keywords: ['coding tutorial', 'programming', 'python', 'javascript'],
    rpm: { min: 8, max: 14 },
    competition: 80,
    growth: 75,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Programlama dilleri, framework eğitimleri'
  },
  {
    id: 'cybersecurity',
    icon: '🔒',
    name: 'Siber Güvenlik',
    category: 'Teknoloji',
    subCategories: ['Ethical Hacking', 'Privacy', 'VPN', 'Crypto Security'],
    keywords: ['cybersecurity', 'hacking', 'privacy', 'security'],
    rpm: { min: 9, max: 16 },
    competition: 60,
    growth: 80,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Güvenlik ipuçları, etik hackleme, gizlilik'
  },
  {
    id: 'crypto-blockchain',
    icon: '₿',
    name: 'Kripto & Blockchain',
    category: 'Teknoloji',
    subCategories: ['Bitcoin', 'Ethereum', 'NFT', 'DeFi'],
    keywords: ['crypto', 'bitcoin', 'blockchain', 'NFT'],
    rpm: { min: 12, max: 25 },
    competition: 85,
    growth: 65,
    sustainability: 70,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Kripto para analizi, blockchain teknolojileri'
  },
  {
    id: 'productivity',
    icon: '📋',
    name: 'Verimlilik Sistemleri',
    category: 'Yaşam',
    subCategories: ['Notion', 'Time Management', 'GTD', 'Habits'],
    keywords: ['productivity', 'notion', 'time management', 'habits'],
    rpm: { min: 7, max: 12 },
    competition: 65,
    growth: 75,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Verimlilik, zaman yönetimi, alışkanlıklar'
  },
  
  // ============================================
  // FİNANS & PARA (10)
  // ============================================
  {
    id: 'personal-finance',
    icon: '💰',
    name: 'Kişisel Finans',
    category: 'Finans',
    subCategories: ['Bütçe', 'Tasarruf', 'Borç', 'Emeklilik'],
    keywords: ['personal finance', 'budget', 'saving money'],
    rpm: { min: 15, max: 30 },
    competition: 70,
    growth: 80,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Para yönetimi, bütçeleme, tasarruf'
  },
  {
    id: 'investing',
    icon: '📈',
    name: 'Yatırım & Borsa',
    category: 'Finans',
    subCategories: ['Hisse', 'ETF', 'Temettü', 'Fon'],
    keywords: ['investing', 'stock market', 'ETF', 'dividend'],
    rpm: { min: 18, max: 35 },
    competition: 80,
    growth: 75,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Borsa, hisse analizi, yatırım stratejileri'
  },
  {
    id: 'passive-income',
    icon: '💸',
    name: 'Pasif Gelir',
    category: 'Finans',
    subCategories: ['Affiliate', 'Dropshipping', 'Print on Demand', 'Stocks'],
    keywords: ['passive income', 'side hustle', 'make money online'],
    rpm: { min: 12, max: 22 },
    competition: 85,
    growth: 70,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Pasif gelir yöntemleri, online para kazanma'
  },
  {
    id: 'real-estate',
    icon: '🏠',
    name: 'Gayrimenkul Yatırımı',
    category: 'Finans',
    subCategories: ['Kiralama', 'Flip', 'REIT', 'Airbnb'],
    keywords: ['real estate', 'property investment', 'airbnb'],
    rpm: { min: 20, max: 40 },
    competition: 65,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: false,
    description: 'Emlak yatırımı, kiralama, flip'
  },
  {
    id: 'entrepreneurship',
    icon: '🚀',
    name: 'Girişimcilik',
    category: 'İş',
    subCategories: ['Startup', 'SaaS', 'Business Ideas', 'Funding'],
    keywords: ['entrepreneurship', 'startup', 'business ideas'],
    rpm: { min: 14, max: 28 },
    competition: 75,
    growth: 80,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Girişimcilik, startup, iş fikirleri'
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    name: 'E-Ticaret',
    category: 'İş',
    subCategories: ['Shopify', 'Amazon FBA', 'Etsy', 'eBay'],
    keywords: ['ecommerce', 'shopify', 'amazon FBA', 'dropshipping'],
    rpm: { min: 12, max: 25 },
    competition: 80,
    growth: 70,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Online satış, e-ticaret stratejileri'
  },
  {
    id: 'freelance',
    icon: '💼',
    name: 'Freelance Yaşam',
    category: 'İş',
    subCategories: ['Upwork', 'Fiverr', 'Remote Work', 'Client Management'],
    keywords: ['freelance', 'upwork', 'remote work', 'fiverr'],
    rpm: { min: 8, max: 16 },
    competition: 60,
    growth: 75,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Freelance çalışma, uzaktan iş'
  },
  {
    id: 'newsletter',
    icon: '📰',
    name: 'Newsletter Yazımı',
    category: 'İş',
    subCategories: ['Substack', 'ConvertKit', 'Beehiiv', 'Email Marketing'],
    keywords: ['newsletter', 'substack', 'email marketing'],
    rpm: { min: 10, max: 18 },
    competition: 40,
    growth: 88,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Newsletter başlatma ve büyütme'
  },
  {
    id: 'crypto-trading',
    icon: '📊',
    name: 'Kripto Trading',
    category: 'Finans',
    subCategories: ['Spot', 'Futures', 'DeFi', 'Analiz'],
    keywords: ['crypto trading', 'bitcoin trading', 'futures'],
    rpm: { min: 15, max: 30 },
    competition: 75,
    growth: 60,
    sustainability: 65,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Kripto alım satım, teknik analiz'
  },
  {
    id: 'frugal-living',
    icon: '🌱',
    name: 'Tasarruflu Yaşam',
    category: 'Finans',
    subCategories: ['Minimalizm', 'DIY', 'Coupons', 'Saving'],
    keywords: ['frugal living', 'minimalism', 'saving money'],
    rpm: { min: 8, max: 14 },
    competition: 50,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Tasarruf, minimalizm, akıllı harcama'
  },
  
  // ============================================
  // EĞİTİM & ÖĞRENME (8)
  // ============================================
  {
    id: 'language-learning',
    icon: '🗣️',
    name: 'Dil Öğrenme',
    category: 'Eğitim',
    subCategories: ['İngilizce', 'İspanyolca', 'Almanca', 'Çince'],
    keywords: ['language learning', 'english', 'spanish'],
    rpm: { min: 6, max: 12 },
    competition: 85,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Dil öğrenme ipuçları, gramer, kelime'
  },
  {
    id: 'study-tips',
    icon: '📚',
    name: 'Verimli Çalışma',
    category: 'Eğitim',
    subCategories: ['Pomodoro', 'Note Taking', 'Memory', 'Exam Prep'],
    keywords: ['study tips', 'study with me', 'productivity'],
    rpm: { min: 5, max: 10 },
    competition: 75,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Çalışma teknikleri, sınav hazırlık'
  },
  {
    id: 'history',
    icon: '📜',
    name: 'Tarih Hikayeleri',
    category: 'Eğitim',
    subCategories: ['Antik Tarih', 'Savaşlar', 'Mitoloji', 'Biyografi'],
    keywords: ['history', 'ancient history', 'documentary'],
    rpm: { min: 5, max: 9 },
    competition: 55,
    growth: 70,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Tarih, savaşlar, mitoloji'
  },
  {
    id: 'science',
    icon: '🔬',
    name: 'Bilim Açıklamaları',
    category: 'Eğitim',
    subCategories: ['Fizik', 'Kimya', 'Biyoloji', 'Astronomi'],
    keywords: ['science', 'physics', 'biology', 'space'],
    rpm: { min: 6, max: 11 },
    competition: 65,
    growth: 75,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Bilim konuları, deneyler, açıklamalar'
  },
  {
    id: 'space-astronomy',
    icon: '🚀',
    name: 'Uzay ve Astronomi',
    category: 'Eğitim',
    subCategories: ['Gezegenler', 'Kara Delikler', 'NASA', 'SpaceX'],
    keywords: ['space', 'astronomy', 'planets', 'NASA'],
    rpm: { min: 7, max: 13 },
    competition: 60,
    growth: 80,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Uzay, gezegenler, evren'
  },
  {
    id: 'engineering',
    icon: '⚙️',
    name: 'Mühendislik Hikayeleri',
    category: 'Belgesel',
    subCategories: ['Köprüler', 'Makineler', 'İnşaat', 'Mega Yapılar'],
    keywords: ['engineering', 'mega projects', 'construction'],
    rpm: { min: 8, max: 14 },
    competition: 45,
    growth: 82,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Mühendislik, mega projeler, yapılar'
  },
  {
    id: 'geography',
    icon: '🌍',
    name: 'Coğrafya',
    category: 'Eğitim',
    subCategories: ['Ülkeler', 'Haritalar', 'Kültürler', 'İklim'],
    keywords: ['geography', 'countries', 'maps', 'travel'],
    rpm: { min: 5, max: 9 },
    competition: 50,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Ülkeler, haritalar, coğrafya'
  },
  {
    id: 'book-summaries',
    icon: '📖',
    name: 'Kitap Özetleri',
    category: 'Eğitim',
    subCategories: ['Self-Help', 'İş', 'Roman', 'Biyografi'],
    keywords: ['book summary', 'book review', 'self help'],
    rpm: { min: 6, max: 11 },
    competition: 60,
    growth: 70,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Kitap özetleri ve incelemeleri'
  },
  
  // ============================================
  // YAŞAM & SAĞLIK (10)
  // ============================================
  {
    id: 'fitness',
    icon: '💪',
    name: 'Ev Fitness',
    category: 'Sağlık',
    subCategories: ['HIIT', 'Yoga', 'Kalistenik', 'Pilates'],
    keywords: ['home workout', 'fitness', 'HIIT', 'yoga'],
    rpm: { min: 6, max: 12 },
    competition: 80,
    growth: 70,
    sustainability: 90,
    facelessSupport: false,
    shortsSupport: true,
    description: 'Evde fitness, antrenman programları'
  },
  {
    id: 'meal-prep',
    icon: '🍱',
    name: 'Yemek Hazırlığı',
    category: 'Yemek',
    subCategories: ['Haftalık Plan', 'Sağlıklı', 'Bütçe Dostu', 'Vegan'],
    keywords: ['meal prep', 'healthy eating', 'weekly menu'],
    rpm: { min: 5, max: 10 },
    competition: 60,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Haftalık yemek planı, sağlıklı tarifler'
  },
  {
    id: 'psychology',
    icon: '🧠',
    name: 'Psikoloji ve Davranış',
    category: 'Eğitim',
    subCategories: ['Self-Improvement', 'İlişkiler', 'Mental Sağlık', 'Mindfulness'],
    keywords: ['psychology', 'self improvement', 'mental health'],
    rpm: { min: 8, max: 15 },
    competition: 70,
    growth: 85,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Psikoloji, kişisel gelişim'
  },
  {
    id: 'yoga-meditation',
    icon: '🧘',
    name: 'Yoga ve Meditasyon',
    category: 'Sağlık',
    subCategories: ['Yoga', 'Meditasyon', 'Nefes', 'Mindfulness'],
    keywords: ['yoga', 'meditation', 'mindfulness'],
    rpm: { min: 5, max: 10 },
    competition: 75,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Yoga, meditasyon, mindfulness'
  },
  {
    id: 'beauty-skincare',
    icon: '💄',
    name: 'Doğal Güzellik',
    category: 'Yaşam',
    subCategories: ['Cilt Bakımı', 'Makyaj', 'Saç', 'Doğal'],
    keywords: ['skincare', 'beauty', 'makeup', 'natural'],
    rpm: { min: 6, max: 12 },
    competition: 90,
    growth: 65,
    sustainability: 85,
    facelessSupport: false,
    shortsSupport: true,
    description: 'Cilt bakımı, makyaj, güzellik'
  },
  {
    id: 'mental-health',
    icon: '💭',
    name: 'Mental Sağlık',
    category: 'Sağlık',
    subCategories: ['Anksiyete', 'Depresyon', 'Therapy', 'Self-Care'],
    keywords: ['mental health', 'anxiety', 'depression'],
    rpm: { min: 7, max: 13 },
    competition: 70,
    growth: 85,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Mental sağlık, anksiyete, terapi'
  },
  {
    id: 'minimalism',
    icon: '🏡',
    name: 'Minimalizm',
    category: 'Yaşam',
    subCategories: ['Decluttering', 'Lifestyle', 'Tiny House', 'Capsule Wardrobe'],
    keywords: ['minimalism', 'declutter', 'simple living'],
    rpm: { min: 6, max: 12 },
    competition: 55,
    growth: 75,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Minimalist yaşam, sade yaşam'
  },
  {
    id: 'parenting',
    icon: '👨‍👩‍👧',
    name: 'Ebeveynlik İpuçları',
    category: 'Yaşam',
    subCategories: ['Bebek', 'Çocuk', 'Eğitim', 'Aile'],
    keywords: ['parenting', 'baby', 'kids', 'family'],
    rpm: { min: 7, max: 13 },
    competition: 75,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Ebeveynlik, çocuk eğitimi'
  },
  {
    id: 'sleep-health',
    icon: '😴',
    name: 'Uyku ve Sağlık',
    category: 'Sağlık',
    subCategories: ['Uyku Hijyeni', 'İnsomnia', 'Sleep Tracking', 'Naps'],
    keywords: ['sleep', 'insomnia', 'sleep health'],
    rpm: { min: 6, max: 12 },
    competition: 45,
    growth: 80,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Uyku düzeni, sağlıklı uyku'
  },
  {
    id: 'nutrition',
    icon: '🥗',
    name: 'Beslenme ve Diyet',
    category: 'Sağlık',
    subCategories: ['Keto', 'Vegan', 'İntermittent Fasting', 'Macros'],
    keywords: ['nutrition', 'diet', 'keto', 'vegan'],
    rpm: { min: 7, max: 14 },
    competition: 85,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Beslenme, diyet, sağlıklı yeme'
  },
  
  // ============================================
  // SANAT & YARATICILIK (8)
  // ============================================
  {
    id: 'digital-art',
    icon: '🎨',
    name: 'Dijital Sanat',
    category: 'Sanat',
    subCategories: ['Procreate', 'Photoshop', 'Illustrator', 'AI Art'],
    keywords: ['digital art', 'procreate', 'photoshop', 'AI art'],
    rpm: { min: 5, max: 10 },
    competition: 70,
    growth: 80,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Dijital sanat, çizim, illüstrasyon'
  },
  {
    id: 'video-editing',
    icon: '🎬',
    name: 'Video Düzenleme',
    category: 'Sanat',
    subCategories: ['CapCut', 'Premiere', 'DaVinci', 'Final Cut'],
    keywords: ['video editing', 'capcut', 'premiere'],
    rpm: { min: 7, max: 13 },
    competition: 75,
    growth: 80,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Video editing eğitimleri'
  },
  {
    id: 'photography',
    icon: '📷',
    name: 'Mobil Fotoğrafçılık',
    category: 'Sanat',
    subCategories: ['iPhone', 'Android', 'Edit Apps', 'Composition'],
    keywords: ['photography', 'mobile photography', 'iphone'],
    rpm: { min: 5, max: 10 },
    competition: 65,
    growth: 70,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Telefonla fotoğraf çekme'
  },
  {
    id: 'music-production',
    icon: '🎵',
    name: 'Müzik Prodüksiyonu',
    category: 'Sanat',
    subCategories: ['FL Studio', 'Ableton', 'Beat Making', 'Mixing'],
    keywords: ['music production', 'beat making', 'FL studio'],
    rpm: { min: 5, max: 9 },
    competition: 75,
    growth: 65,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Müzik prodüksiyonu, beat yapımı'
  },
  {
    id: 'writing',
    icon: '✍️',
    name: 'Yaratıcı Yazarlık',
    category: 'Sanat',
    subCategories: ['Hikaye', 'Roman', 'Senaryo', 'Şiir'],
    keywords: ['creative writing', 'novel writing', 'storytelling'],
    rpm: { min: 6, max: 11 },
    competition: 50,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Yazarlık, hikaye, roman'
  },
  {
    id: 'diy-crafts',
    icon: '🔨',
    name: 'Ev Tamiri DIY',
    category: 'Pratik',
    subCategories: ['Tamir', 'Marangozluk', 'Dekorasyon', 'Tools'],
    keywords: ['DIY', 'home repair', 'crafts'],
    rpm: { min: 5, max: 10 },
    competition: 60,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Ev tamiri, DIY projeler'
  },
  {
    id: 'painting',
    icon: '🖼️',
    name: 'Geleneksel Resim',
    category: 'Sanat',
    subCategories: ['Yağlı Boya', 'Akrilik', 'Suluboya', 'Eskiz'],
    keywords: ['painting', 'watercolor', 'oil painting'],
    rpm: { min: 4, max: 8 },
    competition: 55,
    growth: 60,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Resim, boyama teknikleri'
  },
  {
    id: 'thumbnail-design',
    icon: '🖼️',
    name: 'Thumbnail Tasarımı',
    category: 'Sanat',
    subCategories: ['Photoshop', 'Canva', 'YouTube', 'Templates'],
    keywords: ['thumbnail design', 'youtube thumbnail'],
    rpm: { min: 6, max: 12 },
    competition: 40,
    growth: 85,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'YouTube thumbnail tasarımı'
  },
  
  // ============================================
  // EĞLENCE & POPÜLER KÜLTÜR (10)
  // ============================================
  {
    id: 'fact-bites',
    icon: '💡',
    name: 'İlginç Bilgiler',
    category: 'Eğitim',
    subCategories: ['Tarih', 'Bilim', 'Doğa', 'İnsan'],
    keywords: ['interesting facts', 'did you know', 'facts'],
    rpm: { min: 4, max: 8 },
    competition: 60,
    growth: 80,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: '60 saniye bilgi, ilginç gerçekler'
  },
  {
    id: 'mystery-stories',
    icon: '🔍',
    name: 'Gizem Hikayeleri',
    category: 'Eğlence',
    subCategories: ['Çözülmemiş', 'True Crime', 'Paranormal', 'Komplo'],
    keywords: ['mystery', 'unsolved', 'true crime'],
    rpm: { min: 7, max: 13 },
    competition: 65,
    growth: 75,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Gizem, çözülmemiş vakalar'
  },
  {
    id: 'comedy-shorts',
    icon: '😂',
    name: 'Komedi Shorts',
    category: 'Eğlence',
    subCategories: ['Skit', 'Reaction', 'Parody', 'Memes'],
    keywords: ['comedy', 'funny', 'shorts'],
    rpm: { min: 3, max: 7 },
    competition: 85,
    growth: 70,
    sustainability: 75,
    facelessSupport: false,
    shortsSupport: true,
    description: 'Kısa komedi videoları'
  },
  {
    id: 'gaming',
    icon: '🎮',
    name: 'Oyun İncelemeleri',
    category: 'Eğlence',
    subCategories: ['Yeni Oyunlar', 'Rehber', 'Speedrun', 'Lore'],
    keywords: ['gaming', 'game review', 'walkthrough'],
    rpm: { min: 4, max: 9 },
    competition: 90,
    growth: 65,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Oyun incelemeleri, rehberler'
  },
  {
    id: 'mobile-gaming',
    icon: '📱',
    name: 'Mobil Oyunlar',
    category: 'Eğlence',
    subCategories: ['Casual', 'Strategy', 'RPG', 'Reviews'],
    keywords: ['mobile gaming', 'mobile games'],
    rpm: { min: 4, max: 8 },
    competition: 75,
    growth: 70,
    sustainability: 75,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Mobil oyunlar, incelemeler'
  },
  {
    id: 'anime-manga',
    icon: '🎌',
    name: 'Anime ve Manga',
    category: 'Eğlence',
    subCategories: ['Review', 'Top 10', 'Theory', 'News'],
    keywords: ['anime', 'manga', 'anime review'],
    rpm: { min: 4, max: 8 },
    competition: 80,
    growth: 70,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Anime, manga incelemeleri'
  },
  {
    id: 'movie-reviews',
    icon: '🎬',
    name: 'Film İncelemeleri',
    category: 'Eğlence',
    subCategories: ['Yeni Filmler', 'Klasikler', 'Analiz', 'Top 10'],
    keywords: ['movie review', 'film analysis'],
    rpm: { min: 5, max: 10 },
    competition: 80,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Film inceleme ve analizleri'
  },
  {
    id: 'celebrity-news',
    icon: '⭐',
    name: 'Ünlüler ve Magazin',
    category: 'Eğlence',
    subCategories: ['Haber', 'Skandal', 'Drama', 'Lifestyle'],
    keywords: ['celebrity', 'gossip', 'entertainment news'],
    rpm: { min: 3, max: 7 },
    competition: 90,
    growth: 60,
    sustainability: 70,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Ünlüler, magazin haberleri'
  },
  {
    id: 'sports-analysis',
    icon: '⚽',
    name: 'Spor Analizi',
    category: 'Spor',
    subCategories: ['Futbol', 'Basketbol', 'NBA', 'Premier League'],
    keywords: ['sports', 'football', 'basketball', 'NBA'],
    rpm: { min: 5, max: 11 },
    competition: 85,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Spor analizi, futbol, basketbol'
  },
  {
    id: 'true-crime',
    icon: '🚔',
    name: 'Gerçek Suç Hikayeleri',
    category: 'Eğlence',
    subCategories: ['Çözülmüş', 'Çözülmemiş', 'Seri Katiller', 'Cold Case'],
    keywords: ['true crime', 'crime stories', 'cold case'],
    rpm: { min: 8, max: 16 },
    competition: 75,
    growth: 75,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Gerçek suç hikayeleri'
  },
  
  // ============================================
  // YAŞAM TARZI & HOBİ (8)
  // ============================================
  {
    id: 'travel',
    icon: '✈️',
    name: 'Az Bilinen Seyahat',
    category: 'Seyahat',
    subCategories: ['Hidden Gems', 'Budget Travel', 'Solo', 'Adventure'],
    keywords: ['hidden travel', 'travel tips', 'budget travel'],
    rpm: { min: 8, max: 16 },
    competition: 75,
    growth: 70,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Az bilinen seyahat yerleri'
  },
  {
    id: 'pets',
    icon: '🐶',
    name: 'Evcil Hayvan Bakımı',
    category: 'Yaşam',
    subCategories: ['Köpek', 'Kedi', 'Eğitim', 'Sağlık'],
    keywords: ['pets', 'dog', 'cat', 'pet care'],
    rpm: { min: 5, max: 10 },
    competition: 75,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Evcil hayvan bakımı'
  },
  {
    id: 'plants',
    icon: '🌱',
    name: 'Bitki Bakımı',
    category: 'Yaşam',
    subCategories: ['İç Mekan', 'Bahçe', 'Sukulent', 'Sebze'],
    keywords: ['houseplants', 'gardening', 'plant care'],
    rpm: { min: 4, max: 9 },
    competition: 65,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Bitki bakımı, ev bahçeciliği'
  },
  {
    id: 'car-content',
    icon: '🚗',
    name: 'Otomobil İçeriği',
    category: 'Hobi',
    subCategories: ['Review', 'Tuning', 'Karşılaştırma', 'News'],
    keywords: ['cars', 'car review', 'automotive'],
    rpm: { min: 8, max: 16 },
    competition: 80,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Araba incelemeleri'
  },
  {
    id: 'motorcycle',
    icon: '🏍️',
    name: 'Motosiklet',
    category: 'Hobi',
    subCategories: ['Review', 'Tour', 'Tips', 'Gear'],
    keywords: ['motorcycle', 'bike review'],
    rpm: { min: 7, max: 14 },
    competition: 60,
    growth: 70,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Motosiklet, ekipman'
  },
  {
    id: 'running',
    icon: '🏃',
    name: 'Koşu ve Maraton',
    category: 'Spor',
    subCategories: ['Antrenman', 'Beslenme', 'Yarış', 'Spor Ayakkabı'],
    keywords: ['running', 'marathon', 'training'],
    rpm: { min: 6, max: 12 },
    competition: 55,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Koşu, maraton antrenmanları'
  },
  {
    id: 'fishing',
    icon: '🎣',
    name: 'Balık Tutma',
    category: 'Hobi',
    subCategories: ['Tatlı Su', 'Deniz', 'Ekipman', 'Lokasyon'],
    keywords: ['fishing', 'angling'],
    rpm: { min: 5, max: 10 },
    competition: 50,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Balık tutma, ekipman'
  },
  {
    id: 'collecting',
    icon: '🃏',
    name: 'Koleksiyonculuk',
    category: 'Hobi',
    subCategories: ['Kart', 'Para', 'Pul', 'Vintage'],
    keywords: ['collecting', 'cards', 'vintage'],
    rpm: { min: 6, max: 12 },
    competition: 45,
    growth: 70,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Koleksiyonculuk, kart koleksiyonu'
  },
  
  // ============================================
  // PROFESYONEL & KARİYER (5)
  // ============================================
  {
    id: 'career-advice',
    icon: '💼',
    name: 'Kariyer Tavsiyesi',
    category: 'İş',
    subCategories: ['CV', 'Mülakat', 'LinkedIn', 'Networking'],
    keywords: ['career advice', 'job tips', 'resume', 'interview'],
    rpm: { min: 9, max: 17 },
    competition: 70,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'CV, mülakat, kariyer'
  },
  {
    id: 'marketing',
    icon: '📣',
    name: 'Dijital Pazarlama',
    category: 'İş',
    subCategories: ['SEO', 'Social Media', 'Ads', 'Content'],
    keywords: ['digital marketing', 'SEO', 'social media marketing'],
    rpm: { min: 12, max: 22 },
    competition: 80,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Dijital pazarlama, SEO, sosyal medya'
  },
  {
    id: 'sales',
    icon: '🤝',
    name: 'Satış Teknikleri',
    category: 'İş',
    subCategories: ['B2B', 'Closing', 'Negotiation', 'Cold Calling'],
    keywords: ['sales', 'selling', 'B2B sales'],
    rpm: { min: 10, max: 20 },
    competition: 65,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Satış teknikleri, müzakere'
  },
  {
    id: 'leadership',
    icon: '👔',
    name: 'Liderlik',
    category: 'İş',
    subCategories: ['Management', 'Team Building', 'Communication'],
    keywords: ['leadership', 'management', 'team building'],
    rpm: { min: 11, max: 20 },
    competition: 60,
    growth: 70,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Liderlik, yönetim'
  },
  {
    id: 'productivity-apps',
    icon: '📱',
    name: 'Verimlilik Uygulamaları',
    category: 'Teknoloji',
    subCategories: ['Notion', 'Obsidian', 'Todoist', 'Trello'],
    keywords: ['productivity apps', 'notion', 'obsidian'],
    rpm: { min: 7, max: 13 },
    competition: 55,
    growth: 80,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Verimlilik uygulamaları'
  }
];

// Kategori listesi
const NICHE_CATEGORIES = [
  { id: 'all', name: 'Tümü', icon: '🌐' },
  { id: 'Teknoloji', name: 'Teknoloji', icon: '💻' },
  { id: 'Finans', name: 'Finans', icon: '💰' },
  { id: 'İş', name: 'İş & Kariyer', icon: '💼' },
  { id: 'Eğitim', name: 'Eğitim', icon: '📚' },
  { id: 'Sağlık', name: 'Sağlık', icon: '🏥' },
  { id: 'Yaşam', name: 'Yaşam Tarzı', icon: '🏡' },
  { id: 'Sanat', name: 'Sanat', icon: '🎨' },
  { id: 'Eğlence', name: 'Eğlence', icon: '🎭' },
  { id: 'Spor', name: 'Spor', icon: '⚽' },
  { id: 'Seyahat', name: 'Seyahat', icon: '✈️' },
  { id: 'Hobi', name: 'Hobi', icon: '🎯' },
  { id: 'Belgesel', name: 'Belgesel', icon: '🎬' },
  { id: 'Yemek', name: 'Yemek', icon: '🍳' },
  { id: 'Pratik', name: 'Pratik', icon: '🔧' }
];

// Niş skorunu hesapla (10 kriter)
function calculateNicheScore(niche) {
  const weights = {
    competition: 0.15,      // Düşük rekabet = yüksek puan (tersine)
    growth: 0.20,           // Büyüme
    sustainability: 0.15,   // Sürdürülebilirlik
    rpm: 0.15,              // Para kazanma potansiyeli
    facelessSupport: 0.10,  // Faceless destek
    shortsSupport: 0.10,    // Shorts uyumu
    newCreatorFriendly: 0.05, // Yeni kanal dostu
    longVideoSupport: 0.05,  // Uzun video desteği
    underrated: 0.03,        // Az değerli
    multiLanguage: 0.02      // Çok dilli fırsat
  };
  
  const competitionScore = 100 - niche.competition;
  const rpmAverage = (niche.rpm.min + niche.rpm.max) / 2;
  const rpmScore = Math.min(rpmAverage * 4, 100);
  
  let score = 0;
  score += competitionScore * weights.competition;
  score += niche.growth * weights.growth;
  score += niche.sustainability * weights.sustainability;
  score += rpmScore * weights.rpm;
  score += (niche.facelessSupport ? 100 : 50) * weights.facelessSupport;
  score += (niche.shortsSupport ? 100 : 50) * weights.shortsSupport;
  score += (niche.competition < 60 ? 90 : 60) * weights.newCreatorFriendly;
  score += 80 * weights.longVideoSupport;
  score += (niche.competition < 50 ? 100 : 60) * weights.underrated;
  score += 70 * weights.multiLanguage;
  
  return Math.round(score);
}

// Hidden Opportunity tespiti
function isHiddenOpportunity(niche) {
  return niche.competition < 60 && 
         niche.growth > 75 && 
         (niche.rpm.min + niche.rpm.max) / 2 > 8;
}

// Tahmini kazanç hesaplama
function calculateEarnings(niche, monthlyViews = 100000) {
  const rpmAverage = (niche.rpm.min + niche.rpm.max) / 2;
  const monthlyEarnings = (monthlyViews / 1000) * rpmAverage;
  return {
    monthly: Math.round(monthlyEarnings),
    yearly: Math.round(monthlyEarnings * 12),
    rpm: rpmAverage
  };
}

// Global
window.NICHES_DATA = NICHES_DATA;
window.NICHE_CATEGORIES = NICHE_CATEGORIES;
window.calculateNicheScore = calculateNicheScore;
window.isHiddenOpportunity = isHiddenOpportunity;
window.calculateEarnings = calculateEarnings;
