const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {

  var lat = String(req.body.latInput);
  var lon = String(req.body.lonInput);
  console.log(lat, lon);
  
  const units = "imperial";
  const apiKey = "d1e66fd78c9b675a43f105f9d956a93c";
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&APPID=" + apiKey;

  https.get(url, function(response){
    console.log(response.statusCode);
        
        
  response.on("data", function(data){
    
    const weatherData = JSON.parse(data);
    const coord = weatherData.coord;
    const city = weatherData.name;
    const weatherDescription = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const cloudiness = weatherData.clouds.all;
    
    res.write("<h1>The coordinates (" + lat + ", " + lon + "),  is for the city of " + city + "." );
    res.write("<h2>The weather in " + city + " is " + weatherDescription + ".");
    res.write("<h2>Temperature: " + temp.toFixed(1) + " Degrees Fahrenheit");
    res.write("<img src=" + imageURL + ">");
    res.write("<h4>Humidity: " + humidity + "%");
    res.write("<h4>Wind Speed: " + windSpeed.toFixed(1) + " miles/hour");
    res.write("<h4>Cloudiness: " + cloudiness + "%");

       });
   });
})


app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
    

        
       
    
    
        
    
    
    

            
            
            
            
            
            
           
     
