const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the product"]
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: false
    },
},
{
    timestamps: true // automatically add the createdAt and updatedAt fields
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product; // export the model to be used in the controller