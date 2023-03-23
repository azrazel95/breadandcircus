
//logout function creating a post request
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  //if accepted returns user to homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};
//button finder for logout
document.querySelector('#logout').addEventListener('click', logout);
