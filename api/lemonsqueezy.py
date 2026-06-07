from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import hmac
import hashlib
from datetime import datetime


def verify_signature(payload_body, signature_header, secret):
    """LemonSqueezy webhook imza doğrulama"""
    if not signature_header:
        return False
    
    try:
        # HMAC SHA256 hesapla
        expected_signature = hmac.new(
            secret.encode('utf-8'),
            payload_body,
            hashlib.sha256
        ).hexdigest()
        
        # Sabit zamanlı karşılaştırma (timing attack koruması)
        return hmac.compare_digest(expected_signature, signature_header)
    except Exception as e:
        print(f"Signature verification error: {e}")
        return False


def update_user_premium(user_email, premium_type='lifetime', order_id=None):
    """Kullanıcıyı premium yap"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return {'success': False, 'error': 'Supabase config missing'}
        
        # Kullanıcıyı email ile bul ve güncelle
        url = f"{supabase_url}/rest/v1/users?email=eq.{user_email}"
        
        update_data = {
            'is_premium': True,
            'premium_type': premium_type,
            'premium_since': datetime.utcnow().isoformat() + 'Z',
            'lemonsqueezy_customer_id': str(order_id) if order_id else None
        }
        
        payload = json.dumps(update_data).encode('utf-8')
        
        req = urllib.request.Request(url, data=payload, method='PATCH')
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        req.add_header('Content-Type', 'application/json')
        req.add_header('Prefer', 'return=minimal')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            return {'success': True, 'status': response.status}
    
    except Exception as e:
        print(f"Update user error: {e}")
        return {'success': False, 'error': str(e)}


def record_sale(email, amount, product_name, order_id, currency='USD'):
    """Satışı sales tablosuna kaydet"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return {'success': False, 'error': 'Supabase config missing'}
        
        url = f"{supabase_url}/rest/v1/sales"
        
        sale_data = {
            'email': email,
            'amount': float(amount),
            'currency': currency,
            'product_name': product_name,
            'order_id': str(order_id),
            'status': 'completed',
            'created_at': datetime.utcnow().isoformat() + 'Z'
        }
        
        payload = json.dumps(sale_data).encode('utf-8')
        
        req = urllib.request.Request(url, data=payload, method='POST')
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        req.add_header('Content-Type', 'application/json')
        req.add_header('Prefer', 'return=minimal')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            return {'success': True}
    
    except Exception as e:
        print(f"Record sale error: {e}")
        return {'success': False, 'error': str(e)}


def remove_user_premium(user_email):
    """Premium üyeliği kaldır (iade durumunda)"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return {'success': False}
        
        url = f"{supabase_url}/rest/v1/users?email=eq.{user_email}"
        
        update_data = {
            'is_premium': False,
            'premium_type': None,
            'premium_since': None
        }
        
        payload = json.dumps(update_data).encode('utf-8')
        
        req = urllib.request.Request(url, data=payload, method='PATCH')
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        req.add_header('Content-Type', 'application/json')
        req.add_header('Prefer', 'return=minimal')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            return {'success': True}
    
    except Exception as e:
        print(f"Remove premium error: {e}")
        return {'success': False, 'error': str(e)}


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """LemonSqueezy webhook endpoint"""
        try:
            # Content length
            content_length = int(self.headers.get('Content-Length', 0))
            
            if content_length == 0:
                self._send_response(400, {'error': 'Empty body'})
                return
            
            # Raw body (signature için)
            raw_body = self.rfile.read(content_length)
            
            # Signature verification
            webhook_secret = os.environ.get('LEMONSQUEEZY_WEBHOOK_SECRET', '')
            signature = self.headers.get('X-Signature', '')
            
            if webhook_secret:
                if not verify_signature(raw_body, signature, webhook_secret):
                    print(f"⚠️ Invalid signature received")
                    self._send_response(401, {'error': 'Invalid signature'})
                    return
            
            # Parse JSON
            try:
                data = json.loads(raw_body.decode('utf-8'))
            except json.JSONDecodeError:
                self._send_response(400, {'error': 'Invalid JSON'})
                return
            
            # Event type
            meta = data.get('meta', {})
            event_name = meta.get('event_name', '')
            
            # Data attributes
            event_data = data.get('data', {})
            attributes = event_data.get('attributes', {})
            
            print(f"📥 LemonSqueezy webhook received: {event_name}")
            
            # ============================================
            # EVENT: order_created (Yeni satış)
            # ============================================
            if event_name == 'order_created':
                customer_email = attributes.get('user_email', '')
                order_id = event_data.get('id', '')
                total = attributes.get('total', 0) / 100  # cents to dollars
                currency = attributes.get('currency', 'USD')
                product_name = attributes.get('first_order_item', {}).get('product_name', 'Lifetime Pro')
                
                if not customer_email:
                    self._send_response(400, {'error': 'No email in webhook'})
                    return
                
                print(f"💰 New order: {customer_email} - ${total} {currency}")
                
                # 1. Kullanıcıyı premium yap
                update_result = update_user_premium(
                    user_email=customer_email,
                    premium_type='lifetime',
                    order_id=order_id
                )
                
                # 2. Satışı kaydet
                sale_result = record_sale(
                    email=customer_email,
                    amount=total,
                    product_name=product_name,
                    order_id=order_id,
                    currency=currency
                )
                
                self._send_response(200, {
                    'success': True,
                    'event': event_name,
                    'user_updated': update_result.get('success'),
                    'sale_recorded': sale_result.get('success')
                })
                return
            
            # ============================================
            # EVENT: order_refunded (İade)
            # ============================================
            elif event_name == 'order_refunded':
                customer_email = attributes.get('user_email', '')
                
                if customer_email:
                    print(f"🔄 Refund: {customer_email}")
                    remove_user_premium(customer_email)
                
                self._send_response(200, {'success': True, 'event': event_name})
                return
            
            # ============================================
            # EVENT: subscription_created/updated
            # ============================================
            elif event_name in ['subscription_created', 'subscription_updated']:
                customer_email = attributes.get('user_email', '')
                order_id = event_data.get('id', '')
                status = attributes.get('status', '')
                
                if customer_email and status == 'active':
                    update_user_premium(
                        user_email=customer_email,
                        premium_type='pro',
                        order_id=order_id
                    )
                
                self._send_response(200, {'success': True, 'event': event_name})
                return
            
            # ============================================
            # EVENT: subscription_cancelled
            # ============================================
            elif event_name == 'subscription_cancelled':
                customer_email = attributes.get('user_email', '')
                
                if customer_email:
                    remove_user_premium(customer_email)
                
                self._send_response(200, {'success': True, 'event': event_name})
                return
            
            # Bilinmeyen event
            else:
                self._send_response(200, {
                    'success': True,
                    'event': event_name,
                    'message': 'Event acknowledged but not processed'
                })
                return
        
        except Exception as e:
            print(f"❌ Webhook error: {e}")
            self._send_response(500, {'error': str(e)})
    
    def do_GET(self):
        """Health check endpoint"""
        webhook_secret = os.environ.get('LEMONSQUEEZY_WEBHOOK_SECRET', '')
        api_key = os.environ.get('LEMONSQUEEZY_API_KEY', '')
        
        self._send_response(200, {
            'status': 'ok',
            'service': 'NICHIFY LemonSqueezy Webhook',
            'has_webhook_secret': bool(webhook_secret),
            'has_api_key': bool(api_key),
            'endpoint': '/api/lemonsqueezy',
            'method': 'POST',
            'message': 'Send POST requests from LemonSqueezy webhooks here'
        })
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Signature')
        self.end_headers()
    
    def _send_response(self, status_code, data):
        """Helper to send JSON response"""
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
