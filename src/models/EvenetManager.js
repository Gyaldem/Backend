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
  role :"2"
  // Other fields specific to EventManager
});

const EventManager = mongoose.model('EventManager', eventManagerSchema);
module.exports = EventManager;