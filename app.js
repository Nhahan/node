const express = require("express");
const cors = require("cors");
const app = express();
const signature = require("./signature");

const fs = require("fs");
const http = require("http");
const https = require("https");
http.createServer(app).listen(3000);
const optionHttps = {
    ca: fs.readFileSync("/etc/letsencrypt/live/suml.xyz/fullchain.pem"),
    key: fs.readFileSync("/etc/letsencrypt/live/suml.xyz/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/suml.xyz/cert.pem"),
};
https.createServer(optionHttps, app).listen(443);

app.set("view engine", "hbs");

app.use(cors({ origin: true, credentials: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const params = {
    code: signature.code,
    partner_id: signature.partner_id,
    sign: signature.sign,
    timestamp: signature.timestamp,
    shop_id: 37872,
};

app.get("/", (req, res) => {
    res.render("index", params);
});
app.get("/about", (req, res) => {
    res.render("about", params);
});
app.post("/test", (req, res) => {
    console.log("res:", res.body);
    console.log("req:", req.body);
    console.log("header", req.headers.authorization);
});

module.exports = app;
