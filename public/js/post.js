const newFormHandler = async (event) => {
    event.preventDefault();
    const description = document.querySelector('#comment-desc').value.trim();
    const postId = document.querySelector('.new-comment-form').dataset.id;
  
    if (description) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({"description": `${description}`, "post_id": `${postId}` }),
        
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(description)
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
  
 