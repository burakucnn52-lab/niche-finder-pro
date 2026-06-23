from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.parse
import re
from datetime import datetime, timedelta, timezone
from xml.etree import ElementTree as ET

# ============================================
# RSS SOURCES (Expanded - YouTube focused)
# ============================================
RSS_SOURCES = [
    # YouTube Official & Creator focused
    {
        'name': 'YouTube Creator Blog',
        'url': 'https://blog.youtube/inner-tube/rss/',
        'category': 'youtube_official',
        'icon': '🎬'
    },
    {
        'name': 'Tubefilter',
        'url': 'https://www.tubefilter.com/feed/',
        'category': 'youtube_news',
        'icon': '📺'
    },
    {
        'name': 'VidIQ Blog',
        'url': 'https://vidiq.com/blog/feed/',
        'category': 'creator_tips',
        'icon': '📈'
    },
    {
        'name': 'Backlinko',
        'url': 'https://backlinko.com/feed',
        'category': 'seo_marketing',
        'icon': '🔍'
    },
    # General Tech
    {
        'name': 'TechCrunch',
        'url': 'https://techcrunch.com/feed/',
        'category': 'tech',
        'icon': '💻'
    },
    {
        'name': 'The Verge',
        'url': 'https://www.theverge.com/rss/index.xml',
        'category': 'tech',
        'icon': '⚡'
    },
    # Google News (multi-language fallback)
    {
        'name': 'Google News - YouTube',
        'url': 'https://news.google.com/rss/search?q=youtube+creator&hl=en&gl=US&ceid=US:en',
        'category': 'google_news',
        'icon': '📰'
    },
    {
        'name': 'Google News - Content Creator',
        'url': 'https://news.google.com/rss/search?q=content+creator+youtube&hl=en&gl=US&ceid=US:en',
        'category': 'google_news',
        'icon': '🎥'
    }
]

# ============================================
# CACHE SETTINGS (OPTIMIZED)
# ============================================
CACHE_HOURS = 2              # Cache duration (was 6, now 2 for fresher news)
FRESH_NEWS_HOURS = 6         # Only show news added within last 6 hours
CLEANUP_HOURS = 12           # Delete news older than 12 hours (was 24)
MAX_NEWS_PER_SOURCE = 10     # Max news per RSS source
MAX_NEWS_TOTAL = 25          # Max total news to return


def parse_rss(xml_text, source_name, source_icon, source_category):
    """Parse RSS XML and extract news items"""
    news_items = []
    
    try:
        # Remove namespaces
        xml_text = re.sub(r'\sxmlns="[^"]+"', '', xml_text, count=1)
        root = ET.fromstring(xml_text)
        
        # RSS 2.0 (channel/item)
        items = root.findall('.//item')
        
        # Atom (entry)
        if not items:
            items = root.findall('.//entry')
        
        for item in items[:MAX_NEWS_PER_SOURCE]:
            try:
                # Title
                title_elem = item.find('title')
                title = title_elem.text if title_elem is not None else 'Untitled'
                
                # Link
                link_elem = item.find('link')
                if link_elem is not None:
                    link = link_elem.text or link_elem.get('href', '')
                else:
                    link = ''
                
                # Description
                desc_elem = item.find('description') or item.find('summary')
                description = ''
                if desc_elem is not None and desc_elem.text:
                    # Strip HTML tags
                    description = re.sub(r'<[^>]+>', '', desc_elem.text)
                    description = description.strip()[:200]
                
                # Date
                date_elem = item.find('pubDate') or item.find('published')
                published_at = None
                if date_elem is not None and date_elem.text:
                    published_at = date_elem.text
                
                if title and link:
                    news_items.append({
                        'title': title.strip()[:200],
                        'link': link.strip(),
                        'description': description,
                        'source': source_name,
                        'source_icon': source_icon,
                        'category': source_category,
                        'published_at': published_at
                    })
            except Exception as e:
                print(f"Item parse error: {e}")
                continue
    
    except Exception as e:
        print(f"RSS parse error for {source_name}: {e}")
    
    return news_items


def fetch_rss_feed(url, timeout=10):
    """Fetch RSS feed"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (compatible; NichifyBot/1.0; +https://niche-finder-pro.vercel.app)'
        }
        req = urllib.request.Request(url, headers=headers)
        
        with urllib.request.urlopen(req, timeout=timeout) as response:
            return response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Fetch error for {url}: {e}")
        return None


def cleanup_old_news():
    """Delete news older than CLEANUP_HOURS"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return
        
        cutoff_time = (datetime.utcnow() - timedelta(hours=CLEANUP_HOURS)).isoformat() + 'Z'
        delete_url = f"{supabase_url}/rest/v1/news_cache?created_at=lt.{cutoff_time}"
        
        delete_req = urllib.request.Request(delete_url, method='DELETE')
        delete_req.add_header('apikey', supabase_key)
        delete_req.add_header('Authorization', f'Bearer {supabase_key}')
        delete_req.add_header('Prefer', 'return=minimal')
        
        urllib.request.urlopen(delete_req, timeout=5)
        print(f"🧹 Cleaned up news older than {CLEANUP_HOURS}h")
    except Exception as e:
        print(f"Cleanup error: {e}")


def get_cached_news():
    """Get fresh cached news from Supabase (only added within FRESH_NEWS_HOURS)"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return None
        
        # ✅ FIX: Only get news added within the last FRESH_NEWS_HOURS
        cutoff_time = (datetime.utcnow() - timedelta(hours=FRESH_NEWS_HOURS)).isoformat() + 'Z'
        url = f"{supabase_url}/rest/v1/news_cache?created_at=gte.{cutoff_time}&order=created_at.desc&limit={MAX_NEWS_TOTAL}"
        
        req = urllib.request.Request(url)
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            
            if data and len(data) > 0:
                # Check the newest item - is it fresh enough?
                latest = data[0]
                created_at_str = latest.get('created_at', '')
                
                if created_at_str:
                    created_at = datetime.fromisoformat(created_at_str.replace('Z', '+00:00'))
                    age = datetime.now(created_at.tzinfo) - created_at
                    
                    # If newest item is within CACHE_HOURS, use cache
                    if age < timedelta(hours=CACHE_HOURS):
                        print(f"✅ Using cache (age: {age})")
                        return data
                    else:
                        print(f"⏰ Cache too old (age: {age}), fetching fresh")
        
        return None
    except Exception as e:
        print(f"Cache read error: {e}")
        return None


def save_news_to_cache(news_items):
    """Save news to Supabase with deduplication"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return False
        
        # ✅ Cleanup old news first
        cleanup_old_news()
        
        # ✅ Get existing links to prevent duplicates
        existing_links = set()
        try:
            check_url = f"{supabase_url}/rest/v1/news_cache?select=link&limit=200"
            check_req = urllib.request.Request(check_url)
            check_req.add_header('apikey', supabase_key)
            check_req.add_header('Authorization', f'Bearer {supabase_key}')
            
            with urllib.request.urlopen(check_req, timeout=5) as response:
                existing_data = json.loads(response.read().decode())
                existing_links = {item.get('link') for item in existing_data if item.get('link')}
                print(f"📋 Found {len(existing_links)} existing links in cache")
        except Exception as e:
            print(f"Existing links check error: {e}")
        
        # Add new news items
        url = f"{supabase_url}/rest/v1/news_cache"
        added_count = 0
        skipped_count = 0
        
        for item in news_items:
            try:
                # ✅ Skip if link already exists
                if item['link'] in existing_links:
                    skipped_count += 1
                    continue
                
                payload_data = {
                    'title': item['title'],
                    'link': item['link'],
                    'description': item.get('description', ''),
                    'source': item['source'],
                    'category': item.get('category', ''),
                    'published_at': item.get('published_at')
                }
                
                payload = json.dumps(payload_data).encode()
                req = urllib.request.Request(url, data=payload, method='POST')
                req.add_header('apikey', supabase_key)
                req.add_header('Authorization', f'Bearer {supabase_key}')
                req.add_header('Content-Type', 'application/json')
                req.add_header('Prefer', 'resolution=ignore-duplicates')
                
                urllib.request.urlopen(req, timeout=5)
                added_count += 1
                existing_links.add(item['link'])  # Track in current session
            except Exception as e:
                # Duplicate or other errors
                continue
        
        print(f"✅ Added {added_count} new, skipped {skipped_count} duplicates")
        return True
    except Exception as e:
        print(f"Cache write error: {e}")
        return False


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.end_headers()
        
        try:
            # URL parameters
            url_parts = self.path.split('?')
            params = {}
            if len(url_parts) > 1:
                for pair in url_parts[1].split('&'):
                    if '=' in pair:
                        key, value = pair.split('=', 1)
                        params[key] = urllib.parse.unquote(value)
            
            force_refresh = params.get('refresh', 'false').lower() == 'true'
            
            # ✅ Check cache first (unless force refresh)
            if not force_refresh:
                cached = get_cached_news()
                if cached:
                    self.wfile.write(json.dumps({
                        'success': True,
                        'source': 'cache',
                        'count': len(cached),
                        'news': cached
                    }).encode())
                    return
            
            # ✅ No cache or force refresh -> fetch RSS feeds
            print(f"🔄 Fetching {len(RSS_SOURCES)} RSS sources...")
            all_news = []
            
            for source in RSS_SOURCES:
                try:
                    xml_data = fetch_rss_feed(source['url'])
                    if xml_data:
                        items = parse_rss(
                            xml_data, 
                            source['name'], 
                            source['icon'],
                            source['category']
                        )
                        all_news.extend(items)
                        print(f"  ✓ {source['name']}: {len(items)} items")
                    else:
                        print(f"  ✗ {source['name']}: no data")
                except Exception as e:
                    print(f"  ✗ {source['name']}: {e}")
                    continue
            
            # ✅ Save new news to cache (with deduplication)
            if all_news:
                save_news_to_cache(all_news)
            
            # Sort by date (newest -> oldest)
            all_news.sort(key=lambda x: x.get('published_at', ''), reverse=True)
            
            # Return top items
            self.wfile.write(json.dumps({
                'success': True,
                'source': 'live',
                'count': len(all_news[:MAX_NEWS_TOTAL]),
                'news': all_news[:MAX_NEWS_TOTAL]
            }).encode())
        
        except Exception as e:
            self.wfile.write(json.dumps({
                'success': False,
                'error': str(e)
            }).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
