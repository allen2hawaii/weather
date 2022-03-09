const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the zip from the html form, display in // console. Takes in as string, ex. for zip 02139
        var cityID = String(req.body.latInput)
        console.log(req.body.cityInput);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "d1e66fd78c9b675a43f105f9d956a93c";
        const url = "https://api.openweathermap.org/data/2.5/weather?city=" + cityID +  "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.temperature.value;
      
            const humidity = weatherData.humidity.unit;
            const windSpeed = weatherData.wind.speed.value;
            
            
            
            const city = weatherData.city.name;
            
            
            
            const windDirection = weatherData.wind.direction.value;
            const cloudiness = weatherData.clouds.value;
            
            
            
            
            // displays the output of the results
            res.write("<h1>City: "+ city);
            res.write("<h2>Temperature: " + temp.toFixed(1) + " Degrees Fahrenheit");
            res.write("<h4>Humidity: " + humidity + "%");
            res.write("<h4>Wind Speed: " + windSpeed.toFixed(1) + " miles/hour");
            res.write("<h4>Wind Gust: " + windDirection);
            res.write("<h4>Cloudiness: " + Cloudiness + "%");
            
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
