const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    description: String,
    imageUrl: String
}, { collection: 'products' });

module.exports = mongoose.model("Product", productSchema, "products");
