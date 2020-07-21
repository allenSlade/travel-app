/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&APPID=67e0e2fd1434dd8ac6ff3ac66554b091';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener for genrate button
document.getElementById('generate').addEventListener('click', performAction);

// API Call
function performAction() {
// Target input id = 'zip'
let zip = document.getElementById('zip').value;
// Target textarea id = 'feelings'
let feeling = document.getElementById('feelings').value;

  getWeatherData(baseURL, zip, apiKey)
  .then(function(data) {
    console.log('data checkin', data)
    //Add data to POST request
    let temp = data.main.temp;
    postData('/add', {
      date: newDate,
      temp: temp,
      content: feeling});
  })
  .then(function() {
    updateUI()
  })
};

// function getWeather() {
//   const zip = document.getElementById('zip').value;
//   // console.log(zip);
//   return fetch(baseURL + zip + apiKey)
//   .then(res => res.json())
//   .then(resjson => {
//     // console.log(resjson)
//     const feelings = document.getElementById('feelings').value;
//     fetch('/add', {
//       method: 'POST',
//
//       credentials: 'same-origin',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       // body: {
//       //   date: new Date(),
//       //   temp: temp,
//       //   content: feelings
//       // }
//       body: JSON.stringify({message: 'body hit'})
//     })
//     .then(res => {
//       return res.json()
//     })
//     .then(json => {
//       console.log('Success:', json)})
//     .catch(error => {
//       console.log('error', error)
//     })
//   })
// };

// Async GET
const getWeatherData = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey)
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

      const response = await fetch( url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json()
        console.log(newData)
        return newData;
      } catch(error) {
      console.log("error", error)
      }
  };

// Update UI with promise
const updateUI = async() => {
  const req = await fetch('/all');
  try {
    const allData = await req.json()
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById('date').innerHTML = allData.date;
  } catch(error) {
    console.log('error', error)
  }
};
