// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Dashboard
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    let sales = 50000000;
    let orders = 15000000;

    let inStock = products.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    let outStock = products.filter((item) => item.quantity === 0).length;

    res.render("products", {
      products,
      sales: sales.toLocaleString(),
      orders: orders.toLocaleString(),
      inStock: inStock.toLocaleString(),
      outStock,
    });
  } catch (error) {
    console.log(error);
  }
});

// Add Product
router.post("/products/add", async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      color: req.body.color,
    });

    await newProduct.save();

    res.redirect("/products");
  } catch (error) {
    console.log(error);
  }
});


router.get('/home', (req, res) => {
  res.render('home');
});

router.post('/home', (req, res) => {
    console.log(req.body);
    res.redirect('/products');
});

module.exports = router;
