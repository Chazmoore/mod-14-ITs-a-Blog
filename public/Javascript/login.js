document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const messageTemplate = document.getElementById('message-template').innerHTML;
    const template = Handlebars.compile(messageTemplate);

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form data
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        // Simulate an AJAX request to the server (Replace this with actual backend communication)
        setTimeout(function () {
            // Save user data to the database (Replace this with actual user registration)
            const success = true;

            if (success) {
                const response = {
                    title: 'Signup Successful',
                    message: `Welcome, ${username}! Your account has been created.`,
                };

                // Render the success message template
                renderMessage(response);
            } else {
                const response = {
                    title: 'Signup Failed',
                    message: 'An error occurred during signup. Please try again later.',
                };

                // Render the error message template
                renderMessage(response);
            }
        }, 1000); // Simulating a delay for demonstration purposes
    });

    function renderMessage(data) {
        const messageContainer = document.createElement('div');
        messageContainer.innerHTML = template(data);

        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        document.body.appendChild(messageContainer);
    }
});
