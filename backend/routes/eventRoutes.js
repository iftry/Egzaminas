const express = require('express');
const {
  getEvents,
  createEvent,
  approveEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all approved events
// @access  Public
router.get('/', getEvents);

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (logged-in users)
router.post('/', protect, createEvent);

// @route   PATCH /api/events/:id/approve
// @desc    Approve an event
// @access  Private (admin only)
router.patch('/:id/approve', protect, adminOnly, approveEvent);

// @route   PUT /api/events/:id
// @desc    Update user's own event
// @access  Private
router.put('/:id', protect, updateEvent);

// @route   DELETE /api/events/:id
// @desc    Delete user's own event
// @access  Private
router.delete('/:id', protect, deleteEvent);

module.exports = router;
