from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.parse
from datetime import datetime

BLOCKED_KEYWORDS = ['vevo', 'official', 'records', 'music', 'entertainment', 'tv', 'media', 'topic']

# Niş bazlı RPM değerleri (sektör ortalamaları)
NICHE_RPM = {
    'finance': {'min': 8, 'max': 15, 'avg': 11.5},
    'business': {'min': 6, 'max': 12, 'avg': 9},
    'real_estate': {'min': 7, 'max': 14, 'avg': 10.5},
    'insurance': {'min': 9, 'max': 16, 'avg': 12.5},
    'tech': {'min': 3, 'max': 7, 'avg': 5},
    'education': {'min': 4, 'max': 8, 'avg': 6},
    'gaming': {'min': 1, 'max': 3, 'avg': 2},
    'beauty': {'min': 2, 'max': 5, 'avg': 3.5},
    'food': {'min': 2, 'max': 4, 'avg': 3},
    'entertainment': {'min': 1, 'max': 3, 'avg': 2},
    'health': {'min': 5, 'max': 9, 'avg': 7},
    'fitness': {'min': 3, 'max': 6, 'avg': 4.5},
    'lifestyle': {'min': 2, 'max': 5, 'avg': 3.5},
    'travel': {'min': 2, 'max': 5, 'avg': 3.5},
    'auto': {'min': 4, 'max': 8, 'avg': 6},
    'default': {'min': 2, 'max': 5, 'avg': 3.5}
}

def detect_niche(title, description):
    text = (title + ' ' + description).lower()
    if any(w in text for w in ['finance', 'invest', 'crypto', 'trading', 'money', 'wealth']):
        return 'finance'
    if any(w in text for w in ['business', 'startup', 'entrepreneur', 'marketing']):
        return 'business'
    if any(w in text for w in ['real estate', 'property', 'realtor', 'house']):
        return 'real_estate'
    if any(w in text for w in ['insurance', 'mortgage', 'loan']):
        return 'insurance'
    if any(w in text for w in ['tech', 'ai', 'programming', 'code', 'developer', 'software']):
        return 'tech'
    if any(w in text for w in ['education', 'learn', 'tutorial', 'course', 'teach']):
        return 'education'
    if any(w in text for w in ['game', 'gaming', 'gamer', 'play', 'minecraft', 'fortnite']):
        return 'gaming'
    if any(w in text for w in ['beauty', 'makeup', 'skin', 'cosmetic']):
        return 'beauty'
    if any(w in text for w in ['food', 'cook', 'recipe', 'kitchen', 'chef']):
        return 'food'
    if any(w in text for w in ['health', 'medical', 'doctor', 'wellness']):
        return 'health'
    if any(w in text for w in ['fitness', 'workout', 'gym', 'exercise']):
        return 'fitness'
    if any(w in text for w in ['travel', 'tour', 'destination', 'vacation']):
        return 'travel'
    if any(w in text for w in ['car', 'auto', 'vehicle', 'motorcycle']):
        return 'auto'
    if any(w in text for w in ['entertainment', 'funny', 'comedy', 'meme']):
        return 'entertainment'
    return 'default'

# Niş bazlı demografi tahminleri
NICHE_DEMOGRAPHICS = {
    'finance': {'male': 72, 'female': 28, 'age_18_24': 15, 'age_25_34': 38, 'age_35_44': 30, 'age_45_plus': 17},
    'business': {'male': 65, 'female': 35, 'age_18_24': 18, 'age_25_34': 42, 'age_35_44': 28, 'age_45_plus': 12},
    'tech': {'male': 78, 'female': 22, 'age_18_24': 28, 'age_25_34': 40, 'age_35_44': 22, 'age_45_plus': 10},
    'gaming': {'male': 82, 'female': 18, 'age_18_24': 45, 'age_25_34': 35, 'age_35_44': 15, 'age_45_plus': 5},
    'beauty': {'male': 18, 'female': 82, 'age_18_24': 38, 'age_25_34': 35, 'age_35_44': 20, 'age_45_plus': 7},
    'food': {'male': 38, 'female': 62, 'age_18_24': 22, 'age_25_34': 35, 'age_35_44': 28, 'age_45_plus': 15},
    'fitness': {'male': 55, 'female': 45, 'age_18_24': 32, 'age_25_34': 40, 'age_35_44': 20, 'age_45_plus': 8},
    'education': {'male': 52, 'female': 48, 'age_18_24': 35, 'age_25_34': 35, 'age_35_44': 20, 'age_45_plus': 10},
    'travel': {'male': 48, 'female': 52, 'age_18_24': 25, 'age_25_34': 38, 'age_35_44': 25, 'age_45_plus': 12},
    'default': {'male': 58, 'female': 42, 'age_18_24': 28, 'age_25_34': 35, 'age_35_44': 22, 'age_45_plus': 15}
}

# Ülke tahminleri (kanal diline göre)
COUNTRY_DISTRIBUTION = {
    'en': [
        {'country': 'United States', 'flag': '🇺🇸', 'pct': 35},
        {'country': 'India', 'flag': '🇮🇳', 'pct': 18},
        {'country': 'United Kingdom', 'flag': '🇬🇧', 'pct': 10},
        {'country': 'Canada', 'flag': '🇨🇦', 'pct': 8},
        {'country': 'Australia', 'flag': '🇦🇺', 'pct': 6}
    ],
    'tr': [
        {'country': 'Türkiye', 'flag': '🇹🇷', 'pct': 75},
        {'country': 'Almanya', 'flag': '🇩🇪', 'pct': 8},
        {'country': 'ABD', 'flag': '🇺🇸', 'pct': 5},
        {'country': 'Azerbaycan', 'flag': '🇦🇿', 'pct': 4},
        {'country': 'Hollanda', 'flag': '🇳🇱', 'pct': 3}
    ],
    'de': [
        {'country': 'Almanya', 'flag': '🇩🇪', 'pct': 60},
        {'country': 'Avusturya', 'flag': '🇦🇹', 'pct': 15},
        {'country': 'İsviçre', 'flag': '🇨🇭', 'pct': 12},
        {'country': 'ABD', 'flag': '🇺🇸', 'pct': 5},
        {'country': 'Türkiye', 'flag': '🇹🇷', 'pct': 4}
    ],
    'default': [
        {'country': 'United States', 'flag': '🇺🇸', 'pct': 30},
        {'country': 'India', 'flag': '🇮🇳', 'pct': 15},
        {'country': 'United Kingdom', 'flag': '🇬🇧', 'pct': 10},
        {'country': 'Brazil', 'flag': '🇧🇷', 'pct': 8},
        {'country': 'Germany', 'flag': '🇩🇪', 'pct': 6}
    ]
}

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        try:
            url_parts = self.path.split('?')
            params = {}
            if len(url_parts) > 1:
                for pair in url_parts[1].split('&'):
                    if '=' in pair:
                        key, value = pair.split('=', 1)
                        params[key] = urllib.parse.unquote(value)
            
            api_key = os.environ.get('YOUTUBE_API_KEY', '')
            
            if not api_key:
                self.wfile.write(json.dumps({"error": "API key not configured"}).encode())
                return
            
            endpoint = params.get('endpoint', 'search')
            
            # CHANNEL ANALYTICS - YENİ!
            if endpoint == 'analytics':
                channel_id = params.get('channel_id', '')
                if not channel_id:
                    self.wfile.write(json.dumps({"error": "channel_id required"}).encode())
                    return
                
                # Kanal detayları
                ch_url = f"https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id={channel_id}&key={api_key}"
                req = urllib.request.Request(ch_url)
                response = urllib.request.urlopen(req, timeout=10)
                data = json.loads(response.read())
                
                if not data.get('items'):
                    self.wfile.write(json.dumps({"error": "Channel not found"}).encode())
                    return
                
                ch = data['items'][0]
                stats = ch.get('statistics', {})
                snippet = ch.get('snippet', {})
                branding = ch.get('brandingSettings', {}).get('channel', {})
                
                sub_count = int(stats.get('subscriberCount', 0))
                view_count = int(stats.get('viewCount', 0))
                video_count = int(stats.get('videoCount', 0))
                
                # Kanal yaşı hesapla
                created_at = snippet.get('publishedAt', '')
                channel_age_days = 0
                channel_age_text = "Unknown"
                if created_at:
                    try:
                        created = datetime.strptime(created_at[:10], '%Y-%m-%d')
                        now = datetime.now()
                        diff = now - created
                        channel_age_days = diff.days
                        years = channel_age_days // 365
                        months = (channel_age_days % 365) // 30
                        if years > 0:
                            channel_age_text = f"{years} yıl {months} ay"
                        else:
                            channel_age_text = f"{months} ay"
                    except:
                        pass
                
                # Hesaplamalar
                avg_views_per_video = view_count // max(video_count, 1)
                monthly_videos = round((video_count / max(channel_age_days / 30, 1)), 1) if channel_age_days > 0 else 0
                
                # Niş tespit
                niche = detect_niche(snippet.get('title', ''), snippet.get('description', ''))
                rpm = NICHE_RPM.get(niche, NICHE_RPM['default'])
                
                # Aylık tahmini gelir
                monthly_views_estimate = avg_views_per_video * monthly_videos if monthly_videos > 0 else view_count / max(channel_age_days / 30, 1)
                monthly_earnings_min = round((monthly_views_estimate / 1000) * rpm['min'])
                monthly_earnings_max = round((monthly_views_estimate / 1000) * rpm['max'])
                monthly_earnings_avg = round((monthly_views_estimate / 1000) * rpm['avg'])
                
                # Yıllık
                yearly_earnings_min = monthly_earnings_min * 12
                yearly_earnings_max = monthly_earnings_max * 12
                
                # Demografi
                demographics = NICHE_DEMOGRAPHICS.get(niche, NICHE_DEMOGRAPHICS['default'])
                
                # Ülke dağılımı (dile göre)
                country = branding.get('country', '').lower()
                lang = snippet.get('defaultLanguage', '').lower()[:2]
                
                if 'tr' in country or 'tr' in lang:
                    countries = COUNTRY_DISTRIBUTION['tr']
                elif 'de' in country or 'de' in lang:
                    countries = COUNTRY_DISTRIBUTION['de']
                elif 'en' in country or 'en' in lang or 'us' in country:
                    countries = COUNTRY_DISTRIBUTION['en']
                else:
                    countries = COUNTRY_DISTRIBUTION['default']
                
                self.wfile.write(json.dumps({
                    "success": True,
                    "channel": {
                        "id": channel_id,
                        "title": snippet.get('title', ''),
                        "description": snippet.get('description', '')[:300],
                        "thumbnail": snippet.get('thumbnails', {}).get('high', {}).get('url', ''),
                        "banner": branding.get('image', {}).get('bannerExternalUrl', ''),
                        "country": branding.get('country', 'Unknown'),
                        "created_at": created_at[:10] if created_at else '',
                        "channel_age": channel_age_text,
                        "channel_age_days": channel_age_days
                    },
                    "stats": {
                        "subscribers": sub_count,
                        "total_views": view_count,
                        "total_videos": video_count,
                        "avg_views_per_video": avg_views_per_video,
                        "monthly_videos": monthly_videos
                    },
                    "estimates": {
                        "niche": niche,
                        "rpm_min": rpm['min'],
                        "rpm_max": rpm['max'],
                        "rpm_avg": rpm['avg'],
                        "monthly_earnings_min": monthly_earnings_min,
                        "monthly_earnings_max": monthly_earnings_max,
                        "monthly_earnings_avg": monthly_earnings_avg,
                        "yearly_earnings_min": yearly_earnings_min,
                        "yearly_earnings_max": yearly_earnings_max,
                        "monthly_views_estimate": int(monthly_views_estimate)
                    },
                    "demographics": demographics,
                    "countries": countries
                }).encode())
                return
            
            if endpoint == 'trending':
                region = params.get('region', 'US')
                search_query = params.get('q', '').strip()
                limit = int(params.get('limit', '50'))
                
                results = []
                
                if search_query:
                    search_url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={urllib.parse.quote(search_query)}&type=channel&maxResults=25&regionCode={region}&key={api_key}"
                    req = urllib.request.Request(search_url)
                    response = urllib.request.urlopen(req, timeout=10)
                    data = json.loads(response.read())
                    
                    channel_ids = [item['snippet']['channelId'] for item in data.get('items', [])]
                    
                    if channel_ids:
                        channels_url = f"https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id={','.join(channel_ids[:25])}&key={api_key}"
                        req2 = urllib.request.Request(channels_url)
                        response2 = urllib.request.urlopen(req2, timeout=10)
                        channels_data = json.loads(response2.read())
                        
                        for ch in channels_data.get('items', []):
                            ch_stats = ch.get('statistics', {})
                            ch_snippet = ch.get('snippet', {})
                            
                            sub_count = int(ch_stats.get('subscriberCount', 0))
                            view_count = int(ch_stats.get('viewCount', 0))
                            video_count = int(ch_stats.get('videoCount', 0))
                            
                            title_lower = ch_snippet.get('title', '').lower()
                            is_blocked = any(kw in title_lower for kw in BLOCKED_KEYWORDS)
                            
                            if 1000 <= sub_count <= 500000 and not is_blocked and video_count > 5:
                                results.append({
                                    'channel_id': ch['id'],
                                    'channel_title': ch_snippet.get('title', ''),
                                    'channel_description': ch_snippet.get('description', '')[:200],
                                    'channel_thumbnail': ch_snippet.get('thumbnails', {}).get('default', {}).get('url', ''),
                                    'subscriber_count': sub_count,
                                    'view_count': view_count,
                                    'video_count': video_count,
                                    'video_title': ch_snippet.get('description', '')[:100] or ch_snippet.get('title', ''),
                                    'video_thumbnail': ch_snippet.get('thumbnails', {}).get('high', {}).get('url', '') or ch_snippet.get('thumbnails', {}).get('medium', {}).get('url', ''),
                                    'video_id': '',
                                    'video_views': view_count // max(video_count, 1),
                                    'published_at': ''
                                })
                        
                        results.sort(key=lambda x: x['view_count'] / max(x['subscriber_count'], 1), reverse=True)
                else:
                    categories = ['27', '28', '26', '22
