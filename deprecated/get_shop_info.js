const axios = require("axios").default;
require("util").inspect.defaultOptions.depth = null;
const { createHmac } = require("crypto");

const host = "https://partner.test-stable.shopeemobile.com";
const path = "/api/v2/shop/get_shop_info";

const timestamp = Math.round(Date.now() / 1000);
const partner_id = 1000639;
const partner_key =
    "90e0bd35c8a63d24052d2acb14ee4ae98e2f7a76e7428c3fa6e9da941960cac0";
const access_token = "6b555742434f724f4164555377637959";
const shop_id = 37698;
const baseString = `${partner_id}${path}${timestamp}${access_token}${shop_id}`;
const sign = createHmac("sha256", partner_key).update(baseString).digest("hex");

const params = {
    partner_id,
    timestamp,
    access_token,
    shop_id,
    sign,
};

const options = {
    method: "GET",
    url: `${host}${path}`,
    params,
};

axios
    .request(options)
    .then((response) => {
        console.log("status", response.status);
        console.log("headers", response.headers);
        console.log("response", response.data);
    })
    .catch((error) => {
        console.error("error", error.response.data);
    });
