const EventManager = require('../models/EventManager');


const getEventManagerById = async (req, res) => {
  try {
    const eventManagerId = req.params.id;
    const eventManager = await EventManager.findById(eventManagerId).populate('managedEvents'); 
    if (!eventManager) {
      return res.status(404).json({ error: 'Event manager not found' });
    }
    res.json(eventManager);
  } catch (error) {
    console.error('Error fetching event manager by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getEventManagerById
};






