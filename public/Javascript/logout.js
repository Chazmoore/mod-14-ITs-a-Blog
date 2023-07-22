document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.querySelector('a[href="/logout"]');
  
    logoutLink.addEventListener('click', function (event) {
      event.preventDefault();
  
      // Simulate an AJAX request to the server to logout the user (Replace with actual backend communication)
      fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          // Redirect the user to the homepage after successful logout
          window.location.href = '/';
        })
        .catch(error => {
          console.error('Error logging out:', error);
          // Handle any errors that occur during the logout process
        });
    });
  });
  