const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const signature = require("./signature");

const fs = require("fs");
const http = require("http");
const https = require("https");
http.createServer(app).listen(3000);
// const optionHttps = {
//     ca: fs.readFileSync("/etc/letsencrypt/live/suml.xyz/fullchain.pem"),
//     key: fs.readFileSync("/etc/letsencrypt/live/suml.xyz/privkey.pem"),
//     cert: fs.readFileSync("/etc/letsencrypt/live/suml.xyz/cert.pem"),
// };
// console.log("https server");
// https.createServer(optionHttps, app).listen(443);

app.set("view engine", "hbs");

app.use(cors({ origin: true, credentials: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const params = {
    partner_id: signature.partner_id,
    sign: signature.sign,
    timestamp: signature.timestamp,
};

// const data = {
//     code: signature.code,
//     partner_id: signature.partner_id,
//     shop_id: 37698,
// };

// const path = "/api/v2/auth/token/get";

// const options = {
//     method: "POST",
//     url: `${signature.host}${path}`,
//     params,
//     data,
// };

// axios
//     .request(options)
//     .then((response) => {
//         console.log("response", response);
//     })
//     .catch((error) => {
//         // console.error("error", error.response.request);
//     });

app.get("/", (req, res) => {
    res.render("index", params);
});
app.get("/about", (req, res) => {
    res.render("about", params);
});
app.post("/test", (req, res) => {
    console.log("headers", req.headers);
    console.log("body", req.body);

    res.send("");
});

function verify(url, code) {
    const baseString = `www.suml.xyz/test{"shop_id":${shop_id},"code":${code},"succeess"${partner_id}${path}${timestamp}${access_token}`;
    const sign = createHmac("sha256", partner_key)
        .update(baseString)
        .digest("hex");
}

module.exports = app;
