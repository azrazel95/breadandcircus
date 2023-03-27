function refresh() {
  document.location.replace('/profile')
}
let posts = [];

const fetchPosts = async () => {
  try {
    const response = await fetch('/api/posts');
    const data = await response.json();
    posts = data;
    console.log(posts); // should now log the populated array
  } catch (err) {
    console.error(err);
  }
};

fetchPosts();

const newFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();
  const postId = document.querySelector('#updateBtn') ? document.querySelector('#updateBtn').dataset.id : null;

  if (name && description) {
    try {
      let response;
      if (postId) { // if the update button has been clicked, send a PUT request
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
      } else { // otherwise, it's a create request
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

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create/update post');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create/update post');
    }
  }
};

const editbuttonhandler = async (event) => {
  const postId = event.target.dataset.id;
  const selectedPost = posts.find(post => post.id == postId);
  if (selectedPost) {
    // Populate form with post data
    document.querySelector('#post-name').value = selectedPost.post_name;
    document.querySelector('#post-desc').value = selectedPost.description;
    // Change form submit button text to "Update"
    const updateBtn = document.querySelector('.new-post-form button[type="submit"]');
    updateBtn.textContent = 'Update';
    updateBtn.setAttribute('id', 'updateBtn');
    updateBtn.setAttribute('data-id', postId); // add post ID to update button
    document
    .querySelector('#updateBtn')
    .addEventListener('click', refresh);
  }
};
   
      
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
