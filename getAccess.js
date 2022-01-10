const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
const app = express();
const { createHmac } = require("crypto");

const fs = require("fs");
const http = require("http");
const https = require("https");
http.createServer(app).listen(3000);
// const optionHttps = {
//     ca: fs.readFileSync("/etc/letsencrypt/live/suml.xyz/fullchain.pem"),
//     key: fs.readFileSync("/etc/letsencrypt/live/suml.xyz/privkey.pem"),
//     cert: fs.readFileSync("/etc/letsencrypt/live/suml.xyz/cert.pem"),
// };
// https.createServer(optionHttps, app).listen(443);
const host = "https://partner.test-stable.shopeemobile.com";
const path = "/api/v2/auth/token/get";

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const timestamp = Math.round(Date.now() / 1000);
// const timestamp = 1641527426;
const code = "6e596567485a635a7244616f4f745762";
const partner_id = 1000639;
const partner_key =
    "90e0bd35c8a63d24052d2acb14ee4ae98e2f7a76e7428c3fa6e9da941960cac0";
const baseString = `${partner_id}${path}${timestamp}`;
const sign = createHmac("sha256", partner_key).update(baseString).digest("hex");
const shop_id = 37698;

const params = {
    partner_id,
    sign,
    timestamp,
};
const data = {
    code,
    partner_id,
    shop_id,
};
const options = {
    method: "POST",
    url: `${host}${path}`,
    params,
    data,
};
axios
    .request(options)
    .then((response) => {
        console.log("response", response.data);
    })
    .catch((error) => {
        console.error("generate error", error.response);
    });

module.exports = app;

// response {
//     access_token: '6e6671794c5761576367584858435972',
//     error: '',
//     request_id: '2d1bf5c38b03a86cd00c5936ea296875',
//     message: '',
//     expire_in: 14379,
//     refresh_token: '4548694e5a786353766d554a6d636f42'
