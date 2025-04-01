const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secret123');
      req.user = await User.findById(decoded.id).select('-password');
      if (req.user.isBlocked) return res.status(403).json({ message: 'User is blocked' });
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin only' });
  }
};

module.exports = { protect, adminOnly };
