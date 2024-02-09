const Lead = require('../models/Lead');
const { generatePasswordHash } = require('./utils/passwordUtils');
const Event = require('../models/Event');
const EventManager = require('../models/EventManager');
// -------------------------------------------------------------------------
const updateLeadProfile = async (req, res) => {
    try {
        const leadId = req.params.id;
        const { name, email, newPassword } = req.body;

        // Hash the new password if provided
        let hashedPassword;
        if (newPassword) {
            hashedPassword = await generatePasswordHash(newPassword);
        }

        // Update lead profile in the database
        const updatedLead = await Lead.findByIdAndUpdate(leadId, {
            name,
            email,
            password: hashedPassword // Update password if provided
        }, { new: true });

        res.json(updatedLead);
    } catch (error) {
        console.error('Error updating lead profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// -------------------------------------------------------------------------
// Function to add an event and specify the event manager
const addEventAndAssignManager = async (req, res) => {
  try {
    const eventData = req.body; // Assuming event data is sent in the request body
    const eventManagerId = req.params.eventManagerId; // Assuming the event manager ID is specified in the URL parameters
    
    // Create a new event
    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();
    
    // Update the event manager to include the newly created event
    const updatedEventManager = await EventManager.findByIdAndUpdate(
      eventManagerId,
      { $push: { managedEvents: savedEvent._id } }, // Add the event ID to the managedEvents array
      { new: true }
    );

    if (!updatedEventManager) {
      return res.status(404).json({ error: 'Event manager not found' });
    }

    res.status(201).json(savedEvent); // Respond with the created event
  } catch (error) {
    console.error('Error adding event and assigning manager:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addEventAndAssignManager
};


module.exports = {
    updateLeadProfile
};
