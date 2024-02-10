const Participant= require('../models/Participant'); // Import your Mongoose model
const Mentor = require('../models/Mentor');
const Team = require('../models/Team');
const Judge = require('../models/Juge');



const fetchParticipantsFromMongoDB = async (req,res) => {
  try {
    // Use Mongoose model methods to fetch data
    const result = await Participant.find(); // Example: Fetch all documents from the collection

    // Process the fetched data as needed
    console.log('Fetched data:', result);
    res.json(result);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    throw error; // You can handle or propagate the error as needed
  }
};

const fetchMentorsFromMongoDB = async (req,res) => {
    try {
      // Use Mongoose model methods to fetch data
      const result = await Mentor.find(); // Example: Fetch all documents from the collection
  
      // Process the fetched data as needed
      console.log('Fetched data:', result);
      res.json(result);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      throw error; // You can handle or propagate the error as needed
    }
  };

  const fetchTeamsFromMongoDB = async (req,res) => {
    try {
      // Use Mongoose model methods to fetch data
      const result = await Team.find(); // Example: Fetch all documents from the collection
  
      // Process the fetched data as needed
      console.log('Fetched data:', result);
      res.json(result);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      throw error; // You can handle or propagate the error as needed
    }
  };

  const fetchJudgesFromMongoDB = async (req,res) => {
    try {
      // Use Mongoose model methods to fetch data
      const result = await Judge.find(); // Example: Fetch all documents from the collection
  
      // Process the fetched data as needed
      console.log('Fetched data:', result);
      res.json(result);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      throw error; // You can handle or propagate the error as needed
    }
  };



module.exports = {fetchParticipantsFromMongoDB,fetchJudgesFromMongoDB,fetchMentorsFromMongoDB,
fetchTeamsFromMongoDB};