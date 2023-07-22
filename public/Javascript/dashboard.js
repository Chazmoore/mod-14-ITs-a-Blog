document.addEventListener('DOMContentLoaded', function () {
    // Simulate an AJAX request to fetch existing blog posts created by the user
    setTimeout(function () {
        const blogPosts = [
            { _id: '1', title: 'First Blog Post', date: '2023-07-21' },
            { _id: '2', title: 'Second Blog Post', date: '2023-07-22' },
            // Add more posts if available
        ];

        // Render the dashboard template with the user's blog posts data
        const dashboardTemplate = Handlebars.compile(document.body.innerHTML);
        const html = dashboardTemplate({ blogPosts });
        document.body.innerHTML = html;

        // Add event listener for the "Add a New Blog Post" button
        const newPostBtn = document.getElementById('newPostBtn');
        newPostBtn.addEventListener('click', function () {
            // Redirect to the new blog post creation page (Replace with your actual route)
            window.location.href = '/create';
        });
    }, 1000); // Simulating a delay for demonstration purposes
});

