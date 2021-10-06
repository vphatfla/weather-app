import './style.css';
import searchIcon from './images/search-icon.png';
import displayData from './display';

const apiKey = 'b8819f2fe43d597b6aece5e14e483988'; // default API key
let location = 'Fort Myers'; // set default location

// action for input enter or click

const inputCtn = document.querySelector('.input');
const inputField = document.querySelector('input');
const imgButton = inputCtn.querySelector('#inputClick');
imgButton.src = searchIcon;

// action when click imgButton
// action enter to click action
inputField.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    imgButton.click();
  }
});

imgButton.addEventListener('click', () => {
  const inputValue = inputField.value;
  run(inputValue, 'f');
});

// functions

// function check if inputvalue is zipcode
function checkZip(string) {
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] > '9' || string[i] < '0') {
      return false;
    }
  }
  return true;
}

async function run(inputValue, unitOption) {
  let syntax;
  let unitSyntax;
  if (unitOption === 'f') unitSyntax = '&units=imperial';
  if (unitOption === 'c') unitSyntax = '&units=metric';
  if (checkZip(inputValue)) {
    const zipCode = inputValue;
    syntax = `zip=${zipCode}`;
  } else {
    location = inputValue;
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
    console.error(error);
  }
}

run(location, 'f');
