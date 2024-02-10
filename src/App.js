const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Participant = require('./models/Participant'); // Import the Participant model
const { generatePasswordHash, generateRandomPassword } = require('./Utils/passwordUtils'); // Import the password utility functions 
const app = express();

app.use(cors());

const mentorRoutes=require('./routes/mentorRoutes');
const authentificationRoutes=require('./routes/authentificationroutes') ;
const EvenetManagerRoutes=require('./routes/EventmanagementRoute')
const EventManagerCont = require('./controllers/EventManagerCont');

const { login } = require('./Utils/Authentification');

const {AddEventManager} = EventManagerCont ;
// const MentorCont = require('./controllers/MentorCont');
// // const emailUtils=require('./utils/emailUtils');
// const AuthentificationUtils = require('./Utils/Authentification')
// const {login}=AuthentificationUtils
// const { AddParticipant} = EventManagerCont;
// const { MentorLogin, addMentor ,deleteMentor} = MentorCont; // Assuming MentorLogin is exported from MentorCont
// const {  updateMentorProfile, deleteMentor } = require('./controllers/mentorController'); // Assurez-vous d'importer les contrôleurs correctement selon l'emplacement de votre fichier 


// Middleware to parse JSON bodies
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Db')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });




 

  app.use('/', mentorRoutes); // Mounting mentor routes to /api/mentors path
app.use('/', authentificationRoutes);
app.use('/',EvenetManagerRoutes)

// const newParticipant = new Participant({
//   username: "hindooo",
//   teamId: "1",
//   email: "lh_dev@gmail.com",
// });


// newParticipant.save()
//   .then(result => {
//     console.log('User added successfully:', result);
//   })
//   .catch(err => {
//     console.error('here is the error' + err);
//   });
// Route handler for '/home'



// sendEmail("ll_aouinine@esi.dz")*

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
