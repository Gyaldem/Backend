const mongoose = require('mongoose');
const participant = require('./Participant');

const teamSchema = new mongoose.Schema({
members : [participant] 
});

module.exports = mongoose.model('Team', teamSchema);