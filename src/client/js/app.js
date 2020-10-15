import "@babel/polyfill";

/* Geoname Global Variables */
const username = `&maxRows=10&username=${process.env.GEO_USERNAME}`;
let baseURL = 'http://api.geonames.org/searchJSON?q=';
const apiKey = `&key=${process.env.WEBIT_API_KEY}`;
let apiURL = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
const pixaKey = `${process.env.PIXA_API_KEY}`;
console.log(pixaKey);

let today = new Date();

// let city = document.getElementById('city').value;
let pixaURL = city => `https://pixabay.com/api/?key=${pixaKey}&q=${city}&image_type=photo`;
let countriesURL = countryName => `https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`;



// API Call
function performAction() {
let departure = document.getElementById('travel-date').value;
let destination = document.querySelector('.destination');
let city = document.getElementById('city').value;
console.log(city);

// Countdown Timer
let today = new Date();
let depDate = new Date(departure);
depDate.setFullYear(today.getFullYear());
let msPerDay = 24 * 60 * 60 * 1000;
let countDown = (depDate.getTime() - today.getTime()) / msPerDay;
countDown = Math.round(countDown);
console.log(countDown);

  getGeonamesData(baseURL, city, username)
  .then(function(data) {
    console.log('getGeonamesData check-in', data)

    //Add data to POST request
    let geo = data.geonames[0];
    console.log(geo);

    postData('/add', {
      latitude: geo.lat,
      longitude: geo.lng,
      country: geo.countryName,
      date: departure});

      let countryName = `${geo.countryName}`;
      console.log(countryName);

      let city = document.getElementById('city').value;
      getWeatherBitData(apiURL, city, apiKey)
      .then(function(nuweData) {
        console.log('getWeatherBitData check-in', nuweData)

        let weBit = nuweData.data[`${countDown}`];
        updateData('/update', {
          highTemp: weBit.high_temp,
          // lowTemp: weBit.low_temp,
          clouds: weBit.clouds,
          precip: weBit.precip,
          pres: weBit.pres,
          snow: weBit.snow,
          // vis: weBit.vis,
          weather: weBit.weather,
          weatherCode: weBit.weather.code,
          weatherDesc: weBit.weather.description,
          weatherIcon: weBit.weather.icon,
          windDir: weBit.wind_cdir,
          windSpeed: weBit.wind_spd
        });

        let city = document.getElementById('city').value;
        console.log('getPixabayData check-in', city);
        getPixabayData(pixaURL(city), pixaKey)
        .then(function(pixaData) {
          console.log('getPixabayData check-in', pixaData)

          let pixa = pixaData.hits[0];
          postData('/insert', {
            webformatURL: pixa.webformatURL
          });


          getCountryData(countriesURL(countryName))
          .then(function(countryData) {
            console.log('getCountryData check-in', countryData)


            postData('/country', {
              flag: countryData[0].flag,
              capital: countryData[0].capital,
              // capital: countryData[1].capital,
              currencies: countryData[0].currencies,
              languages: countryData[0].languages,
              population: countryData[0].population,
              // population: countryData[1].population,
              region: countryData[0].region,
              timezones: countryData[0].timezones
            });


        })
        .then(function() {
          updateGeoUI();
        })
        .then(function() {
          updateWetUI();
        })
        .then(function() {
          updatePixaUI();
        })
        .then(function() {
          updateCountriesUI();
        })

      })

    })
  })
};

// Geonames Async GET
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

// WeatherBit Async GET
const getWeatherBitData = async (apiURL, city, apiKey) => {
  let res = await fetch(apiURL + city + apiKey)
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

// Pixabay Async GET
const getPixabayData = async (pixaURL, city, pixaKey) => {
  let res = await fetch(pixaURL + city + pixaKey)
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

// Countries Async GET
const getCountryData = async (countriesURL, countryName) => {
  let res = await fetch(countriesURL + countryName)
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

// Geonames Async POST
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

// WeatherBit Async POST
const updateData = async ( url = '', data = {})=>{
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
      const nuvoData = await response.json()
      console.log(nuvoData)
      return nuvoData;
    } catch(error) {
      console.log("error", error)
    }
};

// Geonames Async POST
const insertData = async ( url = '', data = {})=>{
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
const updateGeoUI = async() => {
  const req = await fetch('/geoData')
  try {
    const allData = await req.json()

    // Geonames API: update UI with fetch data
    document.getElementById('latitude').innerHTML = allData.latitude;
    document.getElementById('longitude').innerHTML = allData.longitude;
    let country = document.getElementById('country');
    country.value = allData.country;

    // Geonames API: update UI with fetch data
    let city = document.getElementById('city').value;
    let departure = document.getElementById('travel-date').value;
    let destination = document.querySelector('.destination');
    destination.innerText = `${city}, ${country.value}`;

    // Countdown Timer
    let today = new Date();
    let depDate = new Date(departure);
    depDate.setFullYear(today.getFullYear());
    let msPerDay = 24 * 60 * 60 * 1000;
    let countDown = (depDate.getTime() - today.getTime()) / msPerDay;
    countDown = Math.round(countDown);

    // Geonames update UI
    document.getElementById('count-down').innerText = `${countDown}`;
    document.getElementById('count-down2').innerText = `days to my trip to`;
    document.getElementById('count-down3').innerText = `${city}, ${country.value}`;

    document.getElementById('country-info').innerText = `${country.value}`;
    let countryName = `${country.value}`;
    // let countryName = document.getElementById('country-info').value;
    console.log(countryName);

    document.querySelector('.departure').innerText = `${departure}`;



  } catch(error) {
    console.log('error', error)
  }
};

// Update UI with promise
const updateWetUI = async() => {
  const req = await fetch('/wetData')
  try {
    const allData = await req.json()

    // Weatherbit update UI (class='weather-container')
    document.getElementById('high').innerHTML = allData.highTemp;
    // document.getElementById('low').innerHTML = allData.lowTemp;
    document.getElementById('clouds').innerHTML = allData.clouds;
    document.getElementById('precip').innerHTML = allData.precip;
    document.getElementById('pres').innerHTML = allData.pres;
    document.getElementById('snow').innerHTML = allData.snow;
    // document.getElementById('vis').innerHTML = allData.vis;
    // document.getElementById('weather-code').innerHTML = allData.weatherCode;
    // document.getElementById('weather-desc').innerHTML = allData.weatherDesc;
    // document.getElementById('weather-icon').innerHTML = allData.weatherIcon;
    document.getElementById('wind-dir').innerHTML = allData.windDir;
    document.getElementById('wind-speed').innerHTML = allData.windSpeed;

  } catch(error) {
    console.log('error', error)
  }
};

const updatePixaUI = async() => {
  const req = await fetch('/pixaData')
  try {
    const allData = await req.json()

    // Pixabay update UI (id='pixabay-image')
    let cityImage = document.getElementById('pixabay-image');
    cityImage.setAttribute('src', allData.webformatURL);


  } catch(error) {
    console.log('error', error)
  }
};

const updateCountriesUI = async() => {
  const req = await fetch('/countryData')
  try {
    const allData = await req.json()

    // restCountires update UI
    let countryFlag = document.getElementById('flag');
    countryFlag.setAttribute('src', allData.flag);
    document.getElementById('capital').innerHTML = allData.capital;
    // document.getElementById('capital').innerHTML = allData.capital;

    document.getElementById('code').innerHTML = allData.currencies[0].code;
    document.getElementById('name').innerHTML = allData.currencies[0].name;
    document.getElementById('symbol').innerHTML = allData.currencies[0].symbol;

    document.getElementById('languages-0').innerHTML = allData.languages[0].name;
    // document.getElementById('languages-1').innerHTML = allData.languages[1].name;
    // document.getElementById('languages-2').innerHTML = allData.languages[2].name;
    // document.getElementById('languages-3').innerHTML = allData.languages[3].name;
    // document.getElementById('languages-4').innerHTML = allData.languages[4].name;
    // document.getElementById('languages-5').innerHTML = allData.languages[5].name;
    // document.getElementById('languages-6').innerHTML = allData.languages[6].name;

    document.getElementById('population').innerHTML = allData.population;
    document.getElementById('region').innerHTML = allData.region;
    document.getElementById('timezones').innerHTML = allData.timezones[0];


  } catch(error) {
    console.log('error', error)
  }
};

export { performAction }
