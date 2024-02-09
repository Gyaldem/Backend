const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
require('dotenv').config();
const EventManagerCont = require('./controllers/EventManagerCont');
const MentorCont = require('./controllers/MentorCont');
const emailUtils=require('./utils/emailUtils');
const {sendEmail}=emailUtils;

const { AddParticipant, login } = EventManagerCont;
const { MentorLogin, addMentor } = MentorCont; // Assuming MentorLogin is exported from MentorCont

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
// Route handler for '/home'
app.post('/home', (req, res) => {
  console.log("hind");
  addMentor(req,res); // Call MentorLogin function
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// sendEmail("ll_aouinine@esi.dz")