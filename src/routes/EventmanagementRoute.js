const express = require('express');
const router = express.Router();

const { generateSpacesFromExcel } = require('../controllers/EventManagerCont'); // Import the specific function

router.post('/generate-spaces', generateSpacesFromExcel); // Use the function as the callback

module.exports = router;


router.post('/add-judge', (req, res) => {
    // Code to handle adding a judge
});