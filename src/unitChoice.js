// function save unitchoice
function saveUnitChoice(unitChoice) {
  localStorage.setItem('unitChoice', unitChoice);
}
// function get unitchoice from localstorage
export function getUnitChoice() {
  try {
    return localStorage.getItem('unitChoice');
  } catch (error) {
    saveUnitChoice('f');
    return localStorage.getItem('unitChoice');
  }
}
// function adjust temp and wind speed based on event click unitchoice
function adjustTempUnitDisplay() {
  const temp = document.getElementById('temp');
  const wind = document.getElementById('wind');
  const unit = getUnitChoice();
  if (unit === 'f') {
    if (temp.hasAttribute('fTemp')) { // check if unitchoice is F and element already has value in F
      temp.innerHTML = `Temp: ${temp.getAttribute('fTemp')} F | Feel like: ${temp.getAttribute('fFL')} F `;
      wind.innerHTML = `Wind: ${wind.getAttribute('mph')} mph`;
    } else { // if not, value was set in C, now get value in C and calculate them to F
      const tempInC = parseFloat(temp.getAttribute('cTemp'));
      const tempFLInC = parseFloat(temp.getAttribute('cFL'));
      const ms = parseFloat(wind.getAttribute('ms'));
      // value in F
      const tempInF = (((tempInC * 9) / 5) + 32).toFixed(2);
      const tempFLInF = (((tempFLInC * 9) / 5) + 32).toFixed(2);
      const mph = (ms * 2.237).toFixed(2);
      temp.innerHTML = `Temp: ${tempInF} F | Feel like: ${tempFLInF} F `;
      wind.innerHTML = `Wind: ${mph} mph`;
      // set attribute
      temp.setAttribute('fTemp', tempInF);
      temp.setAttribute('fFL', tempFLInF);
      wind.setAttribute('mph', mph);
    }
  } else {
    // if unitchoice === 'c'
    // eslint-disable-next-line no-lonely-if
    if (temp.hasAttribute('cTemp')) { // check if unitchoice is c and element already has value in F
      temp.innerHTML = `Temp: ${temp.getAttribute('cTemp')} C | Feel like: ${temp.getAttribute('cFL')} C `;
      wind.innerHTML = `Wind: ${wind.getAttribute('ms')} ms`;
    } else { // if not, value was set in C, now get value in f and calculate them to c
      const tempInF = parseFloat(temp.getAttribute('fTemp'));
      const tempFLInF = parseFloat(temp.getAttribute('fFL'));
      const mph = parseFloat(wind.getAttribute('mph'));
      // value in F
      const tempInC = (((tempInF - 32) * 5) / 9).toFixed(2);
      const tempFLInC = (((tempFLInF - 32) * 5) / 9).toFixed(2);
      const ms = (mph / 2.237).toFixed(2);
      temp.innerHTML = `Temp: ${tempInC} C | Feel like: ${tempFLInC} C `;
      wind.innerHTML = `Wind: ${ms} ms`;
      // set attribute
      temp.setAttribute('cTemp', tempInC);
      temp.setAttribute('cFL', tempFLInC);
      wind.setAttribute('ms', ms);
    }
  }
}

// event for unitchoice img
export function eventUnitChoice() {
  const unitButtons = document.querySelectorAll('.unit');
  // highlight the chosen unit
  unitButtons.forEach((unitButton) => {
    if (unitButton.id === getUnitChoice()) unitButton.classList.add('chosenUnit');
  });
  unitButtons.forEach((unitButton) => unitButton.addEventListener('click', () => {
    unitButtons.forEach((u) => u.classList.remove('chosenUnit')); // remove chosen unit for all icon
    unitButton.classList.add('chosenUnit'); // add chosen unit for current clicked icon
    saveUnitChoice(unitButton.id);
    adjustTempUnitDisplay();
  }));
}
/// go on here
