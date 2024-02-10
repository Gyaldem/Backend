const express = require('express');
const router = express.Router();

const { generateSpacesFromExcel } = require('../controllers/EventManagerCont'); // Import the specific function
const {AddEventManager}=require('../controllers/EventManagerCont');
router.post('/generate-spaces', generateSpacesFromExcel); // Use the function as the callback

router.post('/addEventManager',AddEventManager);

<<<<<<< HEAD
=======
router.post('/add-judge', (req, res) => {
    // Code to handle adding a judge
});
module.exports = router;
>>>>>>> efab0d382f5f4b264267e47d4c2af1ab0b1ffb29
