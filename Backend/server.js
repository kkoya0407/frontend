// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const flightRoutes = require('./routes/flight');
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://kchanhee55:3jlOzlMHs235s1bX@cluster99.tk6wg.mongodb.net/flight-tracking?retryWrites=true&w=majority&appName=Cluster99';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});