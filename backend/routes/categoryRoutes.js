const express = require('express');
const Category = require('../models/categoryModel');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all categories (public)
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Create category (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  const category = await Category.create({ name: req.body.name });
  res.status(201).json(category);
});

module.exports = router;
