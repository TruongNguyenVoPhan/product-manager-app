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

router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update category', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category', error: err.message });
  }
});

router.put('/:id/lock', authMiddleware, async (req, res) => {
  const categoryId = req.params.id;
  const username = req.user.username;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if(!category.editLock?.isLocked || category.editLock.lockedBy === username) {
     category.editLock = {
        isLocked: true,
        lockedBy: username,
        lockedAt: new Date()
      };
      await category.save();
      res.json({ message: 'Category locked successfully' });
      return;
    }else {
      return res.status(409).json({ message: 'Category is already locked by another user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to lock category', error: error.message });
  }
});

module.exports = router;