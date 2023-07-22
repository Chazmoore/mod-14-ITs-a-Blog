document.addEventListener('DOMContentLoaded', function () {
    const editForm = document.getElementById('editForm');
    const messageContainer = document.getElementById('message');
    const messageTemplate = document.getElementById('message-template').innerHTML;
    const template = Handlebars.compile(messageTemplate);
  
    editForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get form data
      const title = event.target.elements.title.value;
      const content = event.target.elements.content.value;
      const date = event.target.elements.date.value;
  
      // Get the blog post ID from the URL
      const url = new URL(window.location.href);
      const postId = url.pathname.split('/').pop();
  
      // Simulate an AJAX request to the server (Replace this with actual backend communication)
      setTimeout(function () {
        const response = {
          success: true,
          message: 'Blog post updated successfully!',
        };
  
        // Render the message template with response data
        const html = template(response);
        messageContainer.innerHTML = html;
      }, 1000); // Simulating a delay for demonstration purposes
    });
  });
  