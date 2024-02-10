const mongoose = require('mongoose');

const eventManagerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: '2' // Default value for the role field
  },
  // Other fields specific to EventManager
});

const EventManager = mongoose.model('EventManager', eventManagerSchema);
module.exports = EventManager;