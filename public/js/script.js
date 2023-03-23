

// // This server var needs switched before deploying to heroku
// let server = "http://localhost:3001";
let server = "https://springhunters1.herokuapp.com";

// ***************************************
// ********  DOM elements  ***************
// ***************************************
const stateParkEl = document.querySelector('#statePark');
const petFriendlyEl = document.querySelector('#petFriendly');
const campingAllowedEl = document.querySelector('#campingAllowed');
const scubaDivingEl = document.querySelector('#scubaDiving');
const pricingFeeEl = document.querySelector('#pricingFee');


// ***************************************
// ***********  Functions  ***************
// ***************************************
//init function to render springs onto the homepage
async function init() {
  const springarray = await fetchsprings();
  for (let i = 0; i < springarray.length; i++) {
    let j = i + 1;
    let distanceEl = document.querySelector(`#spring${j}`);
    let lat = springarray[i].lat;
    let lng = springarray[i].lng
    getUserLoc(lat, lng, distanceEl);
    let weatherEl = document.querySelector(`#weather${j}`);
    let zipcode = springarray[i].zipcode;
    getweather(zipcode, weatherEl)
  }
};
// Send a GET request to the RapidAPI weather API
function getweather(zipcode, weatherEl) {
  const API_KEY = '4a9c9446f7msh1bdc5860de01184p135179jsne7c04d560051';
  const API_HOST = 'weatherapi-com.p.rapidapi.com';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };
  //utilizes the zipcode from the static map array
  fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${zipcode}`, options)
    .then(response => response.json())
    .then(data => {
      // chooses which icon to display
      const iconUrl = data.current.condition.icon;
      let imageEl = document.createElement('img')
      imageEl.setAttribute("src", iconUrl);
      weatherEl.appendChild(imageEl);
    })
    //displays error message
    .catch(err => console.error(err));
};

// populates the springlist array for later use
async function fetchsprings() {
  var requestSpringObjects = `${server}/api/springs/`;
  const springlist = await (await fetch(requestSpringObjects)).json();
  return springlist;
};

// function to populate the distance
function getUserLoc(lat, lng, distanceEl) {
  navigator.geolocation.getCurrentPosition(position => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    const userLatLng = new google.maps.LatLng(userLat, userLng);
    var springLatLng = new google.maps.LatLng(lat, lng);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, springLatLng);
    let distanceInMiles = distance / 1609.344;
    let rounded = Math.round(distanceInMiles);
    distanceEl.innerHTML = rounded + ' miles away';
  })
};


//ensures everything loads before this script, as otherwise we receive google maps issues
window.onload = function () { init(); }