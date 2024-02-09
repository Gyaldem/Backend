const express = require('express');
const router = express.Router();
const {
  AddParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipantProfile,
  deleteParticipantById
} = require('../controllers/ParticipantCont');

// Add a new participant
router.post('/', async (req, res) => {
  const { username, email, teamId } = req.body;
  await AddParticipant(username, email, teamId);
  res.sendStatus(201);
});

// Get all participants
router.get('/', getAllParticipants);

// Get participant by ID
router.get('/:id', getParticipantById);

// Update participant profile
router.put('/:id', updateParticipantProfile);

// Delete a participant by ID
router.delete('/:id', deleteParticipantById);

module.exports = router;
