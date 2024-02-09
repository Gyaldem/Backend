const mongoose = require('mongoose');
const EventManager = require('./EvenetManager');
 
const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }],
  judges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Judge' }],
  description: String,
  challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  theme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme' },
  agenda: [
    {
      startTime: Date,
      endTime: Date,
      title: String,
      description: String
    }
  ],
  countdownEndTime: Date,
  eventManager: { type: mongoose.Schema.Types.ObjectId, ref: 'EventManager' }
});

// Define static method for the event schema
eventSchema.statics.calculateRemainingTime = function (countdownEndTime) {
  const currentTime = new Date();
  const remainingTime = new Date(countdownEndTime - currentTime);
  return remainingTime;
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;