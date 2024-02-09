const express = require('express');
const router = express.Router();

const fetchParticipantsFromMongoDB=require('../Utils/fecthing') // Import the specific function

router.get('/fetch-Particpant', fetchParticipantsFromMongoDB); // Use the function as the callback

module.exports = router;
