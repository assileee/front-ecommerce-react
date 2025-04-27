const express = require("express");
const router = express.Router();
const { getProduct, addProduct } = require("../controllers/productControllers");
const { verifyAdmin, verifyToken } = require("../middleware/auth");
const upload = require("../middleware/multerConfig");

// Get products
router.get('/seeProduct', getProduct);

// Add product (admin only)
router.post(
  '/addProduct',
  verifyAdmin, // Change to verifyToken if you want regular users to add products
  upload.single("image"),
  addProduct
);

// ✅ NEW: Delete product (admin only)
router.delete(
  '/deleteProduct/:id',
  verifyAdmin,
  async (req, res) => {
    try {
      // Import your Product model here or at the top
      const Product = require("../models/productModels");
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
