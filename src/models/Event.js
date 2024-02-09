const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String, 
  date: Date, 
  teams: [{ type: String, ref: 'Team' }], 
  mentors: [{ type: String, ref: 'Mentor' }], 
  judges: [{ type: String, ref: 'Judge' }],
  description: String,
  challenges: [{ type: String, ref: 'Challenge' }],
  theme: { type: String, ref: 'Theme' }, 
  agenda: [
    {
      startTime: Date, 
      endTime: Date, 
      title: String, 
      description: String 
    }
  ],
  countdownEndTime: Date
});

// Define static method for the event schema
eventSchema.statics.calculateRemainingTime = function (countdownEndTime) {
  const currentTime = new Date();
  const remainingTime = new Date(countdownEndTime - currentTime);
  return remainingTime;
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
