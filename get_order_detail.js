const axios = require("axios").default;
const { createHmac } = require("crypto");

const host = "https://partner.test-stable.shopeemobile.com";
const path = "/api/v2/order/get_order_detail";

const timestamp = Math.round(Date.now() / 1000);
const partner_id = 1000639;
const partner_key =
    "90e0bd35c8a63d24052d2acb14ee4ae98e2f7a76e7428c3fa6e9da941960cac0";
const baseString = `${partner_id}${path}${timestamp}`;
const sign = createHmac("sha256", partner_key).update(baseString).digest("hex");
const shop_id = 37698;
const access_token = "230d605ce3296648568fe64464e0c320";

const params = {
    partner_id,
    timestamp,
    access_token,
    shop_id,
    sign,
};
const data = {
    oder_sn_list: ["220110DYQX6AH5"],
};
const options = {
    method: "GET",
    url: `${host}${path}`,
    params,
    data,
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
