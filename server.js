
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');


const session = require('express-session');


const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    db: sequelize
  })
);

// Routes
app.get('/', (req, res) => {
  // Retrieve existing blog posts from the database
  // Render the homepage template with the retrieved data
});

app.get('/dashboard', (req, res) => {
  // Retrieve blog posts created by the logged-in user from the database
  // Render the dashboard template with the retrieved data
});

app.post('/post', (req, res) => {
  // Create a new blog post in the database using the submitted form data
  // Redirect the user to the updated dashboard
});

app.put('/post/:id', (req, res) => {
  // Update an existing blog post in the database with the submitted form data
  // Redirect the user to the updated dashboard
});

app.delete('/post/:id', (req, res) => {
  // Delete a blog post from the database based on the provided ID
  // Redirect the user to the updated dashboard
});

// Other routes and functionality

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
