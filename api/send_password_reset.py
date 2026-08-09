from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.parse
import urllib.error
import secrets
from datetime import datetime, timedelta


def send_reset_email(email, reset_link):
    """Resend ile şifre sıfırlama maili gönder"""
    try:
        resend_api_key = os.environ.get('RESEND_API_KEY', '')
        
        if not resend_api_key:
            return {'success': False, 'error': 'RESEND_API_KEY bulunamadı'}
        
        url = 'https://api.resend.com/emails'
        
        # HTML e-posta içeriği
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f7f3ed;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background: #f7f3ed; padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #d97706, #b45309); padding: 40px 30px; text-align: center;">
                                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800;">
                                        🎯 NICHIFY PRO
                                    </h1>
                                    <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                                        Şifre Sıfırlama Talebi
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Body -->
                            <tr>
                                <td style="padding: 40px 30px;">
                                    <div style="text-align: center; margin-bottom: 30px;">
                                        <div style="font-size: 64px; margin-bottom: 16px;">🔒</div>
                                        <h2 style="margin: 0; color: #1c1917; font-size: 24px; font-weight: 700;">
                                            Şifreni Sıfırla
                                        </h2>
                                    </div>
                                    
                                    <p style="color: #44403c; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                                        Merhaba,
                                    </p>
                                    
                                    <p style="color: #44403c; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                                        NICHIFY PRO hesabın için şifre sıfırlama talebinde bulundun. 
                                        Yeni bir şifre oluşturmak için aşağıdaki butona tıkla:
                                    </p>
                                    
                                    <!-- CTA Button -->
                                    <div style="text-align: center; margin: 40px 0;">
                                        <a href="{reset_link}" style="
                                            display: inline-block;
                                            background: linear-gradient(135deg, #d97706, #b45309);
                                            color: #ffffff;
                                            padding: 16px 40px;
                                            border-radius: 12px;
                                            text-decoration: none;
                                            font-weight: 700;
                                            font-size: 16px;
                                            box-shadow: 0 4px 15px rgba(217, 119, 6, 0.3);
                                        ">
                                            🔑 Şifremi Sıfırla
                                        </a>
                                    </div>
                                    
                                    <!-- Alternative link -->
                                    <div style="background: #f7f3ed; border-radius: 8px; padding: 16px; margin: 30px 0;">
                                        <p style="color: #78716c; font-size: 13px; margin: 0 0 8px; font-weight: 600;">
                                            Buton çalışmıyorsa, aşağıdaki bağlantıyı tarayıcına kopyala:
                                        </p>
                                        <p style="color: #d97706; font-size: 12px; margin: 0; word-break: break-all;">
                                            {reset_link}
                                        </p>
                                    </div>
                                    
                                    <!-- Info -->
                                    <div style="border-top: 1px solid #e8e0d0; padding-top: 20px; margin-top: 30px;">
                                        <p style="color: #78716c; font-size: 14px; line-height: 1.6; margin: 0 0 12px;">
                                            ⏰ <strong>Bu bağlantı 1 saat boyunca geçerlidir.</strong>
                                        </p>
                                        <p style="color: #78716c; font-size: 14px; line-height: 1.6; margin: 0;">
                                            🔒 Eğer bu talebi sen yapmadıysan, bu maili görmezden gelebilirsin. 
                                            Şifren güvende kalacaktır.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background: #ede7dc; padding: 30px; text-align: center;">
                                    <p style="color: #78716c; font-size: 13px; margin: 0 0 8px;">
                                        © 2025 NICHIFY PRO. Tüm hakları saklıdır.
                                    </p>
                                    <p style="color: #a8a29e; font-size: 12px; margin: 0;">
                                        Bu e-posta {email} adresine gönderildi.
                                    </p>
                                </td>
                            </tr>
                            
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        payload = json.dumps({
            'from': 'NICHIFY PRO <onboarding@resend.dev>',
            'to': [email],
            'subject': '🔒 Şifreni Sıfırla - NICHIFY PRO',
            'html': html_content
        }).encode('utf-8')
        
        req = urllib.request.Request(url, data=payload, method='POST')
        req.add_header('Authorization', f'Bearer {resend_api_key}')
        req.add_header('Content-Type', 'application/json')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode())
            print(f"✅ Şifre sıfırlama maili gönderildi: {email}")
            return {'success': True, 'id': result.get('id')}
    
    except urllib.error.HTTPError as http_err:
        error_body = http_err.read().decode('utf-8')
        print(f"❌ Resend HTTP {http_err.code} hatası: {error_body}")
        return {'success': False, 'error': f'Resend HTTP {http_err.code}: {error_body}'}
    except Exception as e:
        print(f"❌ Mail gönderme hatası: {e}")
        return {'success': False, 'error': str(e)}


def generate_reset_token(email):
    """Supabase üzerinden reset token oluştur"""
    try:
        # 🔧 Sondaki / karakterini temizle (çift slash sorununu önler)
        supabase_url = os.environ.get('SUPABASE_URL', '').rstrip('/')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return {'success': False, 'error': 'Supabase config eksik'}
        
        # Supabase Admin API ile magic link oluştur
        url = f"{supabase_url}/auth/v1/admin/generate_link"
        
        # 🔧 Redirect URL ekle (kullanıcı linke tıklayınca şifre sıfırlama sayfana gitsin)
        payload = json.dumps({
            'type': 'recovery',
            'email': email,
            'options': {
                'redirect_to': 'https://niche-finder-pro-cyan.vercel.app/reset-password'
            }
        }).encode('utf-8')
        
        req = urllib.request.Request(url, data=payload, method='POST')
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        req.add_header('Content-Type', 'application/json')
        
        print(f"🔗 Supabase'e istek atılıyor: {url}")
        
        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode())
                
                # Recovery link'i al
                action_link = data.get('properties', {}).get('action_link', '')
                
                if action_link:
                    print(f"✅ Reset link oluşturuldu: {email}")
                    return {'success': True, 'link': action_link}
                else:
                    print(f"⚠️ Response'da action_link yok. Response: {data}")
                    return {'success': False, 'error': 'Link oluşturulamadı'}
        
        except urllib.error.HTTPError as http_err:
            # 🔧 HTTP hatasının detayını oku - gerçek hatayı görmek için
            error_body = http_err.read().decode('utf-8')
            print(f"❌ Supabase HTTP {http_err.code} hatası: {error_body}")
            print(f"❌ İstek atılan URL: {url}")
            return {'success': False, 'error': f'Supabase HTTP {http_err.code}: {error_body}'}
    
    except Exception as e:
        print(f"❌ Token oluşturma hatası: {e}")
        return {'success': False, 'error': str(e)}


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Şifre sıfırlama endpoint'i"""
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            
            if content_length == 0:
                self._send_response(400, {'success': False, 'error': 'Boş body'})
                return
            
            raw_body = self.rfile.read(content_length)
            
            try:
                data = json.loads(raw_body.decode('utf-8'))
            except json.JSONDecodeError:
                self._send_response(400, {'success': False, 'error': 'Geçersiz JSON'})
                return
            
            email = data.get('email', '').strip().lower()
            
            if not email or '@' not in email:
                self._send_response(400, {
                    'success': False, 
                    'error': 'Geçerli bir e-posta adresi gir'
                })
                return
            
            print(f"📧 Şifre sıfırlama talebi: {email}")
            
            # 1. Supabase'den reset link oluştur
            token_result = generate_reset_token(email)
            
            if not token_result['success']:
                # 🔧 Hata detayını da logla ama kullanıcıya generic mesaj göster
                print(f"⚠️ Token oluşturma başarısız ama kullanıcıya generic mesaj döndürülüyor: {token_result.get('error')}")
                self._send_response(200, {
                    'success': True,
                    'message': 'Eğer bu e-posta kayıtlıysa, sıfırlama bağlantısı gönderildi.'
                })
                return
            
            reset_link = token_result['link']
            
            # 2. Resend ile mail gönder
            email_result = send_reset_email(email, reset_link)
            
            if email_result['success']:
                self._send_response(200, {
                    'success': True,
                    'message': 'Şifre sıfırlama bağlantısı e-posta adresine gönderildi.'
                })
            else:
                self._send_response(500, {
                    'success': False,
                    'error': 'Mail gönderilemedi. Lütfen daha sonra tekrar dene.'
                })
        
        except Exception as e:
            print(f"❌ Handler hatası: {e}")
            self._send_response(500, {
                'success': False, 
                'error': str(e)
            })
    
    def do_GET(self):
        """Sağlık kontrolü"""
        self._send_response(200, {
            'status': 'ok',
            'service': 'NICHIFY Password Reset',
            'method': 'POST'
        })
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def _send_response(self, status_code, data):
        """JSON yanıt gönder"""
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
