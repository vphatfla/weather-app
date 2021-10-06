const getDayTime = () => {
  const today = new Date();
  console.log(today.getDate());
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(today);
};
const setBackground = (string) => {
  const bodyBackGround = document.querySelector('body');
  // continues here
};
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

  // temp
  const temp = document.getElementById('temp');
  temp.innerHTML = `Temp: ${data.main.temp} | Feel like: ${data.main.feels_like}`;
  // wind
  const wind = document.getElementById('wind');
  wind.innerHTML = `Wind: ${data.wind.speed} mph`;
  // huminidy
  const humidity = document.getElementById('humidity');
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
};

export default displayData;
