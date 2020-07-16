/* Global Variables */
let baseURL = 'api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=';
const apiKey = '67e0e2fd1434dd8ac6ff3ac66554b091';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener for genrate button
document.getElementById('generate').addEventListener('click', performAction);

// API Call
function performAction() {
  // Target input id = 'zip'
  const zip = document.getElementById('zip').value;
  console.log(zip);
  // Target textarea id = 'feelings'
  const feelings = document.getElementById('feelings').value;
  console.log(feelings);

  getWeatherData(baseURL, apiKey)
  .then(function(data) {
    console.log(data);
    //Add data to POST request
    postData('/add', {
      date: data.date,
      temp: data.temp,
      content: content});
  })
  .then(
    updateUI()
  )
};

// Async GET
const getWeatherData = async (baseURL, apiKey) => {
  const res = await fetch('/all');
  try {
    //Transform to JSON
    const data = await res.json();
    console.log(data);
    return data;
  } catch(error) {
    console.log('error', error);
    //handle error
  }
};

// Async POST
const postData = async ( url = '', data = {})=>{
    console.log(data);

      const response = await fetch( baseURL + apiKey, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch(error) {
      console.log("error", error)
      }
  };

// Update UI with promise
const updateUI = async() => {
  const req = await fetch(baseURL + apiKey);
  try {
    const allData = await req.json();
    document.getElementById('temp').innerHTML = allData[0].zip;
    document.getElementById('content').innerHTML = allData[0].feelings;
    document.getElementById('date').innerHTML = allData[0].newDate;
  } catch(error) {
    console.log('error', error)
  }
};
