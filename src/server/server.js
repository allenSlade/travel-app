// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let weatherData = {};
let pixabayData = {};
let countryData = {};
// projectData = newEntry;
const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware */
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8081;
const server = app.listen(port, listening);
function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
};

/* Routes */

// getGeonamesData GET route
app.get('/geoData', sendData);
function sendData (req, res) {
  res.send(projectData);
  console.log('Response sent', projectData)
};

// getWeatherBitData GET route
app.get('/wetData', assignData);
function assignData (req, res) {
  res.send(weatherData);
  console.log('Response sent', weatherData)
};

// getPixabayData GET route
app.get('/pixaData', grabData);
function grabData (req, res) {
  res.send(pixabayData);
  console.log('Response sent', pixabayData)
};

// getCountryData GET route
app.get('/countryData', getData);
function getData (req, res) {
  res.send(countryData);
  console.log('Response sent', pixabayData)
};


// POST Geonames data
app.post('/add', function (req, res) {
console.log('Response:', req.body);
let newEntry = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    country: req.body.country,
    date: req.body.date
  }
  projectData = newEntry;
  console.log('projectData', projectData);
  res.send(projectData);
});

// POST WeatherBit data
app.post('/update', function (req, res) {
console.log('Response:', req.body);
let nuvoEntry = {
    highTemp: req.body.highTemp,
    lowTemp: req.body.lowTemp,
    clouds: req.body.clouds,
    precip: req.body.precip,
    pres: req.body.pres,
    snow: req.body.snow,
    vis: req.body.vis,
    weather: req.body.weather,
    weatherCode: req.body.weatherCode,
    weatherDesc: req.body.weatherDesc,
    weatherIcon: req.body.weatherIcon,
    windDir: req.body.windDir,
    windSpeed: req.body.windSpeed
  }
  weatherData = nuvoEntry;
  console.log('weatherData', weatherData);
  res.send(weatherData);
});

// POST Pixabay data
app.post('/insert', function (req, res) {
console.log('Response:', req.body);
let newEntry = {
    webformatURL: req.body.webformatURL
  }
  pixabayData = newEntry;
  console.log('pixabayData', pixabayData);
  res.send(pixabayData);
});

// POST Country data
app.post('/country', function (req, res) {
console.log('Response:', req.body);
let newEntry = {
    flag: req.body.flag,
    capital: req.body.capital,
    currencies: req.body.currencies,
    languages: req.body.languages,
    population: req.body.population,
    region: req.body.region,
    timezones: req.body.timezones
  }
  countryData = newEntry;
  console.log('pixabayData', countryData);
  res.send(countryData);
});
