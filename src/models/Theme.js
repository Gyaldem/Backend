const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  guidelines: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
    ref: 'Event',
  },

});

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;
