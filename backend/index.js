const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const authRoutes = require('./authRoutes');
const authMiddleware = require('./authMiddleware');

require('./db');
const Product = require('./productModel');
const Category = require('./categoryModel');

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/products', authMiddleware);


app.use('/categories', authMiddleware);

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved);
});

app.put('/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          imageUrl: req.body.imageUrl || '',
          description: req.body.description,
          quantity: req.body.quantity,
          category: req.body.category
        },
      },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
});

app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.get('/products', async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
  }
});


app.post('/categories', async (req, res) => {
  try {
    const newCategory = new Category({ name: req.body.name });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create category', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
