// src/components/FlightTracker.js
import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const FlightTracker = () => {
  const [num, setNum] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFlightData(null);

    console.log('Submitting flight tracking request:', { num, name, date });

    try {
      const response = await axios.get('http://localhost:4000/api/flights/track', {
        params: {
          num,
          name,
          date,
        },
      });
      console.log('Flight data received:', response.data);
      setFlightData(response.data);
    } catch (err) {
      console.error('Error fetching flight data:', err.message);
      setError('Failed to fetch flight data');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Track Flight</h2>
        <input
          type="text"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="Flight Number"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Airline Code"
          required
        />
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date (YYYYMMDD)"
          required
        />
        <button type="submit">Track</button>
      </form>
      {error && <p className="error">{error}</p>}
      {flightData && (
        <div className="flight-data">
          <h3>Flight Information</h3>
          {Array.isArray(flightData) ? (
            flightData.map((info, index) => (
              <div key={index}>
                {info.departure && (
                  <div>
                    <h4>Departure</h4>
                    <p>Airport: {info.departure[0]["Airport:"]}</p>
                    <p>Scheduled Time: {info.departure[0]["Scheduled Time:"]}</p>
                    <p>Takeoff Time: {info.departure[0]["Takeoff Time:"]}</p>
                    <p>Terminal - Gate: {info.departure[0]["Terminal - Gate:"]}</p>
                  </div>
                )}
                {info.arrival && (
                  <div>
                    <h4>Arrival</h4>
                    <p>Airport: {info.arrival[0]["Airport:"]}</p>
                    <p>Scheduled Time: {info.arrival[0]["Scheduled Time:"]}</p>
                    <p>At Gate Time: {info.arrival[0]["At Gate Time:"]}</p>
                    <p>Terminal - Gate: {info.arrival[0]["Terminal - Gate:"]}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No flight data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightTracker;