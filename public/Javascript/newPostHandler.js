// createPost.js
document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.querySelector('form');
  
    postForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get form data (title and contents)
      const title = document.getElementById('title').value;
      const contents = document.getElementById('contents').value;
  
      // Simulate an AJAX request to the server (Replace this with actual backend communication)
      fetch('/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, contents })
      })
        .then(response => response.json())
        .then(data => {
          // Redirect the user to the updated dashboard after creating the blog post
          window.location.href = '/dashboard';
        })
        .catch(error => {
          console.error('Error creating the blog post:', error);
          // Handle any errors that occur during the creation of the blog post
        });
    });
  });
  