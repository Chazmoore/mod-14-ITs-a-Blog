const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const session = require('express-session');


const app = express();
const PORT = 3001; // Define the PORT variable


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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API routes
 // app.use('/api', postRoutes); // Use '/api' as the base URL for postRoutes
// app.use('/',require('./controllers'));
app.use(require('./controllers')); 


// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});




