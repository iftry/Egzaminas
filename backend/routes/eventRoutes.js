const express = require('express');
const Event = require('../models/eventModel');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all approved events
router.get('/', async (req, res) => {
  const events = await Event.find({ isApproved: true }).populate('category user');
  res.json(events);
});

// Create event (auth)
router.post('/', protect, async (req, res) => {
  const event = await Event.create({ ...req.body, user: req.user._id });
  res.status(201).json(event);
});

// Approve event (admin only)
router.patch('/:id/approve', protect, adminOnly, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  event.isApproved = true;
  await event.save();
  res.json({ message: 'Event approved' });
});

// Update own event
router.put('/:id', protect, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Not found' });
  if (event.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

  Object.assign(event, req.body);
  await event.save();
  res.json(event);
});

// Delete own event
router.delete('/:id', protect, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Not found' });
  if (event.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

  await event.remove();
  res.json({ message: 'Event deleted' });
});

module.exports = router;
