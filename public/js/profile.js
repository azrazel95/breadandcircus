// currently disabled password reset functionality

//document
//   .querySelector('.pw')
//   .addEventListener('submit', resetpw);


// const resetpw = async (event) => {
//   event.preventDefault();

//   const oldpw = document.querySelector('#oldPassword').value.trim();
  
//   const newpw = document.querySelector('#password').value.trim();

//   if (oldpw && newpw) {
//     const response = await fetch(`/api/users/:userId/resetPassword`, {
//       method: 'POST',
//       body: JSON.stringify({oldPassword: oldpw, newPassword: newpw }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Username or password incorrect');

//     }
//   }
// };

// app.get('/userData.Json', async (req, res) => {
//   const userId = req.user.id; 

//   //Query the database to get the user's data
//   const user = await user.findone({ where: {id: userId } });

//   //Query the database to get the spring's that the user has rated or commented on 
//   const ratedSprings = await Spring.findAll({ include: {model: Ratings, where: {userId}}});
//   const commentedSprings = await Spring.findAll({ include: {model: Comments, where: {userId}}});

//   //Render the handlebars template with the user's data and the springs they've rated or commented on
//   res.render('profile', {user, ratedSprings, commentedSprings});
// });

// function newPassword() {
//   let oldPassword = document.getElementById('oldPassword').value;
//   let newPassword = document.getElementById('password').value;
//   let upDatePassword = document.getElementsByClassName('btn btn-primary').value;

//   if (oldPassword!=""&&newPassword!=""&&upDatePassword!="") 
//   { 
//     if(oldPassword!=newPassword)
//     {
//       if(newPassword==upDatePassword)
//       {
//         return true;
//       }
//       else {
//         alert("Confirm old password");
//         return false;
//       }
//     }
//     else {
//       alert("New password cannot be the same as old password");
//       return false;
//     }
//   }
//   else {
//     alert("All fields are required");
//     return false;
//   }

// }





// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/projects/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete project');
//     }
//   }
// };



// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
