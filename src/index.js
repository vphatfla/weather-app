import './style.css';
import cChoice from './images/c-icon.png';
import fChoice from './images/f-icon.png';
import thermometer from './images/thermometer.png';
import searchIcon from './images/search-icon.png';
import displayData from './display';
import { eventUnitChoice, getUnitChoice } from './unitChoice';

// copy of data for unitChoice
// event for unit choice
eventUnitChoice();

const apiKey = 'b8819f2fe43d597b6aece5e14e483988'; // default API key
// action for input enter or click

const inputCtn = document.querySelector('.input');
const inputField = document.querySelector('input');
const imgButton = inputCtn.querySelector('#inputClick');
imgButton.src = searchIcon;

// function check if inputvalue is zipcode
function checkZip(string) {
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] > '9' || string[i] < '0') {
      return false;
    }
  }
  return true;
}

async function run(inputValue) {
  document.getElementById('err').innerHTML = '';
  let syntax = '';
  let unitSyntax = '';
  // get fetching in C of F
  const unitOption = getUnitChoice();
  if (unitOption === 'f') unitSyntax = '&units=imperial';
  if (unitOption === 'c') unitSyntax = '&units=metric';
  // get fetching in zip code or cityname
  if (checkZip(inputValue)) {
    const zipCode = inputValue;
    syntax = `zip=${zipCode}`;
  } else {
    const location = inputValue;
    syntax = `q=${location}`;
  }
  // fecthing
  try {
    // add unit to transfer to F
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${syntax}${unitSyntax}&appid=${apiKey}`);
    const data = await response.json();
    displayData(data);
    console.log(data);
  } catch (error) {
    document.getElementById('err').innerHTML = 'Cound not find the location';
  }
}

// action when click imgButton
// action enter to click action
inputField.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    imgButton.click();
  }
});

imgButton.addEventListener('click', () => {
  const inputValue = inputField.value;
  run(inputValue);
});

// functions
// import image for c-f choice
document.getElementById('c').src = cChoice;
document.getElementById('thermometer').src = thermometer;
document.getElementById('f').src = fChoice;

// function get the location of user
// save the location save
function saveCityName(cityName) {
  localStorage.setItem('cityName', cityName);
}
// get the location saved
function getCityName() {
  try {
    return localStorage.getItem('cityName');
  } catch (error) {
    console.log(error);
    return false;
  }
}

// reverse fetching to get user city base on lat and lon,
// then use RUN() based on the cityName from fetching data(lat,lon)
async function fetchingCityName(lat, lon) {
  try {
    console.log('now fetchingcityname');
    console.log(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`);
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`);
    const data = await response.json();
    const cityName = data[0].name;
    console.log(data);
    // saveCityName(cityName);
    run(cityName);
  } catch (err) {
    console.log('error occurs in fetching city name ', err);
    saveCityName('Fort Myers'); // set default cityName to fort myers
    run(getCityName()); // run default location in fort myers;
  }
}
// get user's location
// error handler function
function errorLocationHandler(error) {
  switch (error.code) {
    case error.POSITION_UNAVAILABLE:
      // eslint-disable-next-line no-alert
      alert('Location information is unavailable');
      break;
    case error.TIMEOUT:
      // eslint-disable-next-line no-alert
      alert('Timed out request location');
      break;
    case error.UNKNOWN_ERROR:
      // eslint-disable-next-line no-alert
      alert(`Error ${error}`);
      break;
    default:
      saveCityName('Fort Myers'); // set default cityName to fort myers
      run(getCityName()); // run default location in fort myers;
  }
}
// success geolocation function
function getPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log('lat = ', lat, 'long = ', lon);
  fetchingCityName(lat, lon);
}
// using navigator api
// means that !getcityname = false = already has a saved location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getPosition, errorLocationHandler);
} else run(getCityName());

// default page
