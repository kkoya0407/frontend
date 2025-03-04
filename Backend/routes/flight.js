// backend/routes/flight.js
const express = require('express');
const unirest = require('unirest');
const router = express.Router();

// Replace with your actual API key
const API_KEY = '674b961a1033a3c06e283548';

router.get('/track', async (req, res) => {
  const { num, name, date } = req.query;

  console.log('Received request to track flight:', { num, name, date });

  try {
    const response = await unirest.get(`https://api.flightapi.io/airline/${API_KEY}`)
      .query({ num, name, date });

    console.log('Flight data fetched successfully:', response.body);
    res.json(response.body);
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;