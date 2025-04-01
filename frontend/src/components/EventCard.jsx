import React from 'react';
import RatingStars from './RatingStars';

const EventCard = ({ event }) => {
  return (
    <div className="card h-100 shadow">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          className="card-img-top"
          alt={event.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">{event.description}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <RatingStars eventId={event._id} />
      </div>
    </div>
  );
};

export default EventCard;
