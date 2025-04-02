import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';

const AddEvent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Event</h2>
      <EventForm />
    </div>
  );
};

export default AddEvent;
