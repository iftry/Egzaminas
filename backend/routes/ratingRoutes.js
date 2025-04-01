const express = require('express');
const Rating = require('../models/ratingModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Add or update rating
router.post('/', protect, async (req, res) => {
  const { eventId, rating } = req.body;
  let userRating = await Rating.findOne({ user: req.user._id, event: eventId });

  if (userRating) {
    userRating.rating = rating;
    await userRating.save();
  } else {
    userRating = await Rating.create({ user: req.user._id, event: eventId, rating });
  }

  res.status(200).json(userRating);
});

// Get total rating count for event
router.get('/:eventId', async (req, res) => {
  const ratings = await Rating.find({ event: req.params.eventId });
  const total = ratings.reduce((sum, r) => sum + r.rating, 0);
  res.json({ count: ratings.length, total });
});

module.exports = router;
