from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.parse
import hashlib
from datetime import datetime, timedelta

# Engellenen kelimeler (filtreleme için)
BLOCKED_KEYWORDS = ['vevo', 'official', 'records', 'music', 'entertainment', 'tv', 'media', 'topic']

# Cache süresi (saat)
CACHE_HOURS = 6

def get_cache_key(endpoint, params):
    """Cache için unique key oluştur"""
    key_string = f"{endpoint}_{json.dumps(params, sort_keys=True)}"
    return hashlib.md5(key_string.encode()).hexdigest()

def get_from_cache(cache_key):
    """Supabase'den cache kontrol et"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return None
        
        url = f"{supabase_url}/rest/v1/search_cache?cache_key=eq.{cache_key}&select=*"
        req = urllib.request.Request(url)
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            
            if data and len(data) > 0:
                cached = data[0]
                created_at = datetime.fromisoformat(cached['created_at'].replace('Z', '+00:00'))
                
                # Cache hala geçerli mi?
                if datetime.now(created_at.tzinfo) - created_at < timedelta(hours=CACHE_HOURS):
                    return cached['data']
        
        return None
    except Exception as e:
        print(f"Cache okuma hatası: {e}")
        return None

def save_to_cache(cache_key, endpoint, data):
    """Supabase'e cache kaydet"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return
        
        # Önce eskiyi sil
        delete_url = f"{supabase_url}/rest/v1/search_cache?cache_key=eq.{cache_key}"
        delete_req = urllib.request.Request(delete_url, method='DELETE')
        delete_req.add_header('apikey', supabase_key)
        delete_req.add_header('Authorization', f'Bearer {supabase_key}')
        
        try:
            urllib.request.urlopen(delete_req, timeout=5)
        except:
            pass
        
        # Yeni cache ekle
        url = f"{supabase_url}/rest/v1/search_cache"
        payload = json.dumps({
            'cache_key': cache_key,
            'endpoint': endpoint,
            'data': data
        }).encode()
        
        req = urllib.request.Request(url, data=payload, method='POST')
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        req.add_header('Content-Type', 'application/json')
        req.add_header('Prefer', 'return=minimal')
        
        urllib.request.urlopen(req, timeout=5)
    except Exception as e:
        print(f"Cache yazma hatası: {e}")

def youtube_api_call(endpoint, params):
    """YouTube API çağrısı yap"""
    api_key = os.environ.get('YOUTUBE_API_KEY', '')
    
    if not api_key:
        return {'error': 'YouTube API key bulunamadı'}
    
    params['key'] = api_key
    url = f"https://www.googleapis.com/youtube/v3/{endpoint}?{urllib.parse.urlencode(params)}"
    
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        return {'error': str(e)}

def filter_channels(channels):
    """Blocked keywords içeren kanalları filtrele"""
    filtered = []
    for channel in channels:
        title = channel.get('snippet', {}).get('title', '').lower()
        if not any(keyword in title for keyword in BLOCKED_KEYWORDS):
            filtered.append(channel)
    return filtered

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # CORS headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        try:
            # URL parametrelerini al
            url_parts = self.path.split('?')
            params = {}
            if len(url_parts) > 1:
                for pair in url_parts[1].split('&'):
                    if '=' in pair:
                        key, value = pair.split('=', 1)
                        params[key] = urllib.parse.unquote(value)
            
            endpoint = params.get('endpoint', 'search')
            
            # ============================================
            # ENDPOINT: TRENDING (Yükselen Kanallar)
            # ============================================
            if endpoint == 'trending':
                region = params.get('region', 'TR')
                category = params.get('category', '')
                
                cache_key = get_cache_key('trending', {'region': region, 'category': category})
                cached = get_from_cache(cache_key)
                
                if cached:
                    self.wfile.write(json.dumps({
                        'source': 'cache',
                        'data': cached
                    }).encode())
                    return
                
                yt_params = {
                    'part': 'snippet,statistics,contentDetails',
                    'chart': 'mostPopular',
                    'regionCode': region,
                    'maxResults': 25
                }
                
                if category:
                    yt_params['videoCategoryId'] = category
                
                result = youtube_api_call('videos', yt_params)
                
                if 'error' not in result:
                    save_to_cache(cache_key, 'trending', result)
                
                self.wfile.write(json.dumps({
                    'source': 'api',
                    'data': result
                }).encode())
                return
            
            # ============================================
            # ENDPOINT: SEARCH (Niş/Kanal Arama)
            # ============================================
            elif endpoint == 'search':
                query = params.get('q', '')
                search_type = params.get('type', 'channel')
                region = params.get('region', 'TR')
                language = params.get('lang', 'tr')
                
                if not query:
                    self.wfile.write(json.dumps({'error': 'Arama terimi gerekli'}).encode())
                    return
                
                cache_key = get_cache_key('search', {
                    'q': query, 
                    'type': search_type, 
                    'region': region,
                    'lang': language
                })
                cached = get_from_cache(cache_key)
                
                if cached:
                    self.wfile.write(json.dumps({
                        'source': 'cache',
                        'data': cached
                    }).encode())
                    return
                
                yt_params = {
                    'part': 'snippet',
                    'q': query,
                    'type': search_type,
                    'maxResults': 25,
                    'regionCode': region,
                    'relevanceLanguage': language,
                    'order': 'relevance'
                }
                
                result = youtube_api_call('search', yt_params)
                
                # Kanalları filtrele
                if 'items' in result:
                    result['items'] = filter_channels(result['items'])
                
                if 'error' not in result:
                    save_to_cache(cache_key, 'search', result)
                
                self.wfile.write(json.dumps({
                    'source': 'api',
                    'data': result
                }).encode())
                return
            
            # ============================================
            # ENDPOINT: CHANNEL (Kanal Detayı)
            # ============================================
            elif endpoint == 'channel':
                channel_id = params.get('id', '')
                
                if not channel_id:
                    self.wfile.write(json.dumps({'error': 'Kanal ID gerekli'}).encode())
                    return
                
                cache_key = get_cache_key('channel', {'id': channel_id})
                cached = get_from_cache(cache_key)
                
                if cached:
                    self.wfile.write(json.dumps({
                        'source': 'cache',
                        'data': cached
                    }).encode())
                    return
                
                yt_params = {
                    'part': 'snippet,statistics,contentDetails,brandingSettings',
                    'id': channel_id
                }
                
                result = youtube_api_call('channels', yt_params)
                
                if 'error' not in result:
                    save_to_cache(cache_key, 'channel', result)
                
                self.wfile.write(json.dumps({
                    'source': 'api',
                    'data': result
                }).encode())
                return
            
            # ============================================
            # ENDPOINT: VIDEOS (Kanal Videoları)
            # ============================================
            elif endpoint == 'videos':
                channel_id = params.get('channelId', '')
                
                if not channel_id:
                    self.wfile.write(json.dumps({'error': 'Kanal ID gerekli'}).encode())
                    return
                
                cache_key = get_cache_key('videos', {'channelId': channel_id})
                cached = get_from_cache(cache_key)
                
                if cached:
                    self.wfile.write(json.dumps({
                        'source': 'cache',
                        'data': cached
                    }).encode())
                    return
                
                yt_params = {
                    'part': 'snippet',
                    'channelId': channel_id,
                    'maxResults': 10,
                    'order': 'date',
                    'type': 'video'
                }
                
                result = youtube_api_call('search', yt_params)
                
                if 'error' not in result:
                    save_to_cache(cache_key, 'videos', result)
                
                self.wfile.write(json.dumps({
                    'source': 'api',
                    'data': result
                }).encode())
                return
            
            # ============================================
            # ENDPOINT: STATUS (API Sağlık Kontrolü)
            # ============================================
            elif endpoint == 'status':
                self.wfile.write(json.dumps({
                    'status': 'ok',
                    'service': 'NICHIFY YouTube API',
                    'version': '2.0',
                    'cache_hours': CACHE_HOURS
                }).encode())
                return
            
            else:
                self.wfile.write(json.dumps({'error': f'Bilinmeyen endpoint: {endpoint}'}).encode())
                return
        
        except Exception as e:
            self.wfile.write(json.dumps({'error': str(e)}).encode())
    
    def do_OPTIONS(self):
        """CORS preflight için"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
