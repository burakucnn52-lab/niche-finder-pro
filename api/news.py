from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.parse
import re
from datetime import datetime, timedelta
from xml.etree import ElementTree as ET

# RSS Kaynakları
RSS_SOURCES = [
    {
        'name': 'YouTube Creator Blog',
        'url': 'https://blog.youtube/inner-tube/rss/',
        'category': 'youtube_official',
        'icon': '🎬'
    },
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
    {
        'name': 'Google News - YouTube',
        'url': 'https://news.google.com/rss/search?q=youtube+creator&hl=tr&gl=TR&ceid=TR:tr',
        'category': 'google_news',
        'icon': '📰'
    }
]

CACHE_HOURS = 6

def parse_rss(xml_text, source_name, source_icon, source_category):
    """RSS XML'i parse et ve haberleri çıkar"""
    news_items = []
    
    try:
        # Namespace'leri kaldır
        xml_text = re.sub(r'\sxmlns="[^"]+"', '', xml_text, count=1)
        root = ET.fromstring(xml_text)
        
        # RSS 2.0 (channel/item)
        items = root.findall('.//item')
        
        # Atom (entry)
        if not items:
            items = root.findall('.//entry')
        
        for item in items[:10]:  # Her kaynaktan max 10 haber
            try:
                # Başlık
                title_elem = item.find('title')
                title = title_elem.text if title_elem is not None else 'Başlıksız'
                
                # Link
                link_elem = item.find('link')
                if link_elem is not None:
                    link = link_elem.text or link_elem.get('href', '')
                else:
                    link = ''
                
                # Açıklama
                desc_elem = item.find('description') or item.find('summary')
                description = ''
                if desc_elem is not None and desc_elem.text:
                    # HTML taglarını temizle
                    description = re.sub(r'<[^>]+>', '', desc_elem.text)
                    description = description.strip()[:200]
                
                # Tarih
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
    """RSS feed'i çek"""
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


def get_cached_news():
    """Supabase'den cache'lenmiş haberleri çek"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return None
        
        # Son 6 saatte eklenmiş haberleri al
        url = f"{supabase_url}/rest/v1/news_cache?order=published_at.desc&limit=20"
        req = urllib.request.Request(url)
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            
            if data and len(data) > 0:
                # En son güncellenmeyi kontrol et
                latest = data[0]
                created_at_str = latest.get('created_at', '')
                
                if created_at_str:
                    created_at = datetime.fromisoformat(created_at_str.replace('Z', '+00:00'))
                    age = datetime.now(created_at.tzinfo) - created_at
                    
                    # 6 saatten yeni ise cache'i kullan
                    if age < timedelta(hours=CACHE_HOURS):
                        return data
        
        return None
    except Exception as e:
        print(f"Cache read error: {e}")
        return None


def save_news_to_cache(news_items):
    """Haberleri Supabase'e kaydet"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return False
        
        # Eski haberleri temizle (24 saatten eski)
        delete_url = f"{supabase_url}/rest/v1/news_cache?created_at=lt.{(datetime.utcnow() - timedelta(hours=24)).isoformat()}Z"
        delete_req = urllib.request.Request(delete_url, method='DELETE')
        delete_req.add_header('apikey', supabase_key)
        delete_req.add_header('Authorization', f'Bearer {supabase_key}')
        
        try:
            urllib.request.urlopen(delete_req, timeout=5)
        except:
            pass
        
        # Yeni haberleri ekle (her biri için ON CONFLICT IGNORE)
        url = f"{supabase_url}/rest/v1/news_cache"
        
        for item in news_items:
            try:
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
            except Exception as e:
                # Duplicate veya diğer hatalar
                continue
        
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
            # URL parametreleri
            url_parts = self.path.split('?')
            params = {}
            if len(url_parts) > 1:
                for pair in url_parts[1].split('&'):
                    if '=' in pair:
                        key, value = pair.split('=', 1)
                        params[key] = urllib.parse.unquote(value)
            
            force_refresh = params.get('refresh', 'false').lower() == 'true'
            
            # Önce cache'i kontrol et
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
            
            # Cache yoksa veya force refresh ise RSS'leri çek
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
                except Exception as e:
                    print(f"Source error {source['name']}: {e}")
                    continue
            
            # Cache'e kaydet
            if all_news:
                save_news_to_cache(all_news)
            
            # Tarihe göre sırala (yeni → eski)
            all_news.sort(key=lambda x: x.get('published_at', ''), reverse=True)
            
            # İlk 20'sini döndür
            self.wfile.write(json.dumps({
                'success': True,
                'source': 'live',
                'count': len(all_news[:20]),
                'news': all_news[:20]
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
