const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {

  const lat = String(req.body.latInput);
  const lon = String(req.body.lonInput);
  console.log(lat, lon);
  
  let units = "imperial";
  let apiKey = "d1e66fd78c9b675a43f105f9d956a93c";
  let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&APPID=" + apiKey;

  https.get(url, function(response){
    console.log(response.statusCode);
        
        
    response.on("data", function(data){
    
    const weatherData = JSON.parse(data);
    const coord = weatherData.coord;
    const city = weatherData.name;
    const weatherDescription = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const cloudiness = weatherData.clouds.all;
    let imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    
    res.write(`<h1>The coordinates (${lat}, ${lon}),  is the city of ${city}.`);
    res.write(`<h2>The weather in ${city} is ${weatherDescription}.`);
    res.write(`<h2>Temperature: ${temp.toFixed(1)}°F`);
    res.write("<img src=" + imageURL + ">");
    res.write(`<h3>Humidity: ${humidity}%`);
    res.write(`<h3>Windspeed: ${windSpeed.toFixed(0)} mph`);
    res.write(`<h3>Cloudiness: ${cloudiness}%`);

       });
   });
})

let port = 3000;
app.listen(process.env.PORT || port, function() {
  console.log (`Server is running on port ${port}! `)
});