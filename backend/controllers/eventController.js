const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModel');

// @desc    Get all approved events
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ isApproved: true }).populate('category').populate('user', 'username');
  res.status(200).json(events);
});

// @desc    Create a new event
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, category } = req.body;

  if (!title || !description || !date || !location || !category) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const event = new Event({
    title,
    description,
    date,
    location,
    category,
    user: req.user._id,
  });

  const created = await event.save();
  res.status(201).json(created);
});

// @desc    Approve an event (admin only)
const approveEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  event.isApproved = true;
  await event.save();
  res.json({ message: 'Event approved' });
});

// @desc    Update user's own event
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  if (event.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only edit your own events');
  }

  Object.assign(event, req.body);
  const updated = await event.save();
  res.json(updated);
});

// @desc    Delete user's own event
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  if (event.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only delete your own events');
  }

  await event.remove();
  res.json({ message: 'Event deleted' });
});

module.exports = {
  getEvents,
  createEvent,
  approveEvent,
  updateEvent,
  deleteEvent,
};
