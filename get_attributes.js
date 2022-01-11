const axios = require("axios").default;
require("util").inspect.defaultOptions.depth = null;
const { createHmac } = require("crypto");

// const host = "https://partner.test-stable.shopeemobile.com";
const host = "https://partner.test-stable.shopeemobile.com";
const path = "/api/v2/product/get_attributes";

const timestamp = Math.round(Date.now() / 1000);
const partner_id = 1000639;
const partner_key =
    "90e0bd35c8a63d24052d2acb14ee4ae98e2f7a76e7428c3fa6e9da941960cac0";
const access_token = "4975727363526d4e4f6b6d5152444b62";
const shop_id = 37698;
const baseString = `${partner_id}${path}${timestamp}${access_token}${shop_id}`;
const sign = createHmac("sha256", partner_key).update(baseString).digest("hex");

const params = {
    language: "id",
    timestamp,
    partner_id,
    access_token,
    shop_id,
    sign,
    language: "id",
    category_id: 100143,
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
