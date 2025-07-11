const express = require('express');
const router = express.Router();
const Product = require('../Models/productModel')
const authMiddleware = require('../authMiddleware');

// GET all or filtered
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const products = await Product.find(filter).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

// POST new product
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved);
});

// PUT update
router.put('/:id', async (req, res) => {
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

// DELETE
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

router.put('/:id/lock',authMiddleware, async (req, res) => {
  const productId = req.params.id;
  const username = req.user.username;

  try {
    const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

   // Nếu chưa bị khóa hoặc đang bị chính user này khóa → cho phép khóa
  if (!product.editLock?.isLocked || product.editLock.lockedBy === username){
    product.editLock = {
      isLocked: true,
      lockedBy: username,
      lockedAt: new Date()
    }
    await product.save();
    res.json({ message: 'Product locked for editing' });
  } else {
    res.status(409).json({ message: 'Product is already locked by another user' });
  }
  } catch (err) {
    res.status(500).json({ message: 'Failed to lock product', error: err.message });
  }
});


module.exports = router;
