// server variables
let server = "http://localhost:3001";
// let server = "https://springhunters1.herokuapp.com";

// importing variables from handlebars by "borrowing" them
let springId = myGlobal.selectedSpringId;
let springFees = myGlobal.selectedSpringFees;
let springPets = myGlobal.selectedSpringPets;
let springsP = myGlobal.selectedSpringStatepark;
let springCamping = myGlobal.selectedSpringCamping;
let springScuba = myGlobal.selectedSpringScuba;
let springlat = myGlobal.selectedSpringLat;
let springlng = myGlobal.selectedSpringLng;
let zipcode = myGlobal.selectedSpringZip;
//element finders
let mapId = document.querySelector('#map');
let pictureEl = document.querySelector("#picture");
let temperatureEl = document.querySelector("#temperature");
let weatherEl = document.querySelector(`#weather`);


// generating the map
function initMap() {


  var myLatLng = { lat: springlat, lng: springlng };
  // Set up the map options
  const mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(springlat, springlng)
  };
  // Create the map
  const map = new google.maps.Map(mapId, mapOptions);

  // Add a marker to the map at the specified coordinates
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });
};



// finding user location to find distance and then populate it
function getUserLoc() {
  navigator.geolocation.getCurrentPosition(position => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    const userLatLng = new google.maps.LatLng(userLat, userLng);
    var springLatLng = new google.maps.LatLng(springlat, springlng);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, springLatLng);
    let distanceInMiles = distance / 1609.344;
    let rounded = Math.round(distanceInMiles);
    let distanceEl = document.querySelector(`#distance`);
    distanceEl.innerHTML = rounded + ' miles away from your location';
  })
};

// populates the springlist array for later use
async function fetchsprings() {
  var requestSpringObjects = `${server}/api/springs/`;
  const springlist = await (await fetch(requestSpringObjects)).json();
  return springlist;
};

//making weatherEl's content a number, as it passes as a string
Number(weatherEl)

//utilizes the weather api from rapidapi to display weather
function getWeather(zipcode, weatherEl) {
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
      const temperature = data.current.temp_f;
      const iconUrl = data.current.condition.icon;
      let imageEl = document.createElement('img')
      imageEl.setAttribute("src", iconUrl);
      weatherEl.appendChild(imageEl);
      temperatureEl.innerText = `${temperature}°F`;
    })
    //displays error message
    .catch(err => console.error(err));
};
//filter function
function populatelist() {
  const stateparksEl = document.querySelector('#stateparks')
  const stateparksValue = stateparksEl.getAttribute("data-stateparks");
  const campingEl = document.querySelector('#camping')
  const campingValue = campingEl.getAttribute("data-camping");
  const scubaEl = document.querySelector('#scuba')
  const scubaValue = scubaEl.getAttribute("data-ScubaDiving");

  const petsEl = document.querySelector("#pets");
  const petsValue = petsEl.getAttribute("data-pets");


  if (petsValue === "true") {
    petsEl.textContent = "Yes, pets are allowed!";
  } else {
    petsEl.textContent = "No pets, sorry.";
  }
  if (stateparksValue === "true") {
    stateparksEl.textContent = "This is a statepark!";
  } else {
    stateparksEl.textContent = "This is not a statepark.";

  }
  if (campingValue === "true") {
    campingEl.textContent = "Yes, camping allowed!";
  } else {
    campingEl.textContent = "No camping, sorry.";

  }

  if (scubaValue === "true") {
    scubaEl.textContent = "Yes, scuba diving allowed!";
  } else {
    scubaEl.textContent = "No scuba diving, sorry.";


  }
};

//currently disabled comment fetcher
// async function fetchcomments() {
//   var requestComments = `${server}/api/comments/spring/${springId}`;
//   const commentlist = await (await fetch(requestComments)).json();
//   console.log(commentlist)
//   return commentlist;
//   };
//init function
function init() {

  getUserLoc();
  //populates the dropdown menu using shortname id's
  fetchsprings();
  // fetchcomments();

  getWeather(zipcode, weatherEl);
  initMap();
  populatelist();

};


//calls the init function on page startup
window.onload = function () { init(); }
