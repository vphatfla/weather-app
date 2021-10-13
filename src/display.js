import clearSky from './images/clear-sky.jpg';
import fewClouds from './images/few-clouds.jpg';
import drizzle from './images/drizzle.jpg';
import mist from './images/mist.jpg';
import clouds from './images/overcast-clouds.jpg';
import rain1 from './images/rain1.jpg';
import rain2 from './images/rain2.jpg';
import showerRain from './images/shower-rain.jpg';
import snow from './images/snow.jpg';
import haze from './images/haze.jpg';
import thunderstorm from './images/thunderstorm.jpg';
import { getUnitChoice } from './unitChoice';

// get today
const getDayTime = () => {
  const today = new Date();
  console.log(today.getDate());
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(today);
};
// set background of html based on the description of weather from api
const setBackground = (string) => {
  const bodyBackGround = document.querySelector('body');
  if (string.includes('Clear')) bodyBackGround.style.background = `url(${clearSky}) no-repeat center center fixed`;
  else if (string.includes('Few Cloud') || string.includes('Broken Cloud') || string.includes('Scattered Clouds')) bodyBackGround.style.background = `url(${fewClouds}) no-repeat center center fixed`;
  else if (string.includes('Cloud')) bodyBackGround.style.background = `url(${clouds}) no-repeat center center fixed`;
  else if (string.includes('Drizzle')) bodyBackGround.style.background = `url(${drizzle}) no-repeat center center fixed`;
  else if (string.includes('Mist')) bodyBackGround.style.background = `url(${mist}) no-repeat center center fixed`;
  else if (string.includes('Shower Rain')) bodyBackGround.style.background = `url(${showerRain}) no-repeat center center fixed`;
  else if (string.includes('Light Rain')) bodyBackGround.style.background = `url(${rain1}) no-repeat center center fixed`;
  else if (string.includes('Rain')) {
    bodyBackGround.style.background = `url(${rain2}) no-repeat center center fixed`;
  } else if (string.includes('Snow')) bodyBackGround.style.background = `url(${snow}) no-repeat center center fixed`;
  else if (string.includes('Thunderstorm')) {
    bodyBackGround.style.background = `url(${thunderstorm}) no-repeat center center fixed`;
  } else if (string.includes('Haze')) bodyBackGround.style.background = `url(${haze}) no-repeat center center fixed`;
};
// display data
const displayData = (data) => {
  // cityInfo
  const cityCountryName = document.getElementById('cityCountryName');
  cityCountryName.innerHTML = `${data.name}, ${data.sys.country}`;

  const dayTime = document.getElementById('dayTime');
  dayTime.innerHTML = getDayTime();
  // weather info
  const description = document.getElementById('description');
  // eslint-disable-next-line prefer-const
  let string;
  const desp = data.weather[0].description; // uppercase
  string = desp[0].toUpperCase();
  for (let i = 1; i < desp.length; i += 1) {
    if (desp[i - 1] === ' ') string += desp[i].toUpperCase();
    else string += desp[i];
  }
  description.innerHTML = string;
  setBackground(string);
  // temp and wind
  if (getUnitChoice() === 'f') {
    // temp + set attribute temp for easy change if click the temp icon C F
    const temp = document.getElementById('temp');
    temp.innerHTML = `Temp: ${data.main.temp} F | Feel like: ${data.main.feels_like} F `;
    temp.setAttribute('fTemp', data.main.temp);
    temp.setAttribute('fFL', data.main.feels_like);
    // wind
    const wind = document.getElementById('wind');
    wind.innerHTML = `Wind: ${data.wind.speed} mph`;
    wind.setAttribute('mph', data.wind.speed);
  } else {
    // temp
    const temp = document.getElementById('temp');
    temp.innerHTML = `Temp: ${data.main.temp} C | Feel like: ${data.main.feels_like} C`;
    temp.setAttribute('cTemp', data.main.temp);
    temp.setAttribute('cFL', data.main.feels_like);
    // wind
    const wind = document.getElementById('wind');
    wind.innerHTML = `Wind: ${data.wind.speed} ms`;
    wind.setAttribute('ms', data.wind.speed);
  }
  // huminidy
  const humidity = document.getElementById('humidity');
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
};

export default displayData;
