const Participant = require('../models/Participant');
const Juge = require('../models/Juge');
const Mentor = require('../models/Mentor');
const Event = require('../models/Event');
const EventManager = require('../models/EvenetManager');
const AddParticipant=async(username , email , teamId)=>
{
try {
const participant = new Participant({username, email, teamId});
  await participant.save();}
catch (err) {
    console.log('An error occured in adding the participant to the db '+ err);
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


const AddJuge= async(username , email , skills, password )=>
{
try 
{
    const Juge = new Juge({username, email, skills , password});
    await Juge.save();
}
  catch (err) {
      console.log('An error occured when adding the juge to the db '+ err);
  }
}

// Assuming you have a User model defined with Mongoose

const login = async (req, res) => {
  const { email, password } = req.body; // Assuming email and password are sent in the request body

  try {
    // Find the user by email
    const user = await EventManager.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches
    const isPasswordValid = await user.comparePassword(password);

    // If password is invalid, return error
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If email and password are correct, login successful
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// module.exports = login;



module.exports= {
    AddParticipant ,
    AddMentor ,
    AddJuge , 
    login
};