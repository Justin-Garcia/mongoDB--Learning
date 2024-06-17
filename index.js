const express = require('express'); // import express
const mongoose = require('mongoose'); // import mongoose
const app = express(); // create express app
require('dotenv').config(); // import dotenv
// MISTAKE: Use the const '' = require('') syntax to import the models | Be sure to define app to run the server

 // Define the user and password for the database from the .env file
dbUser = process.env.DB_USER;
dbPassword = process.env.DB_PASSWORD;

// listen for requests and define the port
app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 

// settting up a get request
app.get('/', (req, res) => {
  res.send('What Do I DO');
}); 

// Connect to MongoDB
mongoose.connect((`mongodb+srv://${dbUser}:${dbPassword}@learningdb.dhuzt.mongodb.net/Node-API?retryWrites=true&w=majority`))
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Failed to connect to MongoDB', err);
    });
    // PROBLEM: Unable to use the env variable to connect to the database through the string | had to install dotenv, and use the require('dotenv').config() to import the env variables