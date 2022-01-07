import time
import json
import hmac
import hashlib
import requests

shop_id = 37872
partner_id = 1005366
partner_key = "170ddadd5bd5ae843c7ce110a883066061a12f2fa5384091edcd16d202c4a02b"

def get_access_token_shop_level(shop_id, partner_id, partner_key, refresh_token):
    timest = int(time.time())
    host = "https://partner.shopeemobile.com"
    path = "/api/v2/auth/access_token/get"
    body = {"shop_id": shop_id, "refresh_token": refresh_token}
    base_string = "%s%s%s"%(partner_id, path, timest)
    sign = hmac.new(partner_key, base_string, hashlib.sha256).hexdigest()
    url = host + path + "?partner_id=%s&timestamp=%s&sign=%s"%(partner_id, timest, sign)
    
    headers = {"Content-Type": "application/json"}
    resp = requests.post(url, json=body, headers=headers)

    ret = json.loads(resp.content)
    access_token = ret.get("access_token")
    new_refresh_token = ret.get("refresh_token")
    return access_token, new_refresh_token

def get_access_token_merchant_level(merchant_id, partner_id, partner_key, refresh_token):
    timest = int(time.time())
    host = "https://partner.shopeemobile.com"
    path = "/api/v2/auth/access_token/get"
    body = {"merchant_id": merchant_id, "refresh_token": refresh_token}
    base_string = "%s%s%s"%(partner_id, path, timest)
    sign = hmac.new(partner_key, base_string, hashlib.sha256).hexdigest()
    url = host + path + "?partner_id=%s&timestamp=%s&sign=%s"%(partner_id, timest, sign)

    headers = {"Content-Type": "application/json"}
    resp = requests.post(url, data=json, headers=headers)

    ret = json.loads(resp.content)
    access_token = ret.get("access_token")
    new_refresh_token = ret.get("refresh_token")
    return access_token, new_refresh_token