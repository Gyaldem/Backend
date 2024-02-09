const express = require('express');
const mongoose = require('mongoose');
const Participant = require('./models/Participant'); // Import the Participant model
const { generatePasswordHash, generateRandomPassword } = require('./Utils/passwordUtils'); // Import the password utility functions
const app = express();
const EventManagerCont = require('./controllers/EventManagerCont');
const MentorCont = require('./controllers/MentorCont');

const { AddParticipant, AddMentor, login } = EventManagerCont;
const { MentorLogin } = MentorCont; // Assuming MentorLogin is exported from MentorCont

// Middleware to parse JSON bodies
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Db')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const newParticipant = new Participant({
  username: "hindooo",
  teamId: "1",
  email: "lh_dev@gmail.com",
});

// newParticipant.save()
//   .then(result => {
//     console.log('User added successfully:', result);
//   })
//   .catch(err => {
//     console.error('here is the error' + err);
//   });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Route handler for '/home'
app.get('/home', (req, res) => {
  console.log("here");
  MentorLogin(req, res); // Call MentorLogin function
});
