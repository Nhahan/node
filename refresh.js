const express = require("express");
const axios = require("axios").default;
const { createHmac } = require("crypto");

// const refresh_token = "4548694e5a786353766d554a6d636f42";
const refresh_token = "29dadab442aa8e522e86899bf91891db";
const path = "/api/v2/auth/access_token/get";

const host = "https://partner.test-stable.shopeemobile.com";
const timestamp = Math.round(Date.now() / 1000);
const partner_id = 1000639;
const partner_key =
    "90e0bd35c8a63d24052d2acb14ee4ae98e2f7a76e7428c3fa6e9da941960cac0";
const baseString = `${partner_id}${path}${timestamp}`;
const sign = createHmac("sha256", partner_key).update(baseString).digest("hex");
const shop_id = 37872;

const params = {
    partner_id,
    sign,
    timestamp,
};
const data = {
    refresh_token,
    partner_id,
    shop_id,
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
        console.log("RefreshAccessToken");
        console.log("response", response.data);
    })
    .catch((error) => {
        console.error("refresh error", error.response.data);
    });
