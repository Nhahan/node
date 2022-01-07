import hmac
import time
import requests
import hashlib

timest = int(time.time())
host = "https://partner.shopeemobile.com"
access_token = "random string"

partner_id = 80001
partner_id = 1005366
partner_key = "170ddadd5bd5ae843c7ce110a883066061a12f2fa5384091edcd16d202c4a02b"


#### call shop level api
shop_id = 37872
base_string = "%s%s%s%s%s"%(partner_id, path, timest, access_token, shop_id)
sign = hmac.new(partner_key, base_string, hashlib.sha256).hexdigest()
path = "/api/v2/example/shop_level/get"

url = host + path + "?partner_id=%s&shop_id=%s&timestamp=%s&access_token=%s&sign=%s"%(partner_id, shop_id, timest, access_token, sign)
headers = {"Content-Type": "application/json"}
resp = requests.post(url, headers=headers)


#### call merchant level api
merchant_id = 5234789345689512367895346789
base_string = "%s%s%s%s%s"%(partner_id, path, timest, access_token, merchant_id)
sign = hmac.new(partner_key, base_string, hashlib.sha256).hexdigest()
path = "/api/v2/example/merchant_level/get"

url = host + path + "?partner_id=%s&merchant_id=%s&timestamp=%s&access_token=%s&sign=%s"%(partner_id, merchant_id, timest, access_token, sign)
headers = {"Content-Type": "application/json"}
resp = requests.post(url, headers=headers)


#### call merchant level api
base_string = "%s%s%s%s%s"%(partner_id, path, timest, access_token)
sign = hmac.new(partner_key, base_string, hashlib.sha256).hexdigest()
path = "/api/v2/auth_merchant/access_token/get"

url = host + path + "?partner_id=%s&timestamp=%s&access_token=%s&sign=%s"%(partner_id, timest, access_token, sign)
headers = {"Content-Type": "application/json"}
resp = requests.post(url, headers=headers)