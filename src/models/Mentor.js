const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  } ,
  specialization : {
    required: true ,
    type: String
  },
  linkedinUrl:{
    required:true,
    type:String
  },
  
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
