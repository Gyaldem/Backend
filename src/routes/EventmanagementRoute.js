const express = require('express');
const router = express.Router();

const { generateSpacesFromExcel } = require('../controllers/EventManagerCont'); // Import the specific function
const {AddEventManager}=require('../controllers/EventManagerCont');
const {AddParticipant}=require('../controllers/EventManagerCont');
router.post('/generate-spaces', generateSpacesFromExcel); // Use the function as the callback

router.post('/addEventManager',AddEventManager);
router.post('/add-Participant', AddParticipant);
router.post('/add-judge', (req, res) => {
    // Code to handle adding a judge
});
module.exports = router;
