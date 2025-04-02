import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2">
      <Link className="navbar-brand fw-bold" to="/">City Events</Link>
      <div className="ms-auto d-flex align-items-center gap-2">
        <Link className="btn btn-outline-light" to="/">Home</Link>
        {username && (
          <Link className="btn btn-outline-light" to="/add">Add Event</Link>
        )}
        {!username ? (
          <>
            <Link className="btn btn-outline-light" to="/login">Login</Link>
            <Link className="btn btn-outline-light" to="/register">Register</Link>
          </>
        ) : (
          <>
            <span className="text-light me-2">Welcome, {username}!</span>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
