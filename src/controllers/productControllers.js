const Product = require("../models/productModels")

exports.getProduct = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.addProduct = async (req, res) => {
    const { productName, productDescription, brand, model, stock, price } = req.body;
    // Build full URL if file exists:
    const imageUrl = req.file
      ? req.protocol + "://" + req.get("host") + "/" + req.file.path.replace(/\\/g, "/")
      : null;
    try {
        const newProduct = new Product({
            productName,
            productDescription,
            brand,
            model,
            stock,
            price,
            imageUrl, // now a full URL!
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};
