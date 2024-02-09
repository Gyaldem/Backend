const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// Route to update lead profile
router.put('/leads/:id', leadController.updateLeadProfile);

// Route to add an event and specify the event manager
router.post('/eventManager/:eventManagerId/events', leadController.addEventAndAssignManager);

module.exports = router;
