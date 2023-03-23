
// ***************************************
// ********  DOM elements  ***************
// ***************************************
const stateParkEl = document.querySelector('#statePark');
const petFriendlyEl = document.querySelector('#petFriendly');
const campingAllowedEl = document.querySelector('#campingAllowed');
const scubaDivingEl = document.querySelector('#scubaDiving');
const pricingFeeEl = document.querySelector('#pricingFee');
const submitEl = document.querySelector('#searchBtn');


// let server = "http://localhost:3001";
let server = "https://springhunters1.herokuapp.com";
//script that is linked on every page to generate the dropdown menu
function getSprings() {
    //connects to our api to receive all springs,
    let conn = `${server}/api/springs/`;
    const dropdownEl = document.querySelector("#dropdown");
    fetch(conn)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                //rolls through the array of springs to populate dropdown
                const anchor = document.createElement('a');
                anchor.href = `${server}/springs/${data[i].id}`
                anchor.innerText = `${data[i].name}`;
                anchor.classList = "dropdown-item"
                dropdownEl.appendChild(anchor);
            }
        });
};
//function execute
getSprings();

// ******************************************
// *******Search listener *******************
// ******************************************
submitEl.addEventListener("click", async function (event) {
    event.preventDefault();
  
    let userSP = stateParkEl.checked;
    let userPet = petFriendlyEl.checked;
    let userCamp = campingAllowedEl.checked;
    let userScuba = scubaDivingEl.checked;
    let userFee = pricingFeeEl.checked;
    let url = server + "/";
    let i = 0;
    // build up the url to pass to the api
    if (userSP === true) { i = i + 1 };
    if (userPet === true) { i = i + 1 };
    if (userCamp === true) { i = i + 1 };
    if (userScuba === true) { i = i + 1 };
    if (userFee === true) { i = i + 1 };
  
    if (userSP === true) { 
      url = url + "?spvalue=true";
      if (i > 1) {
        i = i - 1;
        url = url + "&";
        console.log(i, url)
      }
    };
    if (userPet === true) { 
      url = url + "?petvalue=true";
      if (i > 1) {
        i = i - 1;
        url = url + "&";
        console.log(i, url)
      };
    };
    if (userCamp === true) { 
      url = url + "?campingvalue=true";
      if (i > 1) {
        i = i - 1;
        url = url + "&";
        console.log(i, url)
      };
    };
    if (userScuba === true) { 
      url = url + "?scubavalue=true";
      if (i > 1) {
        i = i - 1;
        url = url + "&";
        console.log(i, url)
      };
    };
    if (userFee === true) { url = url + "?userfee=true" };
    console.log(i, url)
    //replace to create filter request
    window.location.replace(url);
  });