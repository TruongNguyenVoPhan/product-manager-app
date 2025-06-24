const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

require('./db'); // Kết nối MongoDB
const Product = require('./productModel'); // Model

app.use(express.json());
app.use(cors());

// Get all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add new product
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved);
});

// Update product
app.put('/products/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete product
app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
