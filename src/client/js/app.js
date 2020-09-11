/* Global Variables */
const username = '&maxRows=10&username=meerkat';
let baseURL = 'http://api.geonames.org/searchJSON?q=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener for genrate button
// document.getElementById('generate').addEventListener('click', performAction);

// API Call
function performAction() {
// Target input id = 'zip'
let city = document.getElementById('city').value;
console.log(city);
// Target textarea id = 'feelings'
// let country = document.getElementById('country');
// let latitude = document.getElementById('latitude');
// let longitude = document.getElementById('longitude');

  getGeonamesData(baseURL, city, username)
  .then(function(data) {
    console.log('data checkin', data)

    //Add data to POST request
    let geo = data.geonames[0];
    console.log(geo);

    postData('/add', {
      latitude: geo.lat,
      longitude: geo.lng,
      country: geo.countryName});
  })
  .then(function() {
    updateUI()
  })
};

// Async GET
const getGeonamesData = async (baseURL, city, username) => {
  let res = await fetch(baseURL + city + username)
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
    console.log(data)

      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    })

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
  const req = await fetch('/all')
  try {
    const allData = await req.json()
    document.getElementById('latitude').innerHTML = allData.latitude;
    document.getElementById('longitude').innerHTML = allData.longitude;
    document.getElementById('country').innerHTML = allData.country;
  } catch(error) {
    console.log('error', error)
  }
};

export { performAction }
