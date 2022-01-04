const path = require("path");
const express = require("express");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
    res.send("Perfect weather");
});

app.listen(3005, () => {
    console.log("Server is up on port 3000.");
});
