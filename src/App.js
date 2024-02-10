// App.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Participant = require('./models/Participant'); // Import the Participant model
const generateSpacesRoute = require('./routes/EventmanagementRoute');
const fetchDatafromDB = require('./routes/FetchdBRout'); // Import the router file

const mentorRoutes=require('./routes/mentorRoutes');
const authentificationRoutes=require('./routes/authentificationroutes') ;
const EvenetManagerRoutes=require('./routes/EventmanagementRoute')
const EventManagerCont = require('./controllers/EventManagerCont');

const { login } = require('./Utils/Authentification');

const {AddEventManager} = EventManagerCont ;
require('dotenv').config();

const app = express();
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.use('/api', generateSpacesRoute);
app.use('/api/fetch', fetchDatafromDB); // Use the router file as middleware
app.use('/', mentorRoutes); // Mounting mentor routes to /api/mentors path
app.use('/', authentificationRoutes);
app.use('/',EvenetManagerRoutes)



app.listen(5000, () => {
  console.log('Connected to MongoDB');
  
});