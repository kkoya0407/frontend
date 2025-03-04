// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <img src="/plane.png" alt="Flight" className="home-image" />
      <h1 className="home-header">Welcome to MyFlightTracker</h1>
      <h2 className="home-subheader">Search your flight with ease!</h2>
      <div className="home-buttons">
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="home-button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;