import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', form);
      alert('Registration successful! Now login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" className="form-control mb-2" placeholder="Username" onChange={handleChange} required />
      <input name="email" type="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} required />
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default RegisterForm;
