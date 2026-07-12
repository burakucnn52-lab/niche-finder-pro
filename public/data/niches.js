// ============================================
// NICHIFY PRO - ENGLISH NICHE DATABASE
// 100+ Niches, categories, sub-niches, RPM info
// ============================================

const NICHES_DATA = [
  
  // ============================================
  // TECHNOLOGY (8)
  // ============================================
  {
    id: 'ai-tools',
    icon: '🤖',
    name: 'AI Tools & Automation',
    category: 'Technology',
    subCategories: ['ChatGPT', 'Midjourney', 'Claude', 'AI Workflow'],
    keywords: ['AI tools', 'artificial intelligence', 'ChatGPT', 'AI automation'],
    rpm: { min: 8, max: 15 },
    competition: 75,
    growth: 95,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Introducing AI tools, usage guides, and automation tips'
  },
  {
    id: 'nocode',
    icon: '⚙️',
    name: 'No-Code Automation',
    category: 'Technology',
    subCategories: ['Zapier', 'Make', 'Notion', 'Airtable'],
    keywords: ['no-code', 'automation', 'zapier', 'make.com'],
    rpm: { min: 10, max: 18 },
    competition: 45,
    growth: 88,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Setting up automation without code, workflows'
  },
  {
    id: 'prompt-engineering',
    icon: '💡',
    name: 'Prompt Engineering',
    category: 'Technology',
    subCategories: ['ChatGPT Prompts', 'Midjourney Prompts', 'AI Writing'],
    keywords: ['prompt engineering', 'AI prompts', 'ChatGPT tips'],
    rpm: { min: 7, max: 13 },
    competition: 50,
    growth: 92,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Writing prompts to get the best results from AI models'
  },
  {
    id: 'tech-reviews',
    icon: '📱',
    name: 'Tech Reviews',
    category: 'Technology',
    subCategories: ['Phone', 'Laptop', 'Gadget', 'Smartwatch'],
    keywords: ['tech review', 'gadget', 'iphone review', 'smartphone'],
    rpm: { min: 6, max: 12 },
    competition: 85,
    growth: 70,
    sustainability: 90,
    facelessSupport: false,
    shortsSupport: true,
    description: 'Smartphone, laptop, and gadget reviews'
  },
  {
    id: 'coding',
    icon: '💻',
    name: 'Programming Tutorials',
    category: 'Technology',
    subCategories: ['Python', 'JavaScript', 'Web Dev', 'Mobile Dev'],
    keywords: ['coding tutorial', 'programming', 'python', 'javascript'],
    rpm: { min: 8, max: 14 },
    competition: 80,
    growth: 75,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Programming language and framework tutorials'
  },
  {
    id: 'cybersecurity',
    icon: '🔒',
    name: 'Cybersecurity',
    category: 'Technology',
    subCategories: ['Ethical Hacking', 'Privacy', 'VPN', 'Crypto Security'],
    keywords: ['cybersecurity', 'hacking', 'privacy', 'security'],
    rpm: { min: 9, max: 16 },
    competition: 60,
    growth: 80,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Security tips, ethical hacking, privacy'
  },
  {
    id: 'crypto-blockchain',
    icon: '₿',
    name: 'Crypto & Blockchain',
    category: 'Technology',
    subCategories: ['Bitcoin', 'Ethereum', 'NFT', 'DeFi'],
    keywords: ['crypto', 'bitcoin', 'blockchain', 'NFT'],
    rpm: { min: 12, max: 25 },
    competition: 85,
    growth: 65,
    sustainability: 70,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Cryptocurrency analysis, blockchain technologies'
  },
  {
    id: 'productivity',
    icon: '📋',
    name: 'Productivity Systems',
    category: 'Lifestyle',
    subCategories: ['Notion', 'Time Management', 'GTD', 'Habits'],
    keywords: ['productivity', 'notion', 'time management', 'habits'],
    rpm: { min: 7, max: 12 },
    competition: 65,
    growth: 75,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Productivity, time management, habits'
  },
  
  // ============================================
  // FINANCE & MONEY (10)
  // ============================================
  {
    id: 'personal-finance',
    icon: '💰',
    name: 'Personal Finance',
    category: 'Finance',
    subCategories: ['Budget', 'Saving', 'Debt', 'Retirement'],
    keywords: ['personal finance', 'budget', 'saving money'],
    rpm: { min: 15, max: 30 },
    competition: 70,
    growth: 80,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Money management, budgeting, saving'
  },
  {
    id: 'investing',
    icon: '📈',
    name: 'Investing & Stocks',
    category: 'Finance',
    subCategories: ['Stocks', 'ETF', 'Dividends', 'Funds'],
    keywords: ['investing', 'stock market', 'ETF', 'dividend'],
    rpm: { min: 18, max: 35 },
    competition: 80,
    growth: 75,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Stock market, stock analysis, investment strategies'
  },
  {
    id: 'passive-income',
    icon: '💸',
    name: 'Passive Income',
    category: 'Finance',
    subCategories: ['Affiliate', 'Dropshipping', 'Print on Demand', 'Stocks'],
    keywords: ['passive income', 'side hustle', 'make money online'],
    rpm: { min: 12, max: 22 },
    competition: 85,
    growth: 70,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Passive income methods, making money online'
  },
  {
    id: 'real-estate',
    icon: '🏠',
    name: 'Real Estate Investing',
    category: 'Finance',
    subCategories: ['Rental', 'Flip', 'REIT', 'Airbnb'],
    keywords: ['real estate', 'property investment', 'airbnb'],
    rpm: { min: 20, max: 40 },
    competition: 65,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: false,
    description: 'Real estate investment, rentals, flips'
  },
  {
    id: 'entrepreneurship',
    icon: '🚀',
    name: 'Entrepreneurship',
    category: 'Business',
    subCategories: ['Startup', 'SaaS', 'Business Ideas', 'Funding'],
    keywords: ['entrepreneurship', 'startup', 'business ideas'],
    rpm: { min: 14, max: 28 },
    competition: 75,
    growth: 80,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Entrepreneurship, startups, business ideas'
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    name: 'E-Commerce',
    category: 'Business',
    subCategories: ['Shopify', 'Amazon FBA', 'Etsy', 'eBay'],
    keywords: ['ecommerce', 'shopify', 'amazon FBA', 'dropshipping'],
    rpm: { min: 12, max: 25 },
    competition: 80,
    growth: 70,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Online sales, e-commerce strategies'
  },
  {
    id: 'freelance',
    icon: '💼',
    name: 'Freelance Life',
    category: 'Business',
    subCategories: ['Upwork', 'Fiverr', 'Remote Work', 'Client Management'],
    keywords: ['freelance', 'upwork', 'remote work', 'fiverr'],
    rpm: { min: 8, max: 16 },
    competition: 60,
    growth: 75,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Freelancing, remote work'
  },
  {
    id: 'newsletter',
    icon: '📰',
    name: 'Newsletter Writing',
    category: 'Business',
    subCategories: ['Substack', 'ConvertKit', 'Beehiiv', 'Email Marketing'],
    keywords: ['newsletter', 'substack', 'email marketing'],
    rpm: { min: 10, max: 18 },
    competition: 40,
    growth: 88,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Starting and growing a newsletter'
  },
  {
    id: 'crypto-trading',
    icon: '📊',
    name: 'Crypto Trading',
    category: 'Finance',
    subCategories: ['Spot', 'Futures', 'DeFi', 'Analysis'],
    keywords: ['crypto trading', 'bitcoin trading', 'futures'],
    rpm: { min: 15, max: 30 },
    competition: 75,
    growth: 60,
    sustainability: 65,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Crypto trading, technical analysis'
  },
  {
    id: 'frugal-living',
    icon: '🌱',
    name: 'Frugal Living',
    category: 'Finance',
    subCategories: ['Minimalism', 'DIY', 'Coupons', 'Saving'],
    keywords: ['frugal living', 'minimalism', 'saving money'],
    rpm: { min: 8, max: 14 },
    competition: 50,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Saving, minimalism, smart spending'
  },
  
  // ============================================
  // EDUCATION & LEARNING (8)
  // ============================================
  {
    id: 'language-learning',
    icon: '🗣️',
    name: 'Language Learning',
    category: 'Education',
    subCategories: ['English', 'Spanish', 'German', 'Chinese'],
    keywords: ['language learning', 'english', 'spanish'],
    rpm: { min: 6, max: 12 },
    competition: 85,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Language learning tips, grammar, vocabulary'
  },
  {
    id: 'study-tips',
    icon: '📚',
    name: 'Effective Studying',
    category: 'Education',
    subCategories: ['Pomodoro', 'Note Taking', 'Memory', 'Exam Prep'],
    keywords: ['study tips', 'study with me', 'productivity'],
    rpm: { min: 5, max: 10 },
    competition: 75,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Study techniques, exam preparation'
  },
  {
    id: 'history',
    icon: '📜',
    name: 'History Stories',
    category: 'Education',
    subCategories: ['Ancient History', 'Wars', 'Mythology', 'Biography'],
    keywords: ['history', 'ancient history', 'documentary'],
    rpm: { min: 5, max: 9 },
    competition: 55,
    growth: 70,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'History, wars, mythology'
  },
  {
    id: 'science',
    icon: '🔬',
    name: 'Science Explained',
    category: 'Education',
    subCategories: ['Physics', 'Chemistry', 'Biology', 'Astronomy'],
    keywords: ['science', 'physics', 'biology', 'space'],
    rpm: { min: 6, max: 11 },
    competition: 65,
    growth: 75,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Science topics, experiments, explanations'
  },
  {
    id: 'space-astronomy',
    icon: '🚀',
    name: 'Space & Astronomy',
    category: 'Education',
    subCategories: ['Planets', 'Black Holes', 'NASA', 'SpaceX'],
    keywords: ['space', 'astronomy', 'planets', 'NASA'],
    rpm: { min: 7, max: 13 },
    competition: 60,
    growth: 80,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Space, planets, the universe'
  },
  {
    id: 'engineering',
    icon: '⚙️',
    name: 'Engineering Stories',
    category: 'Documentary',
    subCategories: ['Bridges', 'Machines', 'Construction', 'Mega Structures'],
    keywords: ['engineering', 'mega projects', 'construction'],
    rpm: { min: 8, max: 14 },
    competition: 45,
    growth: 82,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Engineering, mega projects, structures'
  },
  {
    id: 'geography',
    icon: '🌍',
    name: 'Geography',
    category: 'Education',
    subCategories: ['Countries', 'Maps', 'Cultures', 'Climate'],
    keywords: ['geography', 'countries', 'maps', 'travel'],
    rpm: { min: 5, max: 9 },
    competition: 50,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Countries, maps, geography'
  },
  {
    id: 'book-summaries',
    icon: '📖',
    name: 'Book Summaries',
    category: 'Education',
    subCategories: ['Self-Help', 'Business', 'Novel', 'Biography'],
    keywords: ['book summary', 'book review', 'self help'],
    rpm: { min: 6, max: 11 },
    competition: 60,
    growth: 70,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Book summaries and reviews'
  },
  
  // ============================================
  // LIFESTYLE & HEALTH (10)
  // ============================================
  {
    id: 'fitness',
    icon: '💪',
    name: 'Home Fitness',
    category: 'Health',
    subCategories: ['HIIT', 'Yoga', 'Calisthenics', 'Pilates'],
    keywords: ['home workout', 'fitness', 'HIIT', 'yoga'],
    rpm: { min: 6, max: 12 },
    competition: 80,
    growth: 70,
    sustainability: 90,
    facelessSupport: false,
    shortsSupport: true,
    description: 'Home fitness, workout programs'
  },
  {
    id: 'meal-prep',
    icon: '🍱',
    name: 'Meal Prep',
    category: 'Food',
    subCategories: ['Weekly Plan', 'Healthy', 'Budget-Friendly', 'Vegan'],
    keywords: ['meal prep', 'healthy eating', 'weekly menu'],
    rpm: { min: 5, max: 10 },
    competition: 60,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Weekly meal plans, healthy recipes'
  },
  {
    id: 'psychology',
    icon: '🧠',
    name: 'Psychology & Behavior',
    category: 'Education',
    subCategories: ['Self-Improvement', 'Relationships', 'Mental Health', 'Mindfulness'],
    keywords: ['psychology', 'self improvement', 'mental health'],
    rpm: { min: 8, max: 15 },
    competition: 70,
    growth: 85,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Psychology, personal development'
  },
  {
    id: 'yoga-meditation',
    icon: '🧘',
    name: 'Yoga & Meditation',
    category: 'Health',
    subCategories: ['Yoga', 'Meditation', 'Breathing', 'Mindfulness'],
    keywords: ['yoga', 'meditation', 'mindfulness'],
    rpm: { min: 5, max: 10 },
    competition: 75,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Yoga, meditation, mindfulness'
  },
  {
    id: 'beauty-skincare',
    icon: '💄',
    name: 'Natural Beauty',
    category: 'Lifestyle',
    subCategories: ['Skincare', 'Makeup', 'Hair', 'Natural'],
    keywords: ['skincare', 'beauty', 'makeup', 'natural'],
    rpm: { min: 6, max: 12 },
    competition: 90,
    growth: 65,
    sustainability: 85,
    facelessSupport: false,
    shortsSupport: true,
    description: 'Skincare, makeup, beauty'
  },
  {
    id: 'mental-health',
    icon: '💭',
    name: 'Mental Health',
    category: 'Health',
    subCategories: ['Anxiety', 'Depression', 'Therapy', 'Self-Care'],
    keywords: ['mental health', 'anxiety', 'depression'],
    rpm: { min: 7, max: 13 },
    competition: 70,
    growth: 85,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Mental health, anxiety, therapy'
  },
  {
    id: 'minimalism',
    icon: '🏡',
    name: 'Minimalism',
    category: 'Lifestyle',
    subCategories: ['Decluttering', 'Lifestyle', 'Tiny House', 'Capsule Wardrobe'],
    keywords: ['minimalism', 'declutter', 'simple living'],
    rpm: { min: 6, max: 12 },
    competition: 55,
    growth: 75,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Minimalist living, simple living'
  },
  {
    id: 'parenting',
    icon: '👨‍👩‍👧',
    name: 'Parenting Tips',
    category: 'Lifestyle',
    subCategories: ['Baby', 'Kids', 'Education', 'Family'],
    keywords: ['parenting', 'baby', 'kids', 'family'],
    rpm: { min: 7, max: 13 },
    competition: 75,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Parenting, child education'
  },
  {
    id: 'sleep-health',
    icon: '😴',
    name: 'Sleep & Health',
    category: 'Health',
    subCategories: ['Sleep Hygiene', 'Insomnia', 'Sleep Tracking', 'Naps'],
    keywords: ['sleep', 'insomnia', 'sleep health'],
    rpm: { min: 6, max: 12 },
    competition: 45,
    growth: 80,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Sleep schedule, healthy sleep'
  },
  {
    id: 'nutrition',
    icon: '🥗',
    name: 'Nutrition & Diet',
    category: 'Health',
    subCategories: ['Keto', 'Vegan', 'Intermittent Fasting', 'Macros'],
    keywords: ['nutrition', 'diet', 'keto', 'vegan'],
    rpm: { min: 7, max: 14 },
    competition: 85,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Nutrition, diet, healthy eating'
  },
  
  // ============================================
  // ART & CREATIVITY (8)
  // ============================================
  {
    id: 'digital-art',
    icon: '🎨',
    name: 'Digital Art',
    category: 'Art',
    subCategories: ['Procreate', 'Photoshop', 'Illustrator', 'AI Art'],
    keywords: ['digital art', 'procreate', 'photoshop', 'AI art'],
    rpm: { min: 5, max: 10 },
    competition: 70,
    growth: 80,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Digital art, drawing, illustration'
  },
  {
    id: 'video-editing',
    icon: '🎬',
    name: 'Video Editing',
    category: 'Art',
    subCategories: ['CapCut', 'Premiere', 'DaVinci', 'Final Cut'],
    keywords: ['video editing', 'capcut', 'premiere'],
    rpm: { min: 7, max: 13 },
    competition: 75,
    growth: 80,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Video editing tutorials'
  },
  {
    id: 'photography',
    icon: '📷',
    name: 'Mobile Photography',
    category: 'Art',
    subCategories: ['iPhone', 'Android', 'Edit Apps', 'Composition'],
    keywords: ['photography', 'mobile photography', 'iphone'],
    rpm: { min: 5, max: 10 },
    competition: 65,
    growth: 70,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Taking photos with your phone'
  },
  {
    id: 'music-production',
    icon: '🎵',
    name: 'Music Production',
    category: 'Art',
    subCategories: ['FL Studio', 'Ableton', 'Beat Making', 'Mixing'],
    keywords: ['music production', 'beat making', 'FL studio'],
    rpm: { min: 5, max: 9 },
    competition: 75,
    growth: 65,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Music production, beat making'
  },
  {
    id: 'writing',
    icon: '✍️',
    name: 'Creative Writing',
    category: 'Art',
    subCategories: ['Story', 'Novel', 'Screenplay', 'Poetry'],
    keywords: ['creative writing', 'novel writing', 'storytelling'],
    rpm: { min: 6, max: 11 },
    competition: 50,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Writing, stories, novels'
  },
  {
    id: 'diy-crafts',
    icon: '🔨',
    name: 'Home Repair DIY',
    category: 'Practical',
    subCategories: ['Repair', 'Woodworking', 'Decoration', 'Tools'],
    keywords: ['DIY', 'home repair', 'crafts'],
    rpm: { min: 5, max: 10 },
    competition: 60,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Home repair, DIY projects'
  },
  {
    id: 'painting',
    icon: '🖼️',
    name: 'Traditional Painting',
    category: 'Art',
    subCategories: ['Oil', 'Acrylic', 'Watercolor', 'Sketch'],
    keywords: ['painting', 'watercolor', 'oil painting'],
    rpm: { min: 4, max: 8 },
    competition: 55,
    growth: 60,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Painting, painting techniques'
  },
  {
    id: 'thumbnail-design',
    icon: '🖼️',
    name: 'Thumbnail Design',
    category: 'Art',
    subCategories: ['Photoshop', 'Canva', 'YouTube', 'Templates'],
    keywords: ['thumbnail design', 'youtube thumbnail'],
    rpm: { min: 6, max: 12 },
    competition: 40,
    growth: 85,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'YouTube thumbnail design'
  },
  
  // ============================================
  // ENTERTAINMENT & POP CULTURE (10)
  // ============================================
  {
    id: 'fact-bites',
    icon: '💡',
    name: 'Interesting Facts',
    category: 'Education',
    subCategories: ['History', 'Science', 'Nature', 'Human'],
    keywords: ['interesting facts', 'did you know', 'facts'],
    rpm: { min: 4, max: 8 },
    competition: 60,
    growth: 80,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: '60-second facts, interesting tidbits'
  },
  {
    id: 'mystery-stories',
    icon: '🔍',
    name: 'Mystery Stories',
    category: 'Entertainment',
    subCategories: ['Unsolved', 'True Crime', 'Paranormal', 'Conspiracy'],
    keywords: ['mystery', 'unsolved', 'true crime'],
    rpm: { min: 7, max: 13 },
    competition: 65,
    growth: 75,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Mysteries, unsolved cases'
  },
  {
    id: 'comedy-shorts',
    icon: '😂',
    name: 'Comedy Shorts',
    category: 'Entertainment',
    subCategories: ['Skit', 'Reaction', 'Parody', 'Memes'],
    keywords: ['comedy', 'funny', 'shorts'],
    rpm: { min: 3, max: 7 },
    competition: 85,
    growth: 70,
    sustainability: 75,
    facelessSupport: false,
    shortsSupport: true,
    description: 'Short comedy videos'
  },
  {
    id: 'gaming',
    icon: '🎮',
    name: 'Game Reviews',
    category: 'Entertainment',
    subCategories: ['New Games', 'Walkthrough', 'Speedrun', 'Lore'],
    keywords: ['gaming', 'game review', 'walkthrough'],
    rpm: { min: 4, max: 9 },
    competition: 90,
    growth: 65,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Game reviews, walkthroughs'
  },
  {
    id: 'mobile-gaming',
    icon: '📱',
    name: 'Mobile Games',
    category: 'Entertainment',
    subCategories: ['Casual', 'Strategy', 'RPG', 'Reviews'],
    keywords: ['mobile gaming', 'mobile games'],
    rpm: { min: 4, max: 8 },
    competition: 75,
    growth: 70,
    sustainability: 75,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Mobile games, reviews'
  },
  {
    id: 'anime-manga',
    icon: '🎌',
    name: 'Anime & Manga',
    category: 'Entertainment',
    subCategories: ['Review', 'Top 10', 'Theory', 'News'],
    keywords: ['anime', 'manga', 'anime review'],
    rpm: { min: 4, max: 8 },
    competition: 80,
    growth: 70,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Anime, manga reviews'
  },
  {
    id: 'movie-reviews',
    icon: '🎬',
    name: 'Movie Reviews',
    category: 'Entertainment',
    subCategories: ['New Movies', 'Classics', 'Analysis', 'Top 10'],
    keywords: ['movie review', 'film analysis'],
    rpm: { min: 5, max: 10 },
    competition: 80,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Movie reviews and analyses'
  },
  {
    id: 'celebrity-news',
    icon: '⭐',
    name: 'Celebrities & Gossip',
    category: 'Entertainment',
    subCategories: ['News', 'Scandal', 'Drama', 'Lifestyle'],
    keywords: ['celebrity', 'gossip', 'entertainment news'],
    rpm: { min: 3, max: 7 },
    competition: 90,
    growth: 60,
    sustainability: 70,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Celebrities, gossip news'
  },
  {
    id: 'sports-analysis',
    icon: '⚽',
    name: 'Sports Analysis',
    category: 'Sports',
    subCategories: ['Soccer', 'Basketball', 'NBA', 'Premier League'],
    keywords: ['sports', 'football', 'basketball', 'NBA'],
    rpm: { min: 5, max: 11 },
    competition: 85,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Sports analysis, soccer, basketball'
  },
  {
    id: 'true-crime',
    icon: '🚔',
    name: 'True Crime Stories',
    category: 'Entertainment',
    subCategories: ['Solved', 'Unsolved', 'Serial Killers', 'Cold Case'],
    keywords: ['true crime', 'crime stories', 'cold case'],
    rpm: { min: 8, max: 16 },
    competition: 75,
    growth: 75,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'True crime stories'
  },
  
  // ============================================
  // LIFESTYLE & HOBBIES (8)
  // ============================================
  {
    id: 'travel',
    icon: '✈️',
    name: 'Hidden Travel Spots',
    category: 'Travel',
    subCategories: ['Hidden Gems', 'Budget Travel', 'Solo', 'Adventure'],
    keywords: ['hidden travel', 'travel tips', 'budget travel'],
    rpm: { min: 8, max: 16 },
    competition: 75,
    growth: 70,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Lesser-known travel destinations'
  },
  {
    id: 'pets',
    icon: '🐶',
    name: 'Pet Care',
    category: 'Lifestyle',
    subCategories: ['Dog', 'Cat', 'Training', 'Health'],
    keywords: ['pets', 'dog', 'cat', 'pet care'],
    rpm: { min: 5, max: 10 },
    competition: 75,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Pet care'
  },
  {
    id: 'plants',
    icon: '🌱',
    name: 'Plant Care',
    category: 'Lifestyle',
    subCategories: ['Indoor', 'Garden', 'Succulent', 'Vegetable'],
    keywords: ['houseplants', 'gardening', 'plant care'],
    rpm: { min: 4, max: 9 },
    competition: 65,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Plant care, home gardening'
  },
  {
    id: 'car-content',
    icon: '🚗',
    name: 'Automotive Content',
    category: 'Hobby',
    subCategories: ['Review', 'Tuning', 'Comparison', 'News'],
    keywords: ['cars', 'car review', 'automotive'],
    rpm: { min: 8, max: 16 },
    competition: 80,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Car reviews'
  },
  {
    id: 'motorcycle',
    icon: '🏍️',
    name: 'Motorcycle',
    category: 'Hobby',
    subCategories: ['Review', 'Tour', 'Tips', 'Gear'],
    keywords: ['motorcycle', 'bike review'],
    rpm: { min: 7, max: 14 },
    competition: 60,
    growth: 70,
    sustainability: 80,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Motorcycles, gear'
  },
  {
    id: 'running',
    icon: '🏃',
    name: 'Running & Marathon',
    category: 'Sports',
    subCategories: ['Training', 'Nutrition', 'Race', 'Running Shoes'],
    keywords: ['running', 'marathon', 'training'],
    rpm: { min: 6, max: 12 },
    competition: 55,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Running, marathon training'
  },
  {
    id: 'fishing',
    icon: '🎣',
    name: 'Fishing',
    category: 'Hobby',
    subCategories: ['Freshwater', 'Saltwater', 'Gear', 'Location'],
    keywords: ['fishing', 'angling'],
    rpm: { min: 5, max: 10 },
    competition: 50,
    growth: 65,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Fishing, gear'
  },
  {
    id: 'collecting',
    icon: '🃏',
    name: 'Collecting',
    category: 'Hobby',
    subCategories: ['Cards', 'Coins', 'Stamps', 'Vintage'],
    keywords: ['collecting', 'cards', 'vintage'],
    rpm: { min: 6, max: 12 },
    competition: 45,
    growth: 70,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Collecting, card collecting'
  },
  
  // ============================================
  // PROFESSIONAL & CAREER (5)
  // ============================================
  {
    id: 'career-advice',
    icon: '💼',
    name: 'Career Advice',
    category: 'Business',
    subCategories: ['Resume', 'Interview', 'LinkedIn', 'Networking'],
    keywords: ['career advice', 'job tips', 'resume', 'interview'],
    rpm: { min: 9, max: 17 },
    competition: 70,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Resume, interview, career'
  },
  {
    id: 'marketing',
    icon: '📣',
    name: 'Digital Marketing',
    category: 'Business',
    subCategories: ['SEO', 'Social Media', 'Ads', 'Content'],
    keywords: ['digital marketing', 'SEO', 'social media marketing'],
    rpm: { min: 12, max: 22 },
    competition: 80,
    growth: 75,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Digital marketing, SEO, social media'
  },
  {
    id: 'sales',
    icon: '🤝',
    name: 'Sales Techniques',
    category: 'Business',
    subCategories: ['B2B', 'Closing', 'Negotiation', 'Cold Calling'],
    keywords: ['sales', 'selling', 'B2B sales'],
    rpm: { min: 10, max: 20 },
    competition: 65,
    growth: 70,
    sustainability: 90,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Sales techniques, negotiation'
  },
  {
    id: 'leadership',
    icon: '👔',
    name: 'Leadership',
    category: 'Business',
    subCategories: ['Management', 'Team Building', 'Communication'],
    keywords: ['leadership', 'management', 'team building'],
    rpm: { min: 11, max: 20 },
    competition: 60,
    growth: 70,
    sustainability: 95,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Leadership, management'
  },
  {
    id: 'productivity-apps',
    icon: '📱',
    name: 'Productivity Apps',
    category: 'Technology',
    subCategories: ['Notion', 'Obsidian', 'Todoist', 'Trello'],
    keywords: ['productivity apps', 'notion', 'obsidian'],
    rpm: { min: 7, max: 13 },
    competition: 55,
    growth: 80,
    sustainability: 85,
    facelessSupport: true,
    shortsSupport: true,
    description: 'Productivity apps'
  }
];

// Category list
const NICHE_CATEGORIES = [
  { id: 'all', name: 'All', icon: '🌐' },
  { id: 'Technology', name: 'Technology', icon: '💻' },
  { id: 'Finance', name: 'Finance', icon: '💰' },
  { id: 'Business', name: 'Business & Career', icon: '💼' },
  { id: 'Education', name: 'Education', icon: '📚' },
  { id: 'Health', name: 'Health', icon: '🏥' },
  { id: 'Lifestyle', name: 'Lifestyle', icon: '🏡' },
  { id: 'Art', name: 'Art', icon: '🎨' },
  { id: 'Entertainment', name: 'Entertainment', icon: '🎭' },
  { id: 'Sports', name: 'Sports', icon: '⚽' },
  { id: 'Travel', name: 'Travel', icon: '✈️' },
  { id: 'Hobby', name: 'Hobby', icon: '🎯' },
  { id: 'Documentary', name: 'Documentary', icon: '🎬' },
  { id: 'Food', name: 'Food', icon: '🍳' },
  { id: 'Practical', name: 'Practical', icon: '🔧' }
];

// Calculate niche score (10 criteria)
function calculateNicheScore(niche) {
  const weights = {
    competition: 0.15,      // Low competition = high score (inverse)
    growth: 0.20,           // Growth
    sustainability: 0.15,   // Sustainability
    rpm: 0.15,              // Monetization potential
    facelessSupport: 0.10,  // Faceless support
    shortsSupport: 0.10,    // Shorts compatibility
    newCreatorFriendly: 0.05, // New creator friendly
    longVideoSupport: 0.05,  // Long video support
    underrated: 0.03,        // Underrated
    multiLanguage: 0.02      // Multi-language opportunity
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

// Hidden Opportunity detection
function isHiddenOpportunity(niche) {
  return niche.competition < 60 && 
         niche.growth > 75 && 
         (niche.rpm.min + niche.rpm.max) / 2 > 8;
}

// Estimated earnings calculation
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
