const express = require("express");
const routers = require("../routers");
const axios = require("axios").default;
const http = require("http");
const cors = require("cors");
const app = express();
const signature = require("./utils/signature");

app.use(cors({ origin: true, credentials: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

app.use(routers);

const path = "/api/v2/auth/token/get";

const params = {
    shop_id: 37698,
    code: signature.code,
    partner_id: signature.partner_id,
    sign: signature.sign,
    timestamp: signature.timestamp,
};
const options = {
    method: "GET",
    url: `${signature.host}${path}`,
    params,
};

// axios
//     .request(options)
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.error(error);
//     });

http.createServer(app).listen(3005);

module.exports = app;
