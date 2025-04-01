import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    imageUrl: '',
    category: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first');

    try {
      await axios.post('/api/events', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Event submitted for approval');
      setForm({ title: '', description: '', location: '', date: '', imageUrl: '', category: '' });
    } catch (err) {
      console.error(err);
      alert('Error creating event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <input name="title" className="form-control" placeholder="Title" value={form.title} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <textarea name="description" className="form-control" placeholder="Description" value={form.description} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <input name="location" className="form-control" placeholder="Location" value={form.location} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <input name="date" type="date" className="form-control" value={form.date} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input name="imageUrl" className="form-control" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <select name="category" className="form-select" value={form.category} onChange={handleChange} required>
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Create Event</button>
    </form>
  );
};

export default EventForm;
