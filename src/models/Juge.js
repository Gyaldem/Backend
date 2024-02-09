const mongoose = require('mongoose');
const judgeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  linkedIn: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: '5' // Default value for the role field
  },
  
  
});
const Judge = mongoose.model('Judge', judgeSchema);

module.exports = Judge;