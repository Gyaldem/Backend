const express = require('express');
const router = express.Router();

const {fetchParticipantsFromMongoDB,fetchJudgesFromMongoDB,fetchMentorsFromMongoDB,
    fetchTeamsFromMongoDB}=require('../Utils/fecthing') // Import the specific function


router.get('/fetch-Particpant', fetchParticipantsFromMongoDB); // Use the function as the callback
router.get('/fetch-Mentors',fetchMentorsFromMongoDB)
router.get('/fetch-Judges',fetchJudgesFromMongoDB)
router.get('/fetch-Teams',fetchTeamsFromMongoDB)

module.exports = router;
