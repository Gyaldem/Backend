const mongoose = require('mongoose');


const participantSchema = new mongoose.Schema({
 username : String ,
 teamId : String ,
 email : String ,
 password : String ,
});

module.exports = mongoose.model('Participant', participantSchema);