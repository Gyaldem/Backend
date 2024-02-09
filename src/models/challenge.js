const mongoose = require('mongoose');


const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
 
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
