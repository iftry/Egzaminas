import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.user.username);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" className="form-control mb-2" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} required />
      <button type="submit" className="btn btn-success">Login</button>
    </form>
  );
};

export default LoginForm;
