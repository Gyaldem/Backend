const mongoose = require('mongoose');
const judgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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