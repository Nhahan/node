const path = require("path");
const express = require("express");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

app.set("view engine", "hbs");

app.get("", (req, res) => {
    res.render("index", {
        title: "App",
        name: "test name",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "asdasd",
    });
});

app.listen(3005, () => {
    console.log("Server is up on port 3000.");
});
