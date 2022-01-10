const axios = require("axios").default;
require("util").inspect.defaultOptions.depth = null;
const { createHmac } = require("crypto");

// const host = "https://partner.test-stable.shopeemobile.com";
const host = "https://partner.test-stable.shopeemobile.com";
const path = "/api/v2/product/get_brand_list";

const timestamp = Math.round(Date.now() / 1000);
const partner_id = 1000639;
const partner_key =
    "90e0bd35c8a63d24052d2acb14ee4ae98e2f7a76e7428c3fa6e9da941960cac0";
const access_token = "c854a0bdb3417aab51621ab0fbd6d606";
const shop_id = 37698;
const baseString = `${partner_id}${path}${timestamp}${access_token}${shop_id}`;
const sign = createHmac("sha256", partner_key).update(baseString).digest("hex");

const params = {
    partner_id,
    timestamp,
    access_token,
    shop_id,
    sign,
    offset: 1,
    language: "id",
    page_size: "3",
    category_id: 100143,
    status: "1",
};

const options = {
    method: "GET",
    url: `${host}${path}`,
    params,
};

axios
    .request(options)
    .then((response) => {
        console.log("get_order_list");
        console.log("response", response.data);
    })
    .catch((error) => {
        console.error("get_order_list error", error.response.data);
    });
