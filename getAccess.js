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
const code = "7061696a61554265496454686a615a43";
const partner_id = 1005366;
const partner_key =
    "170ddadd5bd5ae843c7ce110a883066061a12f2fa5384091edcd16d202c4a02b";
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
