const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))      // перекладає

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")

});

app.post("/", function (req, res) {
    const query = req.body.CityName;   //бере дані які вказуєте у формі
    const apiKey = "2564eec02bc1982ac733449ed04224f2"
    const unit = "metric"
    const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey)

    https.get(url, function (response) {
        console.log(response.statusCode);            //показує статус
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)    //JSON.parse(data) перекладає 

            const description = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>the weather is " + description + "</h1>")
            res.write("<h1>the temperature is " + temp + "</h1>")
            res.write("<img src=" + imageURL + ">")
            res.send();
        })
    })
});










app.listen(3000, function () {
    console.log("Server start on port 3000");
});