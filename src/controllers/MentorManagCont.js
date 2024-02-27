
const Mentor = require('../models/Mentor');

/**
 * Add a new mentor.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the mentor is added successfully.
 * @throws {Error} - If there is an error creating the mentor.
 */
const addMentor = async (req, res) => {
    try {
        const { name, email, specialization, linkedIn } = req.body;
        const password = generateRandomPassword(8);
        const hashedPassword = await generatePasswordHash(password);

        const newMentor = new Mentor({
            name: name,
            email: email,
            specialization: specialization,
            linkedIn: linkedIn,
            password: hashedPassword
        });

        emailSender({ receiver: email, name: name, password: password, link: process.env.LINK });

        const savedMentor = await newMentor.save();
        res.status(201).json(savedMentor);
    } catch (error) {
        console.error('Error creating mentor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Deletes a mentor by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the mentor is deleted.
 */
const deleteMentor = async (req, res) => {
    try {
        const mentorId = req.params.id;
        await Mentor.findByIdAndDelete(mentorId);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting mentor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Updates the mentor profile in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the updated mentor profile.
 * @throws {Error} - If there is an error updating the mentor profile.
 */
const updateMentorProfile = async (req, res) => {
    try {
        const mentorId = req.query.email;
        const { name, email, specialization, linkedIn } = req.body;

        // Update mentor profile in the database
        const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, {
            name: name,
            email: email,
            specialization: specialization,
            linkedIn: linkedIn,
        });

        emailSender({ receiver: email, name: name, link: process.env.LINK });
        res.json(updatedMentor);
    } catch (error) {
        console.error('Error updating mentor profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {  
    addMentor
 };