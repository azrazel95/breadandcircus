// function refresh the page
function refresh() {
  document.location.replace('/profile')
}
// setting up the post array
let posts = [];
// populating our posts array using a fetch request
const fetchPosts = async () => {
  try {
    const response = await fetch('/api/posts');
    const data = await response.json();
    posts = data;
  } catch (err) {
    console.error(err);
  }
};
// executing the fetchpost function
fetchPosts();
// formhandler for create/update post
const newFormHandler = async (event) => {
  event.preventDefault();
  // takes in the values of name and description, and post id for mysql
  const name = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();
  const postId = document.querySelector('#updateBtn') ? document.querySelector('#updateBtn').dataset.id : null;
// if name and description is filled out, send a fetch request
  if (name && description) {
    try {
      let response;
      //if there is a postId it is an update request, therefore a put
      if (postId) { 
        response = await fetch(`/api/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            post_name: name,
            description: description
          })
        });
        //otherwise it is a create request so a post
      } else { 
        response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            post_name: name,
            description: description
          })
        });
      }
        // if everything works, refresh, otherwise reject
      if (response.ok) {
        refresh()
      } else {
        alert('Failed to create/update post');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create/update post');
    }
  }
};
// handles the edit button
const editbuttonhandler = async (event) => {
  // grabs the relevant posts id
  const postId = event.target.dataset.id;
  // finds the post to relate it to
  const selectedPost = posts.find(post => post.id == postId);
  // if it finds one
  if (selectedPost) {
    // Populates the form with the chosen post
    document.querySelector('#post-name').value = selectedPost.post_name;
    document.querySelector('#post-desc').value = selectedPost.description;
    // Changes the button to "Update" and gives it the related post id
    const updateBtn = document.querySelector('.new-post-form button[type="submit"]');
    updateBtn.textContent = 'Update';
    updateBtn.setAttribute('id', 'updateBtn');
    updateBtn.setAttribute('data-id', postId);
    // tells the button to refresh the page on click as well as send the related fetch request
    document
    .querySelector('#updateBtn')
    .addEventListener('click', refresh);
  }
};
   
      // the delete button handler
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  }
};
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

  document.querySelectorAll('.delete-post-btn').forEach((button) => {
    button.addEventListener('click', delButtonHandler);
  });

  document.querySelectorAll('.edit-post-btn').forEach((button) => {
    button.addEventListener('click', editbuttonhandler);
  });
