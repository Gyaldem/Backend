const mongoose = require('mongoose');


const participantSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true
      },
 teamId : String ,
 password : {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model('Participant', participantSchema);