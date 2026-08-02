from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import hmac
import hashlib
from datetime import datetime


def verify_paddle_signature(payload_body, signature_header, secret):
    """
    Paddle webhook imza doğrulama
    Paddle format: ts=timestamp;h1=hash
    """
    if not signature_header or not secret:
        return False
    
    try:
        # Paddle signature format: "ts=1234567890;h1=abcdef..."
        parts = {}
        for part in signature_header.split(';'):
            key, value = part.split('=', 1)
            parts[key] = value
        
        timestamp = parts.get('ts', '')
        received_hash = parts.get('h1', '')
        
        if not timestamp or not received_hash:
            return False
        
        # Signed payload = timestamp:body
        signed_payload = f"{timestamp}:{payload_body.decode('utf-8')}"
        
        # HMAC SHA256 hesapla
        expected_hash = hmac.new(
            secret.encode('utf-8'),
            signed_payload.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        # Sabit zamanlı karşılaştırma
        return hmac.compare_digest(expected_hash, received_hash)
    except Exception as e:
        print(f"Paddle signature verification error: {e}")
        return False


def update_user_premium(user_email, premium_type='lifetime', order_id=None):
    """Kullanıcıyı premium yap"""
    try:
        supabase_url = os.environ.get('SUPABASE_URL', '')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
        
        if not supabase_url or not supabase_key:
            return {'success': False, 'error': 'Supabase config missing'}
        
        url = f"{supabase_url}/rest/v1/users?email=eq.{user_email}"
        
        # 🔒 SECURITY: Uses SERVICE_ROLE_KEY which bypasses RLS.
        
        is_lifetime = (premium_type == 'lifetime')
        
        update_data = {
            'is_premium': True,
            'is_pro': True,
            'lifetime': is_lifetime,
            'premium_type': premium_type,
            'premium_since': datetime.utcnow().isoformat() + 'Z',
            'paddle_customer_id': str(order_id) if order_id else None
        }
        
        payload = json.dumps(update_data).encode('utf-8')
        
        req = urllib.request.Request(url, data=payload, method='PATCH')
        req.add_header('apikey', supabase_key)
        req.add_header('Authorization', f'Bearer {supabase_key}')
        req.add_header('Content-Type', 'application/json')
        req.add_header('Prefer', 'return=minimal')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            print(f"✅ User upgraded to premium: {user_email} ({premium_type})")
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
            'is_pro': False,
            'lifetime': False,
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
            print(f"✅ Premium removed: {user_email}")
            return {'success': True}
    
    except Exception as e:
        print(f"Remove premium error: {e}")
        return {'success': False, 'error': str(e)}


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Paddle webhook endpoint"""
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            
            if content_length == 0:
                self._send_response(400, {'error': 'Empty body'})
                return
            
            raw_body = self.rfile.read(content_length)
            
            # Signature verification
            webhook_secret = os.environ.get('PADDLE_WEBHOOK_SECRET', '')
            signature = self.headers.get('Paddle-Signature', '')
            
            if webhook_secret:
                if not verify_paddle_signature(raw_body, signature, webhook_secret):
                    print(f"⚠️ Invalid Paddle signature received")
                    self._send_response(401, {'error': 'Invalid signature'})
                    return
            
            # Parse JSON
            try:
                data = json.loads(raw_body.decode('utf-8'))
            except json.JSONDecodeError:
                self._send_response(400, {'error': 'Invalid JSON'})
                return
            
            # Paddle event structure
            event_type = data.get('event_type', '')
            event_data = data.get('data', {})
            
            print(f"📥 Paddle webhook received: {event_type}")
            
            # ============================================
            # EVENT: transaction.completed (Yeni satış)
            # ============================================
            if event_type == 'transaction.completed':
                # Paddle transaction data
                customer = event_data.get('customer', {})
                customer_email = customer.get('email', '')
                
                # Alternatif: customer_email direkt data içinde olabilir
                if not customer_email:
                    customer_email = event_data.get('customer_email', '')
                
                transaction_id = event_data.get('id', '')
                
                # Items (birden fazla ürün olabilir)
                items = event_data.get('items', [])
                product_name = 'Lifetime Pro'  # default
                
                if items:
                    first_item = items[0]
                    price = first_item.get('price', {})
                    product = price.get('product', {})
                    product_name = product.get('name', 'Lifetime Pro')
                
                # Totals
                details = event_data.get('details', {})
                totals = details.get('totals', {})
                
                # Paddle amounts are in minor units (cents)
                total_str = totals.get('total', '0')
                total = float(total_str) / 100 if total_str else 0
                
                currency = totals.get('currency_code', 'USD')
                
                if not customer_email:
                    print(f"⚠️ No email in webhook, skipping")
                    self._send_response(400, {'error': 'No email in webhook'})
                    return
                
                print(f"💰 New Paddle order: {customer_email} - {total} {currency}")
                
                # 1. Kullanıcıyı premium yap
                update_result = update_user_premium(
                    user_email=customer_email,
                    premium_type='lifetime',
                    order_id=transaction_id
                )
                
                # 2. Satışı kaydet
                sale_result = record_sale(
                    email=customer_email,
                    amount=total,
                    product_name=product_name,
                    order_id=transaction_id,
                    currency=currency
                )
                
                self._send_response(200, {
                    'success': True,
                    'event': event_type,
                    'user_updated': update_result.get('success'),
                    'sale_recorded': sale_result.get('success')
                })
                return
            
            # ============================================
            # EVENT: adjustment.created (İade)
            # ============================================
            elif event_type == 'adjustment.created':
                action = event_data.get('action', '')
                
                if action == 'refund':
                    customer = event_data.get('customer', {})
                    customer_email = customer.get('email', '')
                    
                    if not customer_email:
                        customer_email = event_data.get('customer_email', '')
                    
                    if customer_email:
                        print(f"🔄 Refund: {customer_email}")
                        remove_user_premium(customer_email)
                
                self._send_response(200, {'success': True, 'event': event_type})
                return
            
            # ============================================
            # EVENT: subscription.created/activated (Abonelik)
            # ============================================
            elif event_type in ['subscription.created', 'subscription.activated']:
                customer = event_data.get('customer', {})
                customer_email = customer.get('email', '')
                
                if not customer_email:
                    customer_email = event_data.get('customer_email', '')
                
                subscription_id = event_data.get('id', '')
                status = event_data.get('status', '')
                
                if customer_email and status == 'active':
                    update_user_premium(
                        user_email=customer_email,
                        premium_type='pro',
                        order_id=subscription_id
                    )
                
                self._send_response(200, {'success': True, 'event': event_type})
                return
            
            # ============================================
            # EVENT: subscription.canceled
            # ============================================
            elif event_type == 'subscription.canceled':
                customer = event_data.get('customer', {})
                customer_email = customer.get('email', '')
                
                if not customer_email:
                    customer_email = event_data.get('customer_email', '')
                
                if customer_email:
                    remove_user_premium(customer_email)
                
                self._send_response(200, {'success': True, 'event': event_type})
                return
            
            # Bilinmeyen event
            else:
                self._send_response(200, {
                    'success': True,
                    'event': event_type,
                    'message': 'Event acknowledged but not processed'
                })
                return
        
        except Exception as e:
            print(f"❌ Paddle webhook error: {e}")
            self._send_response(500, {'error': str(e)})
    
    def do_GET(self):
        """Health check endpoint"""
        webhook_secret = os.environ.get('PADDLE_WEBHOOK_SECRET', '')
        api_key = os.environ.get('PADDLE_API_KEY', '')
        
        self._send_response(200, {
            'status': 'ok',
            'service': 'NICHIFY Paddle Webhook',
            'has_webhook_secret': bool(webhook_secret),
            'has_api_key': bool(api_key),
            'endpoint': '/api/paddle',
            'method': 'POST',
            'message': 'Send POST requests from Paddle webhooks here'
        })
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Paddle-Signature')
        self.end_headers()
    
    def _send_response(self, status_code, data):
        """Helper to send JSON response"""
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
