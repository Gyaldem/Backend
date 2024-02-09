const mongoose = require('mongoose');


const participantSchema = new mongoose.Schema({
  role :
  {
    type:String , 
    required : true
  } ,
      email: {
        type: String,
        required: true,
        unique: true
      },
 teamId : mongoose.Schema.Types.ObjectId ,
 password : {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model('Participant', participantSchema);