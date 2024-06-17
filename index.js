const express = require('express'); // import express
const mongoose = require('mongoose'); // import mongoose
const Product = require('./models/product.model'); // import the Product model
const app = express(); // create express app
app.use(express.json()); // use express to parse JSON
require('dotenv').config(); // import dotenv
// MISTAKE: Use the const '' = require('') syntax to import the models | Be sure to define app to run the server

// Define the user and password for the database from the .env file
dbUser = process.env.DB_USER;
dbPassword = process.env.DB_PASSWORD;


// settting up a get request
app.get('/', (req, res) => {
    res.send('Hello World');
});

// setting up a get request for the products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ data: await Product.find() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// setting up a get request for a single product
app.get('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// setting up a post to create products
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// setting up a put request to update a product
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // if the product is not found, return a 404 error
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // return the updated product
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//PROBLEM Cannot PUT /api/product/ | SOLUTION: Add a forward slash at the begining of the route

// setting up a delete request to delete a product
app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        

        res.status(200).json({ message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//PROBLEM:"Cannot access 'product' before initialization" | SOLUTION: Define product (line 71) before the if statement



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

