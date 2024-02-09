const mongoose = require('mongoose');
const mentorSchema = new mongoose.Schema({
 username : String ,
 email : String ,
 skill : String ,
 password : String
});

module.exports = mongoose.model('Mentor', mentorSchema);