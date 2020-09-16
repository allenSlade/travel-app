/* Global Variables */
const username = '&maxRows=10&username=meerkat';
let baseURL = 'http://api.geonames.org/searchJSON?q=';



// Create a new date instance dynamically with JS

// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();





// API Call
function performAction() {
let destination = document.querySelector('.destination');
let city = document.getElementById('city').value;
let departure = document.getElementById('travel-date').value;
console.log(city);




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
    let country = document.getElementById('country');
    country.value = allData.country;

    let city = document.getElementById('city').value;
    let departure = document.getElementById('travel-date').value;
    console.log(departure)
    console.log(city);


    let destination = document.querySelector('.destination');
    // document.querySelector('.departure').innerText = departure;
    destination.innerText = `${city}, ${country.value}`;

    // Count down timer
    let today = new Date();
    let depDate = new Date(departure);
    depDate.setFullYear(today.getFullYear());
    let msPerDay = 24 * 60 * 60 * 1000;
    let countDown = (depDate.getTime() - today.getTime()) / msPerDay;
    countDown= Math.round(countDown);
    document.getElementById('count-down').innerText = `${countDown}`;
    document.getElementById('count-down2').innerText = `days to my trip to`
    document.getElementById('count-down3').innerText = `${city}, ${country.value}`
  } catch(error) {
    console.log('error', error)
  }
};

export { performAction }
