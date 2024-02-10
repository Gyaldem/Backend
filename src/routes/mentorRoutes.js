const express = require('express');
const router = express.Router();
const {
  addMentor,
  updateMentorProfile,
  deleteMentor
} = require('../controllers/MentorCont');

// Add a new mentor
router.post('/', addMentor);

// Get mentor by ID

// Update mentor profile
router.put('/:id', updateMentorProfile);

// Delete a mentor by ID
router.delete('/delete/:id', deleteMentor);

module.exports = router;