from http.server import BaseHTTPRequestHandler
import json
import os
import resend
from datetime import datetime

# ============================================
# CONFIG
# ============================================
ADMIN_EMAILS = ['burakucnn52@gmail.com', 'bucun648@gmail.com']
FROM_EMAIL = 'NICHIFY PRO <onboarding@resend.dev>'  # Resend test domain
SITE_URL = 'https://niche-finder-pro.vercel.app'
SITE_NAME = 'NICHIFY PRO'


# ============================================
# EMAIL TEMPLATES
# ============================================
def get_welcome_email_html(user_name, user_email):
    """Welcome email for new user"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        
        <div style="text-align:center;margin-bottom:30px;">
          <div style="font-size:48px;margin-bottom:10px;">🎯</div>
          <h1 style="color:#fff;font-size:28px;margin:0;background:linear-gradient(135deg,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">{SITE_NAME}</h1>
        </div>
        
        <div style="background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(236,72,153,0.1));border:1px solid rgba(168,85,247,0.3);border-radius:16px;padding:40px 30px;">
          
          <h2 style="color:#fff;font-size:24px;margin:0 0 20px 0;">Welcome aboard, {user_name}! 🚀</h2>
          
          <p style="color:#d1d5db;font-size:16px;line-height:1.6;margin:0 0 20px 0;">
            Thanks for joining <strong style="color:#fff;">{SITE_NAME}</strong> - your AI-powered YouTube niche discovery platform!
          </p>
          
          <p style="color:#d1d5db;font-size:16px;line-height:1.6;margin:0 0 30px 0;">
            You're now ready to:
          </p>
          
          <ul style="color:#d1d5db;font-size:15px;line-height:1.8;padding-left:20px;margin:0 0 30px 0;">
            <li>🔍 Discover profitable YouTube niches</li>
            <li>📈 Analyze trending channels</li>
            <li>🤖 Get AI-powered insights with Gemini</li>
            <li>⚠️ Detect risks before starting</li>
            <li>🚀 Find rising opportunities</li>
          </ul>
          
          <div style="text-align:center;margin:30px 0;">
            <a href="{SITE_URL}/dashboard" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#a855f7,#ec4899);color:#fff;text-decoration:none;border-radius:10px;font-weight:600;font-size:16px;">
              Go to Dashboard →
            </a>
          </div>
          
          <p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:30px 0 0 0;text-align:center;">
            💎 <strong style="color:#fff;">Limited Offer:</strong> Get Lifetime PRO for only <strong style="color:#ec4899;">$89</strong> - first 100 users only!
          </p>
          
        </div>
        
        <div style="text-align:center;margin-top:30px;color:#6b7280;font-size:12px;">
          <p style="margin:0 0 10px 0;">© 2025 {SITE_NAME}. All rights reserved.</p>
          <p style="margin:0;">
            <a href="{SITE_URL}/privacy" style="color:#a855f7;text-decoration:none;">Privacy</a> • 
            <a href="{SITE_URL}/terms" style="color:#a855f7;text-decoration:none;">Terms</a> • 
            <a href="{SITE_URL}/faq" style="color:#a855f7;text-decoration:none;">FAQ</a>
          </p>
        </div>
        
      </div>
    </body>
    </html>
    """


def get_admin_notification_html(user_name, user_email, signup_method='Email'):
    """Notification email for admin"""
    timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        
        <div style="background:#fff;border-radius:16px;padding:30px;border:1px solid #e5e7eb;">
          
          <div style="display:flex;align-items:center;margin-bottom:20px;">
            <div style="font-size:32px;margin-right:12px;">🎉</div>
            <h2 style="color:#111827;font-size:20px;margin:0;">New User Registration!</h2>
          </div>
          
          <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:20px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-size:14px;width:120px;">👤 Name:</td>
                <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">{user_name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-size:14px;">📧 Email:</td>
                <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">{user_email}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-size:14px;">🔐 Method:</td>
                <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">{signup_method}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-size:14px;">🕐 Time:</td>
                <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">{timestamp}</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align:center;">
            <a href="{SITE_URL}/admin" style="display:inline-block;padding:12px 28px;background:#a855f7;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Open Admin Panel →
            </a>
          </div>
          
          <p style="color:#6b7280;font-size:12px;text-align:center;margin:20px 0 0 0;">
            This is an automated notification from {SITE_NAME}.
          </p>
          
        </div>
        
      </div>
    </body>
    </html>
    """


# ============================================
# MAIN HANDLER
# ============================================
class handler(BaseHTTPRequestHandler):
    
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.end_headers()
        
        try:
            # Read POST data
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(post_data) if post_data else {}
            
            user_name = data.get('name', 'New User')
            user_email = data.get('email', '')
            signup_method = data.get('method', 'Email')
            
            if not user_email:
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': 'Email is required'
                }).encode())
                return
            
            # Get Resend API Key
            api_key = os.environ.get('RESEND_API_KEY', '')
            if not api_key:
                print('❌ RESEND_API_KEY not found')
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': 'Email service not configured'
                }).encode())
                return
            
            resend.api_key = api_key
            
            results = {
                'welcome_sent': False,
                'admin_notified': False
            }
            
            # 1. Send Welcome Email to User
            try:
                welcome_response = resend.Emails.send({
                    'from': FROM_EMAIL,
                    'to': [user_email],
                    'subject': f'Welcome to {SITE_NAME}! 🚀',
                    'html': get_welcome_email_html(user_name, user_email)
                })
                results['welcome_sent'] = True
                results['welcome_id'] = welcome_response.get('id', '')
                print(f'✅ Welcome email sent to {user_email}')
            except Exception as e:
                print(f'❌ Welcome email failed: {e}')
                results['welcome_error'] = str(e)
            
            # 2. Send Admin Notification
            try:
                admin_response = resend.Emails.send({
                    'from': FROM_EMAIL,
                    'to': ADMIN_EMAILS,
                    'subject': f'🎉 New User: {user_name} ({user_email})',
                    'html': get_admin_notification_html(user_name, user_email, signup_method)
                })
                results['admin_notified'] = True
                results['admin_id'] = admin_response.get('id', '')
                print(f'✅ Admin notified about {user_email}')
            except Exception as e:
                print(f'❌ Admin notification failed: {e}')
                results['admin_error'] = str(e)
            
            self.wfile.write(json.dumps({
                'success': True,
                'results': results
            }).encode())
        
        except Exception as e:
            print(f'❌ Handler error: {e}')
            self.wfile.write(json.dumps({
                'success': False,
                'error': str(e)
            }).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
