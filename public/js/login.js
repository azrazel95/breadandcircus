//handles the login form
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  //if values are both filled
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      window.location.replace('/profile');
    } else {
      //error handling
      alert(response.statusText);
    }
  }
};
//handles signup form
const signupFormHandler = async (event) => {
  event.preventDefault();
  //form finders
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  //if all three are filled out, send signup request to create a user
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    //if successful, replace window with the new user profile
    if (response.ok) {
      window.location.replace('/profile');
    } else {
      //error handler
      alert(response.statusText);
    }
  }
};
//button finder for login
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
//button finder for signup
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
