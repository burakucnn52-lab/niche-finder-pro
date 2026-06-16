from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import random

# ============================================
# ADMIN AYARLARI
# ============================================
ADMIN_EMAILS = ['bucun648@gmail.com']


# ============================================
# ADMIN KONTROLÜ
# ============================================
def is_admin_user(user_email, db_user=None):
    if user_email:
        clean_email = user_email.strip().lower()
        if clean_email in [e.lower() for e in ADMIN_EMAILS]:
            return True
    
    if db_user:
        if db_user.get('is_admin') is True:
            return True
        if db_user.get('role') == 'super_admin':
            return True
    
    return False


# ============================================
# KULLANICI LİMİT KONTROLÜ
# ============================================
def check_user_limit(user_id, user_email):
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if is_admin_user(user_email):
            return {'allowed': True, 'remaining': 999, 'is_admin': True, 'limit': 999, 'used': 0}
        
        if not supabase_url or not supabase_key:
            return {'allowed': True, 'remaining': 999}
        
        url = f"{supabase_url}/rest/v1/users?id=eq.{user_id}&select=is_premium,premium_type,is_admin,role,email"
        req = urllib.request.Request(url)
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        
        with urllib.request.urlopen(req, timeout=5) as response:
            users = json.loads(response.read().decode())
            
            if not users:
                return {'allowed': True, 'remaining': 5}
            
            user = users[0]
            
            if is_admin_user(user_email, user):
                return {'allowed': True, 'remaining': 999, 'is_admin': True, 'limit': 999, 'used': 0}
            
            is_premium = user.get('is_premium', False)
            daily_limit = 50 if is_premium else 5
            
            from datetime import date
            today = date.today().isoformat()
            
            usage_url = f"{supabase_url}/rest/v1/ai_usage?user_id=eq.{user_id}&usage_date=eq.{today}"
            usage_req = urllib.request.Request(usage_url)
            usage_req.add_header('apikey', supabase_key)
            usage_req.add_header('Authorization', f'Bearer {supabase_key}')
            
            with urllib.request.urlopen(usage_req, timeout=5) as usage_response:
                usage_data = json.loads(usage_response.read().decode())
                
                current_count = 0
                if usage_data:
                    current_count = usage_data[0].get('request_count', 0)
                
                remaining = daily_limit - current_count
                
                return {
                    'allowed': remaining > 0,
                    'remaining': max(0, remaining),
                    'limit': daily_limit,
                    'used': current_count,
                    'is_premium': is_premium
                }
    
    except Exception as e:
        print(f"❌ Limit check error: {e}")
        if is_admin_user(user_email):
            return {'allowed': True, 'remaining': 999, 'is_admin': True}
        return {'allowed': True, 'remaining': 5}


# ============================================
# KULLANIM SAYACI
# ============================================
def increment_usage(user_id, is_admin=False):
    if is_admin:
        return
    
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return
        
        from datetime import date, datetime
        today = date.today().isoformat()
        
        check_url = f"{supabase_url}/rest/v1/ai_usage?user_id=eq.{user_id}&usage_date=eq.{today}"
        check_req = urllib.request.Request(check_url)
        check_req.add_header('apikey', supabase_key)
        check_req.add_header('Authorization', f'Bearer {supabase_key}')
        
        with urllib.request.urlopen(check_req, timeout=5) as response:
            existing = json.loads(response.read().decode())
            
            if existing:
                new_count = existing[0].get('request_count', 0) + 1
                update_url = f"{supabase_url}/rest/v1/ai_usage?user_id=eq.{user_id}&usage_date=eq.{today}"
                payload = json.dumps({
                    'request_count': new_count,
                    'last_request_at': datetime.utcnow().isoformat() + 'Z'
                }).encode()
                
                update_req = urllib.request.Request(update_url, data=payload, method='PATCH')
                update_req.add_header('apikey', supabase_key)
                update_req.add_header('Authorization', f'Bearer {supabase_key}')
                update_req.add_header('Content-Type', 'application/json')
                update_req.add_header('Prefer', 'return=minimal')
                
                urllib.request.urlopen(update_req, timeout=5)
            else:
                insert_url = f"{supabase_url}/rest/v1/ai_usage"
                payload = json.dumps({
                    'user_id': user_id,
                    'usage_date': today,
                    'request_count': 1,
                    'last_request_at': datetime.utcnow().isoformat() + 'Z'
                }).encode()
                
                insert_req = urllib.request.Request(insert_url, data=payload, method='POST')
                insert_req.add_header('apikey', supabase_key)
                insert_req.add_header('Authorization', f'Bearer {supabase_key}')
                insert_req.add_header('Content-Type', 'application/json')
                insert_req.add_header('Prefer', 'return=minimal')
                
                urllib.request.urlopen(insert_req, timeout=5)
    
    except Exception as e:
        print(f"❌ Usage increment error: {e}")


# ============================================
# HTTP HANDLER
# ============================================
class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            action = data.get('action', 'chat')
            user_id = data.get('user_id', '')
            user_email = data.get('user_email', '')
            
            # GET API KEY - Frontend için key sağla
            if action == 'get_key':
                # Tüm Gemini keyleri topla
                all_keys = []
                
                k1 = os.environ.get('GEMINI_API_KEY', '')
                if k1:
                    all_keys.append(k1)
                
                for i in range(2, 11):
                    k = os.environ.get(f'GEMINI_API_KEY_{i}', '')
                    if k:
                        all_keys.append(k)
                
                if not all_keys:
                    self.wfile.write(json.dumps({'error': 'API key bulunamadı'}).encode())
                    return
                
                # Limit kontrolü
                is_admin = False
                if user_id:
                    limit_check = check_user_limit(user_id, user_email)
                    is_admin = limit_check.get('is_admin', False)
                    
                    if not limit_check.get('allowed'):
                        self.wfile.write(json.dumps({
                            'error': f'Günlük limitine ulaştın ({limit_check.get("used", 0)}/{limit_check.get("limit", 5)}).',
                            'limit_reached': True
                        }).encode())
                        return
                
                # Random key seç (load balancing)
                selected_key = random.choice(all_keys)
                
                self.wfile.write(json.dumps({
                    'success': True,
                    'api_key': selected_key,
                    'is_admin': is_admin,
                    'total_keys': len(all_keys)
                }).encode())
                return
            
            # INCREMENT USAGE
            elif action == 'increment':
                is_admin = False
                if user_id:
                    limit_check = check_user_limit(user_id, user_email)
                    is_admin = limit_check.get('is_admin', False)
                    increment_usage(user_id, is_admin=is_admin)
                
                self.wfile.write(json.dumps({'success': True}).encode())
                return
            
            # STATUS
            elif action == 'status':
                gemini_count = 0
                if os.environ.get('GEMINI_API_KEY'):
                    gemini_count += 1
                for i in range(2, 11):
                    if os.environ.get(f'GEMINI_API_KEY_{i}'):
                        gemini_count += 1
                
                self.wfile.write(json.dumps({
                    'status': 'ok',
                    'mode': 'frontend-direct',
                    'gemini_keys': gemini_count
                }).encode())
                return
            
            else:
                self.wfile.write(json.dumps({'error': f'Bilinmeyen action: {action}'}).encode())
        
        except Exception as e:
            print(f"❌ Handler error: {e}")
            self.wfile.write(json.dumps({'error': str(e)}).encode())
    
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        gemini_count = 0
        if os.environ.get('GEMINI_API_KEY'):
            gemini_count += 1
        for i in range(2, 11):
            if os.environ.get(f'GEMINI_API_KEY_{i}'):
                gemini_count += 1
        
        self.wfile.write(json.dumps({
            'status': 'ok',
            'mode': 'frontend-direct',
            'gemini_keys': gemini_count
        }).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
