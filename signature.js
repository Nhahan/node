const { createHmac } = require("crypto");
const mongoose = require("mongoose");

// const host = "https://partner.shopeemobile.com";
const host = "https://partner.test-stable.shopeemobile.com";
const appID = 205626;
const partner_id = 1005366;

const path = "/api/v2/shop/auth_partner";

const partner_key =
    "170ddadd5bd5ae843c7ce110a883066061a12f2fa5384091edcd16d202c4a02b";

let timestamp = Math.round(Date.now() / 1000);

const baseString = `${partner_id}${path}${timestamp}`;
const redirect = "https://suml.xyz";
let sign = createHmac("sha256", partner_key).update(baseString).digest("hex"); // = calauth

let url = `${host}${path}?partner_id=${partner_id}&redirect=${redirect}&timestamp=${timestamp}&sign=${sign}`;
console.log(url);
// saveInfo();
module.exports = { host, partner_id, redirect, timestamp, sign, url, code };

function saveInfo() {
    mongoose
        .connect("mongodb://13.125.249.43:27017/admin", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ignoreUndefined: true,
            user: "test",
            pass: "test",
        })
        .catch((err) => console.log(err));

    mongoose.connection.on("error", (err) => {
        console.error("connect failed", err);
    });

    const timestampSchema = mongoose.Schema({
        timestamp: "number",
        sign: "string",
        url: "string",
    });

    const TimestampSchema = mongoose.model("Schema", timestampSchema);

    const newTimestamp = new TimestampSchema({
        timestamp: timestamp,
        sign: sign,
        url: url,
    });

    TimestampSchema.find((error, result) => {
        timestamp - result[0].timestamp > 0 &&
            console.log(
                "Current authorization url expires after:",
                300 - (timestamp - result[0].timestamp),
                "s",
            );
        if (error) {
            console.log(error);
        } else if (timestamp - result[0].timestamp >= 300) {
            TimestampSchema.findById(result[0]._id, (_, data) => {
                data.timestamp = timestamp;
                data.sign = sign;
                data.url = url;
                data.save();
            });
            console.log("Saved!");
        } else {
            timestamp = result[0].timestamp;
            sign = result[0].sign;
            url = result[0].url;
        }

        console.log("timestamp:", timestamp, "\nsign:", sign, "\nurl:", url);
    });
}
