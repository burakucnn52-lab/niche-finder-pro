from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        # Şimdilik placeholder - API key eklenince Gemini ile değiştirilecek
        api_key = os.environ.get('GEMINI_API_KEY', '')
        
        if not api_key:
            self.wfile.write(json.dumps({
                'error': 'AI Asistan henüz aktif değil. Çok yakında!',
                'coming_soon': True
            }).encode())
            return
        
        # API key varsa burada Gemini kodu çalışacak (sonra eklenecek)
        self.wfile.write(json.dumps({
            'error': 'AI sistemi yakında aktif olacak',
            'coming_soon': True
        }).encode())
    
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        api_key = os.environ.get('GEMINI_API_KEY', '')
        self.wfile.write(json.dumps({
            'status': 'placeholder',
            'service': 'NICHIFY AI Assistant',
            'model': 'Gemini (yakında)',
            'has_key': bool(api_key)
        }).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
