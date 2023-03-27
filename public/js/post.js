// creates comments
const newFormHandler = async (event) => {
  event.preventDefault();
  // establishes our comment value and the id of our post
  const description = document.querySelector('#comment-desc').value.trim();
  const postId = document.querySelector('.new-comment-form').dataset.id;
  // takes the comment and the post id to send the comment with its associated post id, using the logged in user id to send it up(not pictured)
  if (description) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ "description": `${description}`, "post_id": `${postId}` }),

      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(description)
    if (response.ok) {
      // if it works, refresh the page
      document.location.replace(`/posts/${postId}`);
    } else {
      // otherwise reject
      alert('Failed to create comment');
    }
  }
};


// makes the button work
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

