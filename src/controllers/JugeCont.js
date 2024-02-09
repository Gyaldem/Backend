const Judge = require('../models/Judge');
const { generatePasswordHash } = require('./utils/passwordUtils');

// -------------------------------------------------------------------------
const addJudge = async (req, res) => {
    try {
        const { name, email, specialization, password } = req.body;

     
        const hashedPassword = await generatePasswordHash(password);

       
        const newJudge = new Judge({
            name,
            email,
            specialization,
            password: hashedPassword
        });

    
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
        const judgeId = req.params.id;

       
        const judge = await Judge.findById(judgeId);

        res.json(judge);
    } catch (error) {
        console.error('Error retrieving judge:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// -------------------------------------------------------------------------
const updateJudgeProfile = async (req, res) => {
    try {
        const judgeId = req.params.id;
        const { name, email, specialization, newPassword } = req.body;

        // Hash the new password if provided
        let hashedPassword;
        if (newPassword) {
            hashedPassword = await generatePasswordHash(newPassword);
        }

        // Update judge profile in the database
        const updatedJudge = await Judge.findByIdAndUpdate(judgeId, {
            name,
            email,
            specialization,
            password: hashedPassword // Update password if provided
        }, { new: true });

        res.json(updatedJudge);
    } catch (error) {
        console.error('Error updating judge profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// -------------------------------------------------------------------------
const deleteJudge = async (req, res) => {
    try {
        const judgeId = req.params.id;

        
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
