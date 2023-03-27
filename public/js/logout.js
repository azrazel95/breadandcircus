// logout sends a fetch request to post a logout request
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  // if it works, bring us to homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};
// makes the button work
document.querySelector('#logout').addEventListener('click', logout);
