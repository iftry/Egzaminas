import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">City Events</Link>
      <div>
        <Link className="btn btn-outline-light me-2" to="/">Home</Link>
        <Link className="btn btn-outline-light me-2" to="/add">Add Event</Link>
        <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
        <Link className="btn btn-outline-light" to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Header;
