document.addEventListener('DOMContentLoaded', function () {
    const editForm = document.getElementById('editForm');
  
    editForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get form data
      const title = event.target.elements.title.value;
      const description = event.target.elements.description.value;
  
      // Simulate an AJAX request to the server to update the blog post (Replace with actual backend communication)
      fetch('/post/:id', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description
        })
      })
        .then(response => response.json())
        .then(data => {
          // Redirect the user to the updated blog post page after successful update
          window.location.href = '/post/:id'; // Update to your actual route for displaying a specific post
        })
        .catch(error => {
          console.error('Error updating the blog post:', error);
          // Handle any errors that occur during the update process
        });
    });
  });
  