const express = require('express');
const mongoose = require('mongoose');
const Participant = require('./models/Participant'); // Import the Participant model
const { generatePasswordHash, generateRandomPassword } = require('./Utils/passwordUtils'); // Import the password utility functions
const app = express();
const EventManagerCont = require('./controllers/EventManagerCont');
const { AddParticipant, AddMentor } = EventManagerCont;
 
mongoose.connect('mongodb://127.0.0.1:27017/Db')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Generate a random password with a length of 10 characters
const randomPassword = generateRandomPassword(5);

// Generate a password hash for the random password
generatePasswordHash(randomPassword)
  .then(async (hash) => {
    // Create a new participant with the hashed password
    const newParticipant = new Participant({
      username: "hindooo",
      teamId: "2",
      email: "l_dev@gmail.com",
      password: hash // Assign the hashed password to the participant
    });

    // Save the participant to the database
    await newParticipant.save();
    console.log('Participant added successfully:', newParticipant);
  })
  .catch(err => {
    console.error('Error generating password hash:', err);
  });

app.listen(3000 , (req,res)=>
{
    console.log('Connected to MongoDB');  
})

app.get('./',(req,res)=>
{
 
})
