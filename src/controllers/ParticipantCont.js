const Participant = require('../models/Participant');
const AddParticipant=async(username , email , teamId)=>
{
try {
const participant = new Participant({username, email, teamId});
  await participant.save();}
catch (err) {
    console.log('An error occured in adding the user to the db '+ err);
}
}
//--------------------------------------------------------------------------------------

const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants); // Respond with the list of participants
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).send('Internal Server Error');
  }
};
//--------------------------------------------------------------------------------------
// Function to get a participant by ID
const getParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).send('Participant not found');
    }
    res.json(participant); // Respond with the participant
  } catch (error) {
    console.error('Error fetching participant:', error);
    res.status(500).send('Internal Server Error');
  }
};
//--------------------------------------------------------------------------------------
const updateParticipantProfile = async (req, res) => {
  try {
    const { username, email, teamId, password } = req.body;
    const updatedParticipant = await Participant.findByIdAndUpdate(req.params.id, {
      username,
      email,
      teamId,
      password
    }, { new: true });
    if (!updatedParticipant) {
      return res.status(404).send('Participant not found');
    }
    res.json(updatedParticipant);
  } catch (error) {
    console.error('Error updating participant profile:', error);
    res.status(500).send('Internal Server Error');
  }
};
//--------------------------------------------------------------------------------------
const deleteParticipantById = async (req, res) => {
  try {
    const deletedParticipant = await Participant.findByIdAndDelete(req.params.id);
    if (!deletedParticipant) {
      return res.status(404).send('Participant not found');
    }
    res.json({ message: 'Participant deleted successfully' });
  } catch (error) {
    console.error('Error deleting participant:', error);
    res.status(500).send('Internal Server Error');
  }
};

//--------------------------------------------------------------------------------------
module.exports= {
    AddParticipant,
    getAllParticipants,
    getParticipantById,
    updateParticipantProfile,
    deleteParticipantById

};
//--------------------------------------------------------------------------------------
