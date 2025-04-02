import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const res = await axios.post('/api/users/login', form);
  
      // 🔍 Debug output
      console.log('Login response:', res.data);
  
      if (res.data?.token && res.data?.username) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        navigate('/');
      } else {
        setError('Something went wrong. Please try again.');
      }      
  
    } catch (err) {
      console.error('Login error:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
      <input
        name="username"
        className="form-control mb-2"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn btn-success w-full">Login</button>
    </form>
  );
};

export default LoginForm;
