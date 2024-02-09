const mongoose = require('mongoose');
const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  
});
const Lead = mongoose.model('Lead', LeadSchema);

module.exports = Lead;