// import { performAction } from './js/app';

// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// projectData = newEntry;

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
const port = 8082;
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
  res.send(projectData);
  console.log('Response sent')
};

// POST weather data
app.post('/add', function (req, res) {
console.log('Response:', req.body);
let newEntry = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    country: req.body.country
  }
  projectData = newEntry;
  console.log(projectData);
  res.send(projectData);
});
