const EventManager = require('../models/EvenetManager');
const Participant = require('../models/Participant');
const fs = require('fs');

const XLSX = require('xlsx');
const crypto = require('crypto');
const mongoose=require('mongoose')
const Team= require('../models/Team');
const emailSender=require('../Utils/emailSender')



const team= require('../models/Team');
const  passwordUtils  = require('../Utils/passwordUtils');

const { generatePasswordHash ,generateRandomPassword } = passwordUtils;
const bcrypt = require('bcrypt');

const getEventManagerById = async (req, res) => {
  try {
    const eventManagerId = req.params.id;
    const eventManager = await EventManager.findById(eventManagerId).populate('managedEvents'); 
    if (!eventManager) {
      return res.status(404).json({ error: 'Event manager not found' });
    }
    res.json(eventManager);
  } catch (error) {
    console.error('Error fetching event manager by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const AddEventManager=async(req, res)=>
{
  try {
    const { email , specialization } = req.body;
console.log(req.body);
    const hashedPassword = await generatePasswordHash(generateRandomPassword());       
    const newEventManager = new EventManager({
        email,
        password: hashedPassword ,
        specialization : specialization , 
    });

    // Save the new mentor to the database
    const savedEventManager = await newEventManager.save();

    res.status(201).json(savedEventManager);
} catch (error) {
    console.error('Error creating mentor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

}

const generateSpacesFromExcel = async (req, res) => {
  try {
    console.log(req.body)
    const filePath = req.body.filePath; 
    const excelFileBuffer = fs.readFileSync(filePath);
    
    // Code to read the Excel file and extract participant email and team information
    const workbook = XLSX.read(excelFileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Assuming you want to read from the first sheet
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Assuming the first row contains headers and the second row contains data
    const headers = data[0];
    const rows = data.slice(1); // Exclude the header row

    const emailColumnIndex = headers.indexOf('Email'); // Assuming 'Email' is the header for the email column
    const teamColumnIndex = headers.indexOf('Team'); // Assuming 'Team' is the header for the team column

    const result = rows.map(row => ({
      email: row[emailColumnIndex],
      team: row[teamColumnIndex],
    }));

    for (const participantData of result) {
      const password = generateRandomPassword(8);
      const existingParticipant = await Participant.findOne({ email: participantData.email });

      if (existingParticipant) {
        console.log(`Participant with email ${participantData.email} already exists. Skipping insertion.`);
        continue; // Skip insertion and move to the next participant
      }
      const participant = new Participant({
        email: participantData.email,
        teamname: participantData.team,
        password: password
      });
      await participant.save(); // Save participant to the database
      console.log(`Participant saved: ${participant}`);
      emailSender(participant.email,participant.email,password,"http://yourwebsite.com/login")
      
    }

    const teams = [...new Set(result.map(row => row.team))];
    for (const teamId of teams) {
      const team = new Team({
        name:teamId,
        members: result.filter(row => row.team === teamId).map(row => row.email)
      });
      await team.save(); // Save team to the database
      console.log(`Team saved: ${team}`);
    }

    console.log('All participants and teams saved successfully');
    res.json({ message: 'All participants and teams saved successfully' });
  } catch (error) {
    console.error('Error generating spaces from Excel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


function generateRandomPassword(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
  const randomBytes = crypto.randomBytes(length);
  let password = '';
}
//   for (let i = 0; i < length; i++) {
//       const index = randomBytes[i] % chars.length;
//       password += chars[index];
//   }
  
//   return password;
// }

module.exports = {
  getEventManagerById,
  generateSpacesFromExcel,
  AddEventManager
};

