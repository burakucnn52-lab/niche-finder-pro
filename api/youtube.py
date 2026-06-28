from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.parse
import hashlib
from datetime import datetime, timedelta

# Blocked keywords (for filtering)
BLOCKED_KEYWORDS = ['vevo', 'official', 'records', 'music', 'entertainment', 'tv', 'media', 'topic']

# ============================================
# SMART FILTERING FOR NICHE DISCOVERY
# ============================================

# Words UNSUITABLE for niches (copyright/spam)
NICHE_BAD_KEYWORDS = [
    'klip', 'official video', 'lyrics', 'song lyrics', 'şarkı sözleri',
    'fragman', 'trailer', 'sahne', 'final sahne', 'final scene',
    'bölüm fragman', 'tek parça', 'full episode', 'full hd izle', 'full hd watch',
    'maç özeti', 'match highlights', 'gol', 'goal', 'müthiş gol', 'penaltı', 'penalty',
    'reklam', 'tanıtım', 'reklam filmi', 'commercial', 'advertisement',
    'konser', 'concert', 'live performance',
    'remix', 'cover şarkı', 'cover song', 'akustik versiyon', 'acoustic version'
]

# If these words exist = CONTENT CREATION - keep it
NICHE_GOOD_KEYWORDS = [
    'nasıl', 'how to', 'rehber', 'guide', 'eğitim', 'education',
    'öğren', 'learn', 'tutorial', 'kurs', 'course',
    'analiz', 'analysis', 'inceleme', 'review',
    'tepki', 'reaction', 'vlog', 'günlük', 'daily',
    'açıklama', 'açıklıyorum', 'anlatım', 'explained', 'explanation',
    'tarih', 'history', 'belgesel', 'documentary',
    'tavsiye', 'öneri', 'tips', 'ipucu',
    'deneyim', 'tecrübe', 'experience', 'test'
]

# Map YouTube categories to niche info
NICHE_CATEGORY_MAP = {
    '1': {'icon': '🎬', 'name': 'Film & Content Review', 'category': 'Art'},
    '2': {'icon': '🚗', 'name': 'Automotive Content', 'category': 'Hobby'},
    '10': {'icon': '🎵', 'name': 'Music Production & Tutorials', 'category': 'Art'},
    '15': {'icon': '🐶', 'name': 'Pet Care', 'category': 'Lifestyle'},
    '17': {'icon': '⚽', 'name': 'Sports Analysis', 'category': 'Sports'},
    '19': {'icon': '✈️', 'name': 'Travel & Vlog', 'category': 'Travel'},
    '20': {'icon': '🎮', 'name': 'Game Reviews', 'category': 'Entertainment'},
    '22': {'icon': '📹', 'name': 'Vlog & Lifestyle', 'category': 'Lifestyle'},
    '23': {'icon': '😂', 'name': 'Comedy & Entertainment', 'category': 'Entertainment'},
    '24': {'icon': '🎭', 'name': 'Entertainment Content', 'category': 'Entertainment'},
    '25': {'icon': '📰', 'name': 'News & Current Affairs', 'category': 'Education'},
    '26': {'icon': '💄', 'name': 'Beauty & Lifestyle', 'category': 'Lifestyle'},
    '27': {'icon': '📚', 'name': 'Educational Content', 'category': 'Education'},
    '28': {'icon': '🔬', 'name': 'Science & Technology', 'category': 'Technology'},
    '29': {'icon': '🌍', 'name': 'NGO & Social Issues', 'category': 'Education'}
}


def is_useful_for_niche(video):
    """Is the video useful for YouTubers/content creators?"""
    try:
        snippet = video.get('snippet', {})
        title = snippet.get('title', '').lower()
        channel = snippet.get('channelTitle', '').lower()
        
        # 1. Check existing BLOCKED_KEYWORDS (channel name)
        for blocked in BLOCKED_KEYWORDS:
            if blocked in channel:
                # But if content creation exists = OK
                if any(good in title for good in NICHE_GOOD_KEYWORDS):
                    return True
                return False
        
        # 2. Bad keyword check (title)
        has_bad = any(bad in title for bad in NICHE_BAD_KEYWORDS)
        has_good = any(good in title for good in NICHE_GOOD_KEYWORDS)
        
        # Both bad and good = OK (e.g., "Movie Review")
        if has_bad and has_good:
            return True
        
        # Only bad = REMOVE
        if has_bad:
            return False
        
        return True
    
    except Exception as e:
        print(f"Filter error: {e}")
        return True

# Cache duration (hours)
CACHE_HOURS = 6

def get_cache_key(endpoint, params):
    """Create unique key for cache"""
    key_string = f"{endpoint}_{json.dumps(params, sort_keys=True)}"
    return hashlib.md5(key_string.encode()).hexdigest()

def get_from_cache(cache_key):
    """Check cache from Supabase"""
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
                
                # Is cache still valid?
                if datetime.now(created_at.tzinfo) - created_at < timedelta(hours=CACHE_HOURS):
                    return cached['data']
        
        return None
    except Exception as e:
        print(f"Cache read error: {e}")
        return None

def save_to_cache(cache_key, endpoint, data):
    """Save cache to Supabase"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return
        
        # Delete old one first
        delete_url = f"{supabase_url}/rest/v1/search_cache?cache_key=eq.{cache_key}"
        delete_req = urllib.request.Request(delete_url, method='DELETE')
        delete_req.add_header('apikey', supabase_key)
        delete_req.add_header('Authorization', f'Bearer {supabase_key}')
        
        try:
            urllib.request.urlopen(delete_req, timeout=5)
        except:
            pass
        
        # Add new cache
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
        print(f"Cache write error: {e}")

def youtube_api_call(endpoint, params):
    """Make YouTube API call"""
    api_key = os.environ.get('YOUTUBE_API_KEY', '')
    
    if not api_key:
        return {'error': 'YouTube API key not found'}
    
    params['key'] = api_key
    url = f"https://www.googleapis.com/youtube/v3/{endpoint}?{urllib.parse.urlencode(params)}"
    
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        return {'error': str(e)}

def filter_channels(channels):
    """Filter out channels containing blocked keywords"""
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
            # Get URL parameters
            url_parts = self.path.split('?')
            params = {}
            if len(url_parts) > 1:
                for pair in url_parts[1].split('&'):
                    if '=' in pair:
                        key, value = pair.split('=', 1)
                        params[key] = urllib.parse.unquote(value)
            
            endpoint = params.get('endpoint', 'search')
            
            # ============================================
            # ENDPOINT: TRENDING (Trending Channels)
            # ============================================
            if endpoint == 'trending':
                region = params.get('region', 'US')
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
            # ENDPOINT: SEARCH (Niche/Channel Search)
            # ============================================
            elif endpoint == 'search':
                query = params.get('q', '')
                search_type = params.get('type', 'channel')
                region = params.get('region', 'US')
                language = params.get('lang', 'en')
                
                if not query:
                    self.wfile.write(json.dumps({'error': 'Search term required'}).encode())
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
                
                # Filter channels
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
            # ENDPOINT: CHANNEL (Channel Detail)
            # ============================================
            elif endpoint == 'channel':
                channel_id = params.get('id', '')
                
                if not channel_id:
                    self.wfile.write(json.dumps({'error': 'Channel ID required'}).encode())
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
            # ENDPOINT: VIDEOS (Channel Videos)
            # ============================================
            elif endpoint == 'videos':
                channel_id = params.get('channelId', '')
                
                if not channel_id:
                    self.wfile.write(json.dumps({'error': 'Channel ID required'}).encode())
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
            # ENDPOINT: NICHE_DISCOVERY (Niche Discovery from YouTube)
            # ============================================
            elif endpoint == 'niche_discovery':
                region = params.get('region', 'US')
                
                cache_key = get_cache_key('niche_discovery', {'region': region})
                cached = get_from_cache(cache_key)
                
                if cached:
                    self.wfile.write(json.dumps({
                        'source': 'cache',
                        'niches': cached
                    }).encode())
                    return
                
                # Fetch 50 videos from YouTube Trending
                yt_params = {
                    'part': 'snippet,statistics,contentDetails',
                    'chart': 'mostPopular',
                    'regionCode': region,
                    'maxResults': 50
                }
                
                result = youtube_api_call('videos', yt_params)
                
                if 'error' in result:
                    self.wfile.write(json.dumps({
                        'error': result.get('error', 'Could not fetch trending')
                    }).encode())
                    return
                
                items = result.get('items', [])
                
                # FILTER (remove spam/copyright)
                filtered = [v for v in items if is_useful_for_niche(v)]
                print(f"🔍 {len(items)} videos → {len(filtered)} useful")
                
                # GROUP BY CATEGORIES = NICHE
                niches_dict = {}
                
                for video in filtered:
                    snippet = video.get('snippet', {})
                    stats = video.get('statistics', {})
                    category_id = snippet.get('categoryId', '')
                    
                    if category_id not in NICHE_CATEGORY_MAP:
                        continue
                    
                    cat_info = NICHE_CATEGORY_MAP[category_id]
                    niche_id = f"trending-{category_id}"
                    
                    if niche_id not in niches_dict:
                        niches_dict[niche_id] = {
                            'id': niche_id,
                            'icon': cat_info['icon'],
                            'name': cat_info['name'],
                            'category': cat_info['category'],
                            'description': f"Content trending today in {cat_info['name']}",
                            'isTrending': True,
                            'trending_videos': [],
                            'subCategories': [],
                            'keywords': [cat_info['name'].lower().split()[0]],
                            'rpm': {'min': 5, 'max': 12},
                            'competition': 70,
                            'growth': 90,
                            'sustainability': 75,
                            'facelessSupport': True,
                            'shortsSupport': True,
                        }
                    
                    # Add up to 5 trending videos
                    if len(niches_dict[niche_id]['trending_videos']) < 5:
                        niches_dict[niche_id]['trending_videos'].append({
                            'title': snippet.get('title', ''),
                            'channel': snippet.get('channelTitle', ''),
                            'thumbnail': snippet.get('thumbnails', {}).get('medium', {}).get('url', ''),
                            'videoId': video.get('id', ''),
                            'views': stats.get('viewCount', '0')
                        })
                    
                    # Sub-categories from tags (up to 5)
                    tags = snippet.get('tags', [])[:5]
                    for tag in tags:
                        if tag and len(niches_dict[niche_id]['subCategories']) < 5:
                            if tag not in niches_dict[niche_id]['subCategories']:
                                niches_dict[niche_id]['subCategories'].append(tag)
                
                trending_niches = list(niches_dict.values())
                print(f"✨ {len(trending_niches)} trending niches created")
                
                # Save to cache
                save_to_cache(cache_key, 'niche_discovery', trending_niches)
                
                self.wfile.write(json.dumps({
                    'source': 'api',
                    'niches': trending_niches,
                    'region': region
                }).encode())
                return
             
            # ============================================
            # ENDPOINT: STATUS (API Health Check)
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
                self.wfile.write(json.dumps({'error': f'Unknown endpoint: {endpoint}'}).encode())
                return
        
        except Exception as e:
            self.wfile.write(json.dumps({'error': str(e)}).encode())
    
    def do_OPTIONS(self):
        """For CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
