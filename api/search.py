from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.parse

BLOCKED_KEYWORDS = ['vevo', 'official', 'records', 'music', 'entertainment', 'tv', 'media', 'topic']

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
            
            if endpoint == 'trending':
                region = params.get('region', 'US')
                search_query = params.get('q', '').strip()
                limit = int(params.get('limit', '50'))
                
                results = []
                
                if search_query:
                    # KULLANICI ARAMASI
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
                    # OTOMATIK - Tüm niş kategoriler
                    categories = ['27', '28', '26', '22', '24', '20', '25']
                    seen_channels = set()
                    
                    for cat in categories:
                        if len(results) >= limit:
                            break
                        try:
                            videos_url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode={region}&videoCategoryId={cat}&maxResults=20&key={api_key}"
                            req = urllib.request.Request(videos_url)
                            response = urllib.request.urlopen(req, timeout=10)
                            data = json.loads(response.read())
                            
                            channel_ids = []
                            video_map = {}
                            for item in data.get('items', []):
                                ch_id = item['snippet']['channelId']
                                if ch_id not in seen_channels:
                                    channel_ids.append(ch_id)
                                    video_map[ch_id] = item
                            
                            if channel_ids:
                                channels_url = f"https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id={','.join(channel_ids[:30])}&key={api_key}"
                                req2 = urllib.request.Request(channels_url)
                                response2 = urllib.request.urlopen(req2, timeout=10)
                                channels_data = json.loads(response2.read())
                                
                                for ch in channels_data.get('items', []):
                                    ch_id = ch['id']
                                    if ch_id in seen_channels:
                                        continue
                                    
                                    ch_stats = ch.get('statistics', {})
                                    ch_snippet = ch.get('snippet', {})
                                    
                                    sub_count = int(ch_stats.get('subscriberCount', 0))
                                    view_count = int(ch_stats.get('viewCount', 0))
                                    video_count = int(ch_stats.get('videoCount', 0))
                                    
                                    title_lower = ch_snippet.get('title', '').lower()
                                    is_blocked = any(kw in title_lower for kw in BLOCKED_KEYWORDS)
                                    
                                    if 1000 <= sub_count <= 500000 and not is_blocked and video_count > 5:
                                        seen_channels.add(ch_id)
                                        video = video_map.get(ch_id, {})
                                        
                                        results.append({
                                            'channel_id': ch_id,
                                            'channel_title': ch_snippet.get('title', ''),
                                            'channel_description': ch_snippet.get('description', '')[:200],
                                            'channel_thumbnail': ch_snippet.get('thumbnails', {}).get('default', {}).get('url', ''),
                                            'subscriber_count': sub_count,
                                            'view_count': view_count,
                                            'video_count': video_count,
                                            'video_title': video.get('snippet', {}).get('title', '') or ch_snippet.get('title', ''),
                                            'video_thumbnail': video.get('snippet', {}).get('thumbnails', {}).get('medium', {}).get('url', '') or ch_snippet.get('thumbnails', {}).get('high', {}).get('url', ''),
                                            'video_id': video.get('id', ''),
                                            'video_views': int(video.get('statistics', {}).get('viewCount', 0)) if video else view_count // max(video_count, 1),
                                            'published_at': video.get('snippet', {}).get('publishedAt', '') if video else ''
                                        })
                        except:
                            continue
                    
                    results.sort(key=lambda x: x['view_count'] / max(x['subscriber_count'], 1), reverse=True)
                
                self.wfile.write(json.dumps({
                    "success": True,
                    "channels": results[:limit],
                    "region": region,
                    "query": search_query,
                    "total": len(results)
                }).encode())
                return
            
            else:
                query = params.get('q', '')
                max_results = params.get('max', '10')
                
                if not query:
                    self.wfile.write(json.dumps({"error": "Query required"}).encode())
                    return
                
                search_url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={urllib.parse.quote(query)}&maxResults={max_results}&type=video&key={api_key}"
                
                req = urllib.request.Request(search_url)
                response = urllib.request.urlopen(req, timeout=10)
                data = json.loads(response.read())
                
                videos = []
                for item in data.get('items', []):
                    videos.append({
                        'video_id': item['id']['videoId'],
                        'title': item['snippet']['title'],
                        'channel': item['snippet']['channelTitle'],
                        'thumbnail': item['snippet']['thumbnails'].get('high', {}).get('url', ''),
                        'published': item['snippet']['publishedAt'],
                        'description': item['snippet']['description'][:200]
                    })
                
                self.wfile.write(json.dumps({
                    "success": True,
                    "count": len(videos),
                    "videos": videos
                }).encode())
                
        except Exception as e:
            self.wfile.write(json.dumps({
                "error": str(e),
                "type": type(e).__name__
            }).encode())
