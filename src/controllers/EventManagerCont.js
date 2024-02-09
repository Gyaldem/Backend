const Participant = require('../models/Participant');
const Juge = require('../models/Juge');
const Mentor = require('../models/Mentor');

const AddParticipant=async(username , email , teamId)=>
{
try {
const participant = new Participant({username, email, teamId});
  await participant.save();}
catch (err) {
    console.log('An error occured in adding the user to the db '+ err);
}
}

const AddMentor= async(username , email , skills, password )=>
{
try 
{
    const mentor = new Mentor({username, email, skills , password});
    await mentor.save();
}
  catch (err) {
      console.log('An error occured when adding the mentor to the db '+ err);
  }
}

module.exports= {
    AddParticipant ,
    AddMentor
};