const express = require('express');
const mongoose = require('mongoose');
const Participant = require('./models/Participant'); // Import the Participant model

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Db')
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


const newParticipant = new Participant({
  username: "hind",
  email: "hind@gmail.com",
});

newParticipant.save()
  .then(result => {
    console.log('User added successfully:', result);
  })
  .catch(err => {
    console.error('here is the error' + err);
  });

app.listen(3000 , (req,res)=>
{
    console.log('Connected to MongoDB');
})
app.get('./',(req,res)=>
{

})