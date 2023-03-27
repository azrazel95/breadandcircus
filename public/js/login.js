// formhandler
const loginFormHandler = async (event) => {
  event.preventDefault();

  // takes the values from email and password forms
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  // if they are populated send a fetch request to login to see if they are correct.
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if they are correct, login and replace the page with the dashboard
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // otherwise reject
      alert(response.statusText);
    }
  }
};
// signup form
const signupFormHandler = async (event) => {
  event.preventDefault();
  // taking the value from the signup form
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  // checks the values from name email and password forms exist and sends a fetch request
  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if successful bring user to dashboard
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // otherwise reject
      alert(response.statusText);
    }
  }
};
// makes the buttons work
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
