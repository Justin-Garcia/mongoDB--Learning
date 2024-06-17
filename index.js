const express = require('express'); 
const mongoose = require('mongoose'); 

const Product = require('./models/product.model.js'); 
const productRoute = require('./routes/product.route.js'); 

const app = express(); // create express app

require('dotenv').config(); // utilize the dotenv package to import the env variables
// MISTAKE: Use the const '' = require('') syntax to import the models | Be sure to define app to run the server

// Middleware
app.use(express.json()); // use express to parse JSON
app.use(express.urlencoded({extended: false})); // Allow form data to add products


// Define the user and password for the database from the .env file
dbUser = process.env.DB_USER;
dbPassword = process.env.DB_PASSWORD;

// routes
app.use('/api/products', productRoute);

// settting up a get request
app.get('/', (req, res) => {
    res.send('Hello World');
});


// Connect to MongoDB
mongoose.connect((`mongodb+srv://${dbUser}:${dbPassword}@learningdb.dhuzt.mongodb.net/Node-API?retryWrites=true&w=majority`))
    .then(() => {
        console.log('Connected to MongoDB');
        // listen for requests and define the port
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.log('Failed to connect to MongoDB', err);
    });
// PROBLEM: Unable to use the env variable to connect to the database through the string | had to install dotenv, and use the require('dotenv').config() to import the env variables

