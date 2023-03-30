// require the express module
// require the bodyparser module to get the data in the body during http request
const express = require("express");
const bodyParser = require("body-parser");
const https = require('node:https');

const app = express();

let city = "Colombo"
// to let the app use ejs as the view engine
app.set("view engine", "ejs");

// this is default way to use the bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// to tell the app to serve the static files too
app.use(express.static("public"));

app.get("/",function(req,res){
    const time = Date().slice(16,21);
    const api = "6616702e09caa6054f5da682dce4c303";
    let tempUnit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+ api+"&units="+tempUnit;
    https.get(url, function(response){
        response.on("data",function(d){
            var weather_data = JSON.parse(d);
            let iconSrc = "http://openweathermap.org/img/wn/"+weather_data.weather[0].icon+"@2x.png"
            res.render("index.ejs",{cityName:city,temperature:weather_data.main.temp.toFixed(1),description:weather_data.weather[0].main,windSpeed:weather_data.wind.speed,humidity:weather_data.main.humidity,pressure:weather_data.main.pressure,icon:iconSrc,currentTime:time})
        })
    })
});
app.post("/",function(req,res){
    console.log(req.body.cityName)
    city = req.body.cityName;
    res.redirect("/");
})

app.listen(8000 ,function(){
    console.log("Server is up and running on port 3000")
});



//keep all the ejs files in the folder called views
//keep all your css and plain js and images in the public folder