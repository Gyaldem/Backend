const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Participant = require('./models/Participant'); // Import the Participant model
const { generatePasswordHash, generateRandomPassword } = require('./Utils/passwordUtils'); // Import the password utility functions
const app = express();
const EventManagerCont = require('./controllers/EventManagerCont');
const { AddParticipant, AddMentor } = EventManagerCont;
const generateSpacesRoute = require('./routes/EventmanagementRoute');

require('dotenv').config();
mongoose.connect("mongodb+srv://lylia:Q9MFU4dIajWfVZVC@auth.zrptolx.mongodb.net/?retryWrites=true&w=majority")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());




// Generate a password hash for the random password
app.use('/api', generateSpacesRoute);


app.listen(3000 , (req,res)=>
{
    console.log('Connected to MongoDB');  
})

