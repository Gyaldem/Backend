const mongoose = require('mongoose');


const participantSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true
      },
 teamname:String,
 password : {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model('Participant', participantSchema);