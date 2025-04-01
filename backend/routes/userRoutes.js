const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  res.status(201).json({ message: 'User registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user._id }, 'secret123', { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
});

module.exports = router;
