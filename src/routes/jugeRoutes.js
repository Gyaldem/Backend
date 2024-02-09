const express = require('express');
const router = express.Router();
const {
  addJudge,
  getJudgeById,
  updateJudgeProfile,
  deleteJudge
} = require('../controllers/judgeCont');

// Add a new judge
router.post('/', addJudge);

// Get judge by ID
router.get('/:id', getJudgeById);

// Update judge profile
router.put('/:id', updateJudgeProfile);

// Delete a judge
router.delete('/:id', deleteJudge);

module.exports = router;
