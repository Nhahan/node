const { createHmac } = require("crypto");

// const host = "https://partner.shopeemobile.com";
const host = "https://partner.test-stable.shopeemobile.com";
const appID = 205626;
const partner_id = 1005366;

// const Apipath = "/api/v2/auth/token/get";
const path = "/api/v2/shop/auth_partner";

const partner_key =
    "170ddadd5bd5ae843c7ce110a883066061a12f2fa5384091edcd16d202c4a02b";

let timestamp = Math.round(Date.now() / 1000);

const baseString = `${partner_id}${path}${timestamp}`;
let sign = createHmac("sha256", partner_key).update(baseString).digest("hex");
const redirect = "https://naver.com";

const code = "https://seller.test-stable.shopee.co.id";

let url = `${host}${path}?partner_id=${partner_id}&redirect=${redirect}&timestamp=${timestamp}&sign=${sign}`;

module.exports = { host, partner_id, redirect, timestamp, sign, url, code };
