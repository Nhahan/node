const axios = require("axios").default;
require("util").inspect.defaultOptions.depth = null;
const { createHmac } = require("crypto");

const host = "https://partner.test-stable.shopeemobile.com";
const path = "/api/v2/product/add_item";

const timestamp = Math.round(Date.now() / 1000);
const partner_id = 1000639;
const partner_key =
    "90e0bd35c8a63d24052d2acb14ee4ae98e2f7a76e7428c3fa6e9da941960cac0";
const access_token = "4c6467554c6d796f7a4e69466f766a6f";
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

const data = {
    original_price: 555.5, // float
    description: "This item is good!",
    weight: 1, // float
    item_name: "Good Item",
    // item_status, // UNLIST, NORMAL
    // dimension, // { "package_height": 11, "package_length": 11, "package_width": 11 }
    normal_stock: 33,
    logistic_info: [
        {
            size_id: 0,
            shipping_fee: 23.12,
            enabled: true,
            logistic_id: "J&T",
            is_free: false,
        },
    ],
    attribute_list: [
        {
            attribute_id: 100010,
            attribute_value_list: [
                {
                    value_id: 32142,
                    original_value_name: "Brand",
                    // value_unit: "5kg",
                },
            ],
        },
    ],
    category_id: 100143,
    image: {
        image_id_list: ["asd.com"],
    },
    // pre_order: {
    //     "is_pre_order": false,
    //     "days_to_ship": 3
    // },
    // item_sku,
    // condition,
    // wholesale: [
    //     {
    //         min_count: 1,
    //         max_count: 100,
    //         unit_price: 28.3,
    //     },
    // ],
    // video_upload_id,
    brand: {
        brand_id: 0,
        original_brand_name: "nobrand",
    },
    // item_dangerous: 0,
    // tax_info: {
    //     invoice_option: "",
    //     vat_rate: "",
    //     hs_code: "1234",
    //     tax_code: "",
    // },
    // complaint_policy: {
    //     warranty_time: "",
    //     exclude_entrepreneur_warranty: "",
    //     complaint_address_id: 0,
    //     additional_information: "",
    // },
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
        console.log("response", response.data);
    })
    .catch((error) => {
        console.error("error", error.response.data);
    });
