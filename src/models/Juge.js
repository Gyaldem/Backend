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
  }
  
  
});
const Judge = mongoose.model('Judge', judgeSchema);

module.exports = Judge;