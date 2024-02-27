
const Event = require('../models/Event');

/**
 * Adds a file to an event and updates the event's files array.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the file is uploaded successfully.
 * @throws {Error} - If there is an error uploading the file.
 */
const addFile = async(req, res) => {
    try {
        const file = req.quer.file
        const event=req.query.event
        if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
        }
        await Event.findByIdAndUpdate(event, { $push: { files: file } });
        res.json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Adds a challenge to an event.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.event - The ID of the event.
 * @param {string} req.body.challenge - The challenge to be added.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
const addChallengeToEvent = async (req,res) => {
  try {
    const eventId = req.body.event;
    const challenge = req.body.challenge;
    await Event.findByIdAndUpdate(eventId, { $push: { challenges: challenge } });
    return res.status(200).json({ message: 'Challenge added successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Fetches challenges from an event.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the challenges are fetched.
 */
const fetchChallengeFromEvent = async (req,res) => {
  try {
    const eventId = req.body.event;
    const event = await Event.findById(eventId);
    return res.status(200).json({ message: 'Challenge added successfully',
    challenges: event.challenges
  });
  } catch (error) {   
    return res.status(500).json({ error: 'Internal Server Error' });
  } 
}

module.exports = {
    addFile,
    addChallengeToEvent
}