const mongoose = require('mongoose');
const participant = require('./Participant');
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true},
     // Example field for the team name
    members: [{
        type:mongoose.Schema.Types.ObjectId, 
        default:[] ,// Default value for the members field
        ref: 'Participant' // Replace 'Participant' with the actual model name for team members
    }],
    challenge:[{
        type:mongoose.Schema.Types.ObjectId,    
        default:[] ,// Default value for the challenge field
        ref:'Challenge'// Replace 'Challenge' with the actual model name for the challenge
    }]
    });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;