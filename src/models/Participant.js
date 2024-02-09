
const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
 username : String ,
 email : String ,
});

module.exports = mongoose.model('User', participantSchema);