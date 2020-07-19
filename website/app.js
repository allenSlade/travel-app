/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&APPID=67e0e2fd1434dd8ac6ff3ac66554b091';
let finalURL = baseURL + zip + apiKey;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener for genrate button
document.getElementById('generate').addEventListener('click', getWeather);

// API Call
// function performAction() {
// // Target input id = 'zip'
// const zip = document.getElementById('zip').value;
// // Target textarea id = 'feelings'
// const feelings = document.getElementById('feelings').value;
// // Target temp id = 'temp'
// let temp = document.getElementById('temp').value;
// console.log(temp);
//
//   getWeatherData(finalURL)
//   .then(function(data) {
//     console.log(data);
//     //Add data to POST request
//     postData('/add', {
//       date: newDate,
//       temp: data.temp,
//       content: feelings});
//   })
//   .then(function() {
//     updateUI()
//   )}
// };

function getWeather() {
  const zip = document.getElementById('zip').value;
  // console.log(zip);
  return fetch(baseURL + zip + apiKey)
  .then(res => res.json())
  .then(resjson => {
    // console.log(resjson)
    const feelings = document.getElementById('feelings').value;
    fetch('/add', {
      method: 'POST',

      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      // body: {
      //   date: new Date(),
      //   temp: temp,
      //   content: feelings
      // }
      body: JSON.stringify({message: 'body hit'})
    })
    .then(res => {
      return res.json()
    })
    .then(json => {
      console.log('Success:', json)})
    .catch(error => {
      console.log('error', error)
    })
  })
};


// Async GET
const getWeatherData = async (url) => {
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

      const response = await fetch( '/add', {
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
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].content;
    document.getElementById('date').innerHTML = allData[0].date;
  } catch(error) {
    console.log('error', error)
  }
};
