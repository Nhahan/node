const express = require("express");
// const routers = require("../routers");
const axios = require("axios").default;
// const http = require("http");
const cors = require("cors");
const app = express();
const signature = require("./utils/signature");
const fs = require("fs");
const http = require("http");
const https = require("https");
const options = {
    ca: fs.readFileSync("/etc/letsencrypt/live/내 도메인 네임/fullchain.pem"),
    key: fs.readFileSync("/etc/letsencrypt/live/내 도메인 네임/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/내 도메인 네임/cert.pem"),
};
http.createServer(app).listen(3000);
https.createServer(options, app).listen(443);

app.set("view engine", "hbs");

app.use(cors({ origin: true, credentials: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.listen(3005, () => {
    console.log(`Test App listening at http://54.180.125.115/:3005`);
});
// http.createServer(app).listen(3005);

module.exports = app;
