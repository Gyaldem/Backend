const express = require('express');
const mongoose = require('mongoose');
const Participant = require('./models/Participant'); // Import the Participant model
const app = express();
const EventManagerCont = require('./controllers/EventManagerCont');
const { AddParticipant, AddMentor } = EventManagerCont;
 
// AddParticipant("Hind","lh_dehili@€si.dz","14");
// AddMentor("Hind","lh_dehili@€si.","fullstack","23"); 

mongoose.connect('mongodb://127.0.0.1:27017/Db')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

 
const newParticipant = new Participant({
  username: "hindooo",

  teamId : "1" ,
  email :"lh_dev@gmail.com",
});

// newParticipant.save()
//   .then(result => {
//     console.log('User added successfully:', result);
//   })
//   .catch(err => {
//     console.error('here is the error' + err);
//   });

app.listen(3000 , (req,res)=>
{
    console.log('Connected to MongoDB');  
})
app.get('./',(req,res)=>
{
 
})
