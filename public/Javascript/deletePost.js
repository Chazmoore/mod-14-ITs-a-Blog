document.addEventListener('DOMContentLoaded', function () {
    const deleteBtn = document.getElementById('deleteBtn');
  
    deleteBtn.addEventListener('click', function () {
      // Simulate an AJAX request to the server to delete the blog post (Replace with actual backend communication)
      fetch('/post/:id', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          // Redirect the user to the dashboard or homepage after successful deletion
          window.location.href = '/dashboard'; // Update to your actual route for the dashboard
        })
        .catch(error => {
          console.error('Error deleting the blog post:', error);
          // Handle any errors that occur during the deletion process
        });
    });
  });
  