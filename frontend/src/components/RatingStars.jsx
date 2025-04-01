import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingStars = ({ eventId }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios.get(`/api/ratings/${eventId}`)
      .then(res => {
        if (res.data.count > 0) {
          const average = res.data.total / res.data.count;
          setRating(Math.round(average));
        }
      })
      .catch(err => console.error(err));
  }, [eventId]);

  const handleClick = (value) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('You must be logged in to rate.');

    axios.post('/api/ratings', {
      eventId,
      rating: value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setRating(value))
      .catch(err => console.error(err));
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map(val => (
        <i
          key={val}
          className={`bi ${val <= rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}`}
          style={{ cursor: 'pointer', fontSize: '1.2rem' }}
          onClick={() => handleClick(val)}
        ></i>
      ))}
    </div>
  );
};

export default RatingStars;
