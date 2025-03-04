// src/components/SignOutButton.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css';

const SignOutButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (location.pathname !== '/track') {
    return null;
  }

  return (
    <button className="signout-button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;