const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const postRoutes = require('./controllers/api/post-routes');
const session = require('express-session');
const User = require('./models/User'); 

const app = express();
const PORT = 3001; // Define the PORT variable

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    db: sequelize
  })
);

// Set Handlebars as the view engine
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// API routes
app.use('/api', postRoutes); // Use '/api' as the base URL for postRoutes

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});




