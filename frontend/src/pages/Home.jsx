import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.length === 0 && <p>No events yet.</p>}
      <div className="row">
        {events.map(event => (
          <div className="col-md-4 mb-3" key={event._id}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
