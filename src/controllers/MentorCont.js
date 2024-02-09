const Mentor = require('../models/Mentor');
const { generatePasswordHash } = require('./utils/passwordUtils');

// Controller function to create a new mentor
const addMentor = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        
        const hashedPassword = await generatePasswordHash(password);

        
        const newMentor = new Mentor({
            username,
            email,
            password: hashedPassword
        });

        // Save the new mentor to the database
        const savedMentor = await newMentor.save();

        res.status(201).json(savedMentor);
    } catch (error) {
        console.error('Error creating mentor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to retrieve mentor information
const getMentorById = async (req, res) => {
    try {
        const mentorId = req.params.id;

        // Find the mentor by ID in the database
        const mentor = await Mentor.findById(mentorId);

        res.json(mentor);
    } catch (error) {
        console.error('Error retrieving mentor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to update mentor profile
const updateMentorProfile = async (req, res) => {
    try {
        const mentorId = req.params.id;
        const { username, email, newPassword } = req.body;

        // Hash the new password if provided
        let hashedPassword;
        if (newPassword) {
            hashedPassword = await generatePasswordHash(newPassword);
        }

        // Update mentor profile in the database
        const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, {
            username,
            email,
            password: hashedPassword // Update password if provided
        }, { new: true });

        res.json(updatedMentor);
    } catch (error) {
        console.error('Error updating mentor profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to delete mentor
const deleteMentor = async (req, res) => {
    try {
        const mentorId = req.params.id;

        // Delete mentor from the database
        await Mentor.findByIdAndDelete(mentorId);

        res.status(204).end();
    } catch (error) {
        console.error('Error deleting mentor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addMentor,
    getMentorById,
    updateMentorProfile,
    deleteMentor
};
