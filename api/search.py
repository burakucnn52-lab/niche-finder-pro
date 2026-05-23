from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.parse
from datetime import datetime

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        try:
            # URL parse et
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
            
            # ENDPOINT KONTROL
            endpoint = params.get('endpoint', 'search')
            
            if endpoint == 'trending':
                # TRENDING KANALLAR
                region = params.get('region', 'US')
                category = params.get('category', '0')
                
                # 1. Trending videoları çek
                videos_url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode={region}&maxResults=20&key={api_key}"
                
                if category != '0':
                    videos_url += f"&videoCategoryId={category}"
                
                req = urllib.request.Request(videos_url)
                response = urllib.request.urlopen(req, timeout=10)
                data = json.loads(response.read())
                
                # 2. Kanal ID'lerini topla
                channel_ids = list(set([item['snippet']['channelId'] for item in data.get('items', [])]))
                
                # 3. Kanal detaylarını çek
                channels_url = f"https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id={','.join(channel_ids[:20])}&key={api_key}"
                req2 = urllib.request.Request(channels_url)
                response2 = urllib.request.urlopen(req2, timeout=10)
                channels_data = json.loads(response2.read())
                
                # 4. Sonuçları birleştir
                results = []
                channels_map = {ch['id']: ch for ch in channels_data.get('items', [])}
                
                seen_channels = set()
                for video in data.get('items', []):
                    ch_id = video['snippet']['channelId']
                    if ch_id in seen_channels:
                        continue
                    seen_channels.add(ch_id)
                    
                    channel = channels_map.get(ch_id, {})
                    ch_stats = channel.get('statistics', {})
                    ch_snippet = channel.get('snippet', {})
                    
                    sub_count = int(ch_stats.get('subscriberCount', 0))
                    view_count = int(ch_stats.get('viewCount', 0))
                    video_count = int(ch_stats.get('videoCount', 0))
                    
                    # Sadece KÜÇÜK VE YÜKSELEN kanalları al (1K - 500K abone)
                    if 1000 <= sub_count <= 500000:
                        results.append({
                            'channel_id': ch_id,
                            'channel_title': ch_snippet.get('title', ''),
                            'channel_description': ch_snippet.get('description', '')[:200],
                            'channel_thumbnail': ch_snippet.get('thumbnails', {}).get('default', {}).get('url', ''),
                            'subscriber_count': sub_count,
                            'view_count': view_count,
                            'video_count': video_count,
                            'video_title': video['snippet']['title'],
                            'video_thumbnail': video['snippet']['thumbnails'].get('medium', {}).get('url', ''),
                            'video_id': video['id'],
                            'video_views': int(video.get('statistics', {}).get('viewCount', 0)),
                            'published_at': video['snippet']['publishedAt']
                        })
                
                # Abone sayısına göre sırala (küçükten büyüğe - yükselen kanal olduğu için)
                results.sort(key=lambda x: x['view_count'] / max(x['subscriber_count'], 1), reverse=True)
                
                self.wfile.write(json.dumps({
                    "success": True,
                    "channels": results[:15],
                    "region": region
                }).encode())
                return
            
            else:
                # NORMAL SEARCH
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
