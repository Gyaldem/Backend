

const Event = require('../models/Event');

const showEventCountdown = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    const remainingTime = Event.calculateRemainingTime(event.countdownEndTime);
    res.render('eventCountdown', { remainingTime });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  showEventCountdown
};
