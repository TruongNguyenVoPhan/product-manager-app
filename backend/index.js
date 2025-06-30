const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const authRoutes = require('./authRoutes'); // Đường dẫn đến authRoutes
const authMiddleware = require('./authMiddleware'); // Middleware xác thực

require('./db'); // Kết nối MongoDB
const Product = require('./productModel'); // Model

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes); // Sử dụng authRoutes
app.use('/products',authMiddleware); // Sử dụng middleware xác thực cho các route bên dưới

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
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          imageUrl: req.body.imageUrl || '',
        },
      },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Update failed", error });
  }
});


// Delete product
app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
