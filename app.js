const express = require("express");
// const routers = require("../routers");
const axios = require("axios").default;
const cors = require("cors");
const app = express();
const signature = require("./signature");

const fs = require("fs");
const http = require("http");
const https = require("https");
const optionHttps = {
    ca: fs.readFileSync("/etc/letsencrypt/live/nahan.shop/fullchain.pem"),
    key: fs.readFileSync("/etc/letsencrypt/live/nahan.shop/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/nahan.shop/cert.pem"),
};
http.createServer(app).listen(3005);
https.createServer(optionHttps, app).listen(443);

app.set("view engine", "hbs");

app.use(cors({ origin: true, credentials: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const authorization = "69829c2321fa4fea1deea8d55b718e1d7804b356db49016b2163345275177eae";

const params = {
    shop_id: "748211e597685173da3e",
    code: signature.code,
    partner_id: signature.partner_id,
    // partner_id: "748211e597685173da3e",
    sign: signature.sign,
    timestamp: signature.timestamp,
};

app.get("/", (req, res) => {
    res.render("index", params);
});
app.get("/about", (req, res) => {
    res.render("about", params);
});

// app.use(routers);

const path = "/api/v2/auth/token/get";

const options = {
    method: "POST",
    url: `${signature.host}${path}`,
    params,
};

// axios
//     .request(options)
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// app.listen(3005, () => {
//     console.log(`Test App listening at http://54.180.125.115/:3005`);
// });
// http.createServer(app).listen(3005);

module.exports = app;
