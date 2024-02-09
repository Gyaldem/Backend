const Submission = require('../models/submission');

// Controller function to create a new submission
const createSubmission = async (req, res) => {
    try {
        const submissionData = req.body;
        const newSubmission = new Submission(submissionData);
        const savedSubmission = await newSubmission.save();
        res.status(201).json(savedSubmission);
    } catch (error) {
        console.error('Error creating submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Other controller functions for updating, deleting, or retrieving submissions can be added here as needed

module.exports = {
    createSubmission
};
