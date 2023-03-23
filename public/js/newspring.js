// // Element finders
const newSpring = document.querySelector("#newSpring");
const springNameM = document.querySelector("#springnamem");
const descriptionM = document.querySelector("#descriptionm");
const campingM = document.getElementById("campingm");
const stateParkM = document.querySelector("#stateparkm");
const petFriendlyM = document.getElementById("petfriendlym");
const zipcodeM = document.querySelector("#zipcodem")


// listener for the submit button when addin a spring
newSpring.addEventListener("click", async function (event) {
  // event.preventDefault();

  let camping = "";
  let pets = "";
  let statepark = "";
  let name = springNameM.value.trim();
  let description = descriptionM.value.trim();
  let zipcode = zipcodeM.value.trim();
  if (campingM.checked) {
    camping = true;
  } else { camping = false };
  if (petFriendlyM.checked) {
    pets = true
  } else { pets = false };
  if (stateParkM.checked) {
    statepark = true
  } else { statepark = false };

  //if name, description and zipcode is filled out, creates a post request to create a new spring
  if (name && description && zipcode) {
    const response = await fetch('/api/newspring/', {
      method: 'POST',
      body: JSON.stringify({ name, description, zipcode, pets, statepark, camping }),
      headers: { 'Content-Type': 'application/json' },
    });
    //if success, render new spring on the new spring page
    if (response.ok) {
      window.location.replace('/newspring');
    } else {
      alert(response.statusText);
    }
  }
});