const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Use controller logic here
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
