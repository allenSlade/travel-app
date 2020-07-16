// Setup empty JS object to act as endpoint for all routes
const projectData = {};

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
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
};

/* Routes */
// const data = [];

// GET route
app.get('/all', sendData);
function sendData (req, res) {
  res.send(data);
  console.log('Response sent')
};

// POST route

// app.post(baseURL + apiKey, addData);
// function addData (req, res) {
//   data.push(req.body);
//   console.log(req.body);
// };

// POST weather data
app.post('/add', addWeather); //lesson chaining promises
function addWeather(req,res) {
  console.log(req.body);
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  }
  projectData.push(newEntry);
  console.log(projectData);
};
