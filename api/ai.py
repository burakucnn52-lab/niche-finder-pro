from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.parse

# ============================================
# ADMIN AYARLARI
# ============================================
ADMIN_EMAILS = ['bucun648@gmail.com']

# ============================================
# SYSTEM PROMPT - AI'ın kimliği
# ============================================
SYSTEM_PROMPT = """Sen NICHIFY PRO'nun yapay zeka asistanısın. YouTube niş bulma, kanal analizi, içerik üretimi ve YouTube büyütme konularında uzmansın.

GÖREVLERİN:
- YouTube niş önerileri vermek
- Video başlığı ve thumbnail fikirleri üretmek  
- İçerik stratejisi geliştirmek
- Kanal büyütme tavsiyeleri vermek
- Trend analizi yapmak
- Telif/risk konularında uyarmak
- Hook ve giriş cümleleri yazmak

KURALLAR:
- Her zaman Türkçe yanıt ver
- Pratik, uygulanabilir tavsiyeler ver
- Madde madde ve net açıkla
- Kısa ve öz ol (gerektiğinde detaylı)
- Emoji kullan ama abartma
- Türk YouTuber'ların ihtiyaçlarını anla
- Güncel YouTube algoritmasını bil
- Yanlış bilgi verme, bilmediğin şeyi söyle

YASAK:
- Telif ihlali öner
- Yanıltıcı/yasadışı taktikler önerme
- AI olduğunu sürekli vurgulama
- Çok uzun ve gereksiz cevaplar verme"""


# ============================================
# ADMIN KONTROLÜ
# ============================================
def is_admin_user(user_email, db_user=None):
    """Admin kontrolü - 3 farklı yolla"""
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
# GEMINI API - MULTI KEY ROTATION
# ============================================
def call_gemini_api(messages, max_tokens=1500):
    """Gemini API'ye istek at - Otomatik API key rotation"""
    
    # ✅ TÜM API KEY'LERİ TOPLA (Vercel env'den otomatik)
    api_keys = []
    
    # Ana key
    key1 = os.environ.get('GEMINI_API_KEY', '')
    if key1:
        api_keys.append(key1)
    
    # Yedek keyler (KEY_2'den KEY_10'a kadar otomatik bul)
    for i in range(2, 11):
        key = os.environ.get(f'GEMINI_API_KEY_{i}', '')
        if key:
            api_keys.append(key)
    
    if not api_keys:
        return {'error': 'Gemini API key bulunamadı. Lütfen yöneticiyle iletişime geçin.'}
    
    print(f"🔑 Toplam {len(api_keys)} API key bulundu")
    
    # Gemini formatına çevir
    gemini_contents = []
    for msg in messages:
        role = 'user' if msg.get('role') == 'user' else 'model'
        gemini_contents.append({
            'role': role,
            'parts': [{'text': msg.get('content', '')}]
        })
    
    payload = {
        'contents': gemini_contents,
        'systemInstruction': {
            'parts': [{'text': SYSTEM_PROMPT}]
        },
        'generationConfig': {
            'temperature': 0.7,
            'maxOutputTokens': max_tokens,
            'topP': 0.95,
            'topK': 40
        },
        'safetySettings': [
            {'category': 'HARM_CATEGORY_HARASSMENT', 'threshold': 'BLOCK_ONLY_HIGH'},
            {'category': 'HARM_CATEGORY_HATE_SPEECH', 'threshold': 'BLOCK_ONLY_HIGH'},
            {'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold': 'BLOCK_ONLY_HIGH'},
            {'category': 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold': 'BLOCK_ONLY_HIGH'}
        ]
    }
    
    last_error = None
    
    # ✅ HER API KEY'İ SIRAYLA DENE
    for index, api_key in enumerate(api_keys):
        key_number = index + 1
        print(f"🔄 API Key #{key_number} deneniyor...")
        
        url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}'
        
        try:
            data = json.dumps(payload).encode('utf-8')
            req = urllib.request.Request(url, data=data, method='POST')
            req.add_header('Content-Type', 'application/json')
            
            with urllib.request.urlopen(req, timeout=30) as response:
                result = json.loads(response.read().decode('utf-8'))
                
                if 'candidates' in result and len(result['candidates']) > 0:
                    candidate = result['candidates'][0]
                    
                    if 'content' in candidate and 'parts' in candidate['content']:
                        text = candidate['content']['parts'][0].get('text', '')
                        print(f"✅ API Key #{key_number} ile başarılı!")
                        return {
                            'success': True,
                            'response': text,
                            'usage': result.get('usageMetadata', {}),
                            'key_used': key_number
                        }
                    else:
                        last_error = 'AI yanıt veremedi'
                        continue
                else:
                    last_error = 'AI yanıt vermedi'
                    continue
        
        except urllib.error.HTTPError as e:
            error_body = e.read().decode('utf-8')
            try:
                error_json = json.loads(error_body)
                error_msg = error_json.get('error', {}).get('message', str(e))
            except:
                error_msg = str(e)
            
            print(f"⚠️ API Key #{key_number} hatası: {e.code} - {error_msg}")
            
            # ✅ 429 (rate limit) veya 403 (quota) → SONRAKİ KEY'E GEÇ
            if e.code in [429, 403]:
                last_error = f'Key #{key_number} limit doldu'
                continue
            
            # Diğer hatalar (400, 500 vs.) → DURDUR
            last_error = f'API hatası: {error_msg}'
            return {'error': last_error}
        
        except Exception as e:
            print(f"❌ API Key #{key_number} bağlantı hatası: {e}")
            last_error = f'Bağlantı hatası: {str(e)}'
            continue
    
    # ✅ TÜM KEY'LER DOLU
    print(f"❌ Tüm {len(api_keys)} API key denendi, hepsi başarısız")
    return {
        'error': f'⚠️ AI servisi şu an çok yoğun (Tüm {len(api_keys)} API key limit). Lütfen 1-2 dakika sonra tekrar deneyin.'
    }


# ============================================
# KULLANICI LİMİT KONTROLÜ
# ============================================
def check_user_limit(user_id, user_email):
    """Kullanıcının günlük limitini kontrol et"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        # ✅ ÖNCE EMAIL İLE ADMIN KONTROLÜ
        if is_admin_user(user_email):
            print(f"✅ Admin tanındı (email): {user_email}")
            return {'allowed': True, 'remaining': 999, 'is_admin': True, 'limit': 999, 'used': 0}
        
        if not supabase_url or not supabase_key:
            return {'allowed': True, 'remaining': 999}
        
        # Kullanıcı bilgisini çek
        url = f"{supabase_url}/rest/v1/users?id=eq.{user_id}&select=is_premium,premium_type,is_admin,role,email"
        req = urllib.request.Request(url)
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        
        with urllib.request.urlopen(req, timeout=5) as response:
            users = json.loads(response.read().decode())
            
            if not users:
                return {'allowed': True, 'remaining': 5}
            
            user = users[0]
            
            # ✅ DATABASE'DEN ADMIN KONTROLÜ
            if is_admin_user(user_email, user):
                print(f"✅ Admin tanındı (database): {user.get('email')}")
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
    """Kullanım sayacını artır (admin için artırma)"""
    if is_admin:
        print("✅ Admin - sayaç artırılmadı")
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
# QUICK PROMPT ŞABLONLARI
# ============================================
def get_quick_prompt(action, context=''):
    """Hızlı prompt şablonları"""
    prompts = {
        'niche_ideas': f"YouTube'da kazançlı niş önerileri ver. Eğer kullanıcı belirli bir alan belirttiyse o alanda spesifik olsun. Context: {context}",
        'video_titles': f"Bu konu için 10 adet viral olabilecek YouTube video başlığı öner: {context}",
        'thumbnail_ideas': f"Bu video konusu için yaratıcı thumbnail fikirleri öner (renk, kompozisyon, metin): {context}",
        'hook_writer': f"Bu video için izleyiciyi hemen yakalayacak 5 farklı hook (giriş cümlesi) yaz: {context}",
        'content_plan': f"Bu niş için 30 günlük detaylı içerik takvimi oluştur (video başlıkları, formatlar, hashtagler): {context}",
        'channel_audit': f"Bu kanalı analiz et ve büyütme önerileri ver: {context}",
        'seo_tips': f"Bu video için SEO optimizasyonu öner (başlık, açıklama, tag, hashtag): {context}",
        'growth_strategy': f"Bu kanal için detaylı büyüme stratejisi oluştur: {context}"
    }
    return prompts.get(action, context)


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
            
            print(f"📨 Request: action={action}, user_email={user_email}")
            
            # Limit kontrolü
            is_admin = False
            if action != 'status' and user_id:
                limit_check = check_user_limit(user_id, user_email)
                is_admin = limit_check.get('is_admin', False)
                
                if not limit_check.get('allowed'):
                    self.wfile.write(json.dumps({
                        'error': f'Günlük limitine ulaştın ({limit_check.get("used", 0)}/{limit_check.get("limit", 5)}). Yarın tekrar dene veya Premium\'a geç!',
                        'limit_reached': True,
                        'limit_info': limit_check
                    }).encode())
                    return
            
            # CHAT
            if action == 'chat':
                messages = data.get('messages', [])
                
                if not messages or len(messages) == 0:
                    self.wfile.write(json.dumps({'error': 'Mesaj gerekli'}).encode())
                    return
                
                result = call_gemini_api(messages, max_tokens=1500)
                
                if result.get('success') and user_id:
                    increment_usage(user_id, is_admin=is_admin)
                
                self.wfile.write(json.dumps(result).encode())
                return
            
            # QUICK ACTIONS
            elif action in ['niche_ideas', 'video_titles', 'thumbnail_ideas', 'hook_writer', 'content_plan', 'channel_audit', 'seo_tips', 'growth_strategy']:
                context = data.get('context', '')
                prompt = get_quick_prompt(action, context)
                
                messages = [{'role': 'user', 'content': prompt}]
                result = call_gemini_api(messages, max_tokens=2000)
                
                if result.get('success') and user_id:
                    increment_usage(user_id, is_admin=is_admin)
                
                self.wfile.write(json.dumps(result).encode())
                return
            
            # STATUS
            elif action == 'status':
                api_keys_count = 0
                if os.environ.get('GEMINI_API_KEY'):
                    api_keys_count += 1
                for i in range(2, 11):
                    if os.environ.get(f'GEMINI_API_KEY_{i}'):
                        api_keys_count += 1
                
                self.wfile.write(json.dumps({
                    'status': 'ok' if api_keys_count > 0 else 'no_api_key',
                    'service': 'NICHIFY AI (Gemini 2.0 Flash)',
                    'total_keys': api_keys_count
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
        
        api_keys_count = 0
        if os.environ.get('GEMINI_API_KEY'):
            api_keys_count += 1
        for i in range(2, 11):
            if os.environ.get(f'GEMINI_API_KEY_{i}'):
                api_keys_count += 1
        
        self.wfile.write(json.dumps({
            'status': 'ok' if api_keys_count > 0 else 'no_api_key',
            'service': 'NICHIFY AI Assistant',
            'model': 'gemini-2.0-flash',
            'total_api_keys': api_keys_count
        }).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
