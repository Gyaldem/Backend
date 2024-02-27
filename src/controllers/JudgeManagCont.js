const emailSender = require('../Utils/emailSender');
const Judge = require('../models/Judge');
const { generatePasswordHash,generateRandomPassword } = require('./utils/passwordUtils');

// -------------------------------------------------------------------------
/**
 * Add a new judge.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The saved judge object.
 * @throws {Error} - If there is an error creating the judge.
 */
const addJudge = async (req, res) => {
    try {
        const { name, email, specialization,linkedIn} = req.body;
        password=generateRandomPassword(8);
        const hashedPassword = await generatePasswordHash(password);
       
        const newJudge = new Judge({
            name:name,
            email:email,
            specialization:specialization,
            linkedIn:linkedIn,
            password: hashedPassword
        });
        emailSender({receiver:email,name:name,password:password,link:process.env.LINK});
        const savedJudge = await newJudge.save();
        res.status(201).json(savedJudge);
    } catch (error) {
        console.error('Error creating judge:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// -------------------------------------------------------------------------
const getJudgeById = async (req, res) => {
    try {
        const judgeId = req.query.email;

       
        const judge = await Judge.findById(judgeId);

        res.json(judge);
    } catch (error) {
        console.error('Error retrieving judge:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// -------------------------------------------------------------------------
/**
 * Updates the profile of a judge.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the judge profile is updated.
 * @throws {Error} - If there is an error updating the judge profile.
 */
const updateJudgeProfile = async (req, res) => {
    try {
        const judgeId = req.query.email;
        const { name, email, specialization,linkedIn} = req.body;

        // Update judge profile in the database
        const updatedJudge = await Judge.findByIdAndUpdate(judgeId, {
            name:name,
            email:email,
            specialization:specialization,
            linkedIn:linkedIn,
        });
        
        emailSender({receiver:email,name:name,link:process.env.LINK});
        res.json(updatedJudge);
    } catch (error) {
        console.error('Error updating judge profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// -------------------------------------------------------------------------
/**
 * Deletes a judge from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the judge is deleted.
 * @throws {Error} - If there is an error deleting the judge.
 */
const deleteJudge = async (req, res) => {
    try {
        const judgeId = req.query.email;
        await Judge.findByIdAndDelete(judgeId);

        res.status(204).end();
    } catch (error) {
        console.error('Error deleting judge:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// -------------------------------------------------------------------------
module.exports = {
    addJudge,
    getJudgeById,
    updateJudgeProfile,
    deleteJudge
};
