// models/Flight.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flightNumber: String,
  departure: String,
  arrival: String,
  status: String,
});

module.exports = mongoose.model('Flight', flightSchema);