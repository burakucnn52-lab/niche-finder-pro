from http.server import BaseHTTPRequestHandler
import json
import os
from urllib.parse import urlparse, parse_qs
import urllib.request
import urllib.parse

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        try:
            parsed_url = urlparse(self.path)
            query_params = parse_qs(parsed_url.query)
            
            search_query = query_params.get('q', ['youtube'])[0]
            max_results = query_params.get('max', ['10'])[0]
            
            api_key = os.environ.get('YOUTUBE_API_KEY', '')
            
            if not api_key:
                response = {
                    "error": "API Key bulunamadi",
                    "message": "Lutfen Vercel'de YOUTUBE_API_KEY ekleyin"
                }
                self.wfile.write(json.dumps(response).encode())
                return
            
            base_url = "https://www.googleapis.com/youtube/v3/search"
            params = {
                'part': 'snippet',
                'q': search_query,
                'type': 'video',
                'maxResults': max_results,
                'order': 'viewCount',
                'key': api_key
            }
            
            url = base_url + "?" + urllib.parse.urlencode(params)
            
            with urllib.request.urlopen(url) as api_response:
                data = json.loads(api_response.read().decode())
            
            videos = []
            for item in data.get('items', []):
                video_info = {
                    'video_id': item['id']['videoId'],
                    'title': item['snippet']['title'],
                    'channel': item['snippet']['channelTitle'],
                    'channel_id': item['snippet']['channelId'],
                    'description': item['snippet']['description'][:200],
                    'thumbnail': item['snippet']['thumbnails']['high']['url'],
                    'published': item['snippet']['publishedAt']
                }
                videos.append(video_info)
            
            response = {
                "success": True,
                "query": search_query,
                "count": len(videos),
                "videos": videos
            }
            
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            error_response = {
                "success": False,
                "error": str(e)
            }
            self.wfile.write(json.dumps(error_response).encode())
        
        return
