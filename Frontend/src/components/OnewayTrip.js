// src/components/OnewayTrip.js
import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const OnewayTrip = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [classType, setClassType] = useState('Economy');
  const [currency, setCurrency] = useState('USD');
  const [tripData, setTripData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTripData(null);

    try {
      const response = await axios.get(`https://api.flightapi.io/onewaytrip/67450e596d44d8b45223fbcd/${from}/${to}/${date}/${adults}/${children}/${infants}/${classType}/${currency}`);
      setTripData(response.data);
    } catch (err) {
      setError('Failed to fetch trip data');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Search Oneway Trip</h2>
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From (Airport Code)"
          required
        />
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To (Airport Code)"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          required
        />
        <input
          type="number"
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
          placeholder="Adults"
          min="1"
          required
        />
        <input
          type="number"
          value={children}
          onChange={(e) => setChildren(e.target.value)}
          placeholder="Children"
          min="0"
        />
        <input
          type="number"
          value={infants}
          onChange={(e) => setInfants(e.target.value)}
          placeholder="Infants"
          min="0"
        />
        <select value={classType} onChange={(e) => setClassType(e.target.value)}>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First">First</option>
        </select>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {tripData && (
        <div className="trip-data">
          <h3>Trip Information</h3>
          <pre>{JSON.stringify(tripData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OnewayTrip;