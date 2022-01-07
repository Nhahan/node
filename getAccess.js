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
const code = "7658415974664b525774596c624f4748";
const partner_id = 1000639;
const partner_key =
    "90e0bd35c8a63d24052d2acb14ee4ae98e2f7a76e7428c3fa6e9da941960cac0";
const baseString = `${partner_id}${path}${timestamp}`;
const sign = createHmac("sha256", partner_key).update(baseString).digest("hex");

const params = {
    partner_id,
    sign,
    timestamp,
};

const data = {
    code,
    partner_id,
    shop_id: 37698,
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
        console.log("response", response);
    })
    .catch((error) => {
        console.error("error", error.response);
        console.log(sign);
    });

module.exports = app;
