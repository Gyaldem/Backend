const express = require('express');
const mongoose = require('mongoose');
const Event = require('./models/Event'); // Import the Event model


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Db')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create a sample event
const createSampleEvent = async () => {
  try {
    const sampleEvent = new Event({
      name: "Sample Event",
      date: new Date(),
      countdownEndTime: new Date(Date.now() + 3600000) // 1 hour from now
    });
    await sampleEvent.save();
    console.log('Sample event created successfully:', sampleEvent);
    return sampleEvent;
  } catch (error) {
    console.error('Error creating sample event:', error);
  }
};

// Calculate remaining time for the countdown
const calculateRemainingTime = (countdownEndTime) => {
  const currentTime = new Date();
  const remainingTime = new Date(countdownEndTime - currentTime);
  return remainingTime;
};

// Test the calculateRemainingTime function
const testCalculateRemainingTime = async () => {
  try {
    const sampleEvent = await createSampleEvent();
    const remainingTime = calculateRemainingTime(sampleEvent.countdownEndTime);
    console.log('Remaining time for sample event:', remainingTime);
  } catch (error) {
    console.error('Error testing calculateRemainingTime:', error);
  }
};

testCalculateRemainingTime();

app.listen(3000, () => {
  console.log('App listening on port 3000');
});


