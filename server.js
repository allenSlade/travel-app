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
  res.send(projectData);
  console.log('Response sent')
};

// POST route

// app.post(baseURL + apiKey, addData);
// function addData (req, res) {
//   data.push(req.body);
//   console.log(req.body);
// };

// POST weather data
app.post('/add', function (req, res) {
console.log('Response:', res.body);
projectData = {
    date: res.body.date,
    temp: res.body.temp,
    content: res.body.content
  }
  // newEntry.push(projectData);
  console.log(projectData);
});
