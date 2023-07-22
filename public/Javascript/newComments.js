// newComments.js
document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('commentForm');
    const messageContainer = document.getElementById('message');
    const messageTemplate = document.getElementById('message-template').innerHTML;
    const template = Handlebars.compile(messageTemplate);
  
    commentForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get form data (comment text)
      const comment = event.target.elements.comment.value;
  
      // Simulate an AJAX request to the server (Replace this with actual backend communication)
      setTimeout(function () {
        const response = {
          success: true,
          message: 'Comment saved successfully!',
          comment: comment,
          creator: 'John Doe', // Replace with the actual username of the comment creator (if available)
          date: new Date().toISOString(), // Get the current date in ISO format
        };
  
        // Render the message template with response data
        const html = template(response);
        messageContainer.innerHTML = html;
      }, 1000); // Simulating a delay for demonstration purposes
    });
  });
  