const mongoose = require('mongoose');
const participant = require('./Participant');
const teamSchema = new mongoose.Schema({
    name: String, // Example field for the team name
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'participant' // Replace 'Participant' with the actual model name for team members
    }]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;