import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isPrivate, setIsPrivate] = useState(localStorage.getItem('isPrivate') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ username: localStorage.getItem('username') });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isPrivate');
    setUser(null);
    navigate('/login');
  };

  const handlePrivacyChange = async (e) => {
    const newPrivacy = e.target.value === 'true';
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/update-privacy`,
        { isPrivate: newPrivacy },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setIsPrivate(newPrivacy);
      localStorage.setItem('isPrivate', newPrivacy);
    } catch (err) {
      console.error('Error updating privacy:', err);
    }
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">EchoJar</Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white">Welcome, {user.username}</span>
              <select
                value={isPrivate}
                onChange={handlePrivacyChange}
                className="p-2 rounded-lg"
              >
                <option value={false}>Public</option>
                <option value={true}>Private</option>
              </select>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">Login</Link>
              <Link to="/register" className="text-white hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
