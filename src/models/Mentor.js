const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
 name:{
  type:String,
  required:true,
  unique:true,
 },
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
  role: {
    type: String,
    default: '3' // Default value for the role field
  },
  
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
