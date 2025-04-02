const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Category = require('./models/categoryModel');
const connectDB = require('./config/db');

const categories = [
  { name: 'Concert' },
  { name: 'Theater' },
  { name: 'Cinema' },
  { name: 'Sports' },
  { name: 'Exhibition' },
];

const seedCategories = async () => {
  try {
    await connectDB();
    await Category.deleteMany(); // Clear existing
    await Category.insertMany(categories);
    console.log('Categories seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCategories();
