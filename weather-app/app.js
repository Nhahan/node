const request = require("postman-request");

const url =
    "http://api.weatherstack.com/current?access_key=e4a2352f7c18c1a6ec8fb40cea43cca7&query=New%20York";
request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.current);
});
