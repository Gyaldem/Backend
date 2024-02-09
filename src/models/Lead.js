const mongoose = require('mongoose');
const LeadSchema = new mongoose.Schema({
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
    default: '1' // Default value for the role field
  },
});
const Lead = mongoose.model('Lead', LeadSchema);

module.exports = Lead;