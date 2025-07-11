const express = require('express');
const router = express.Router();
const Category = require('../Models/categoryModel');
const authMiddleware = require('../authMiddleware');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
  }
});

// GET /categories/with-count
router.get('/with-count', authMiddleware, async (req, res) => {
  try {
    const result = await Category.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products',
        },
      },
      {
        $project: {
          name: 1,
          productCount: { $size: '$products' },
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories with count', error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const newCategory = new Category({ name: req.body.name });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create category', error: err.message });
  }
});

module.exports = router;