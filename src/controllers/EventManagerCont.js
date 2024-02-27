// Import required modules
const EventManager = require("../models/EvenetManager");
const Participant = require("../models/Participant");
const fs = require("fs");
const XLSX = require("xlsx");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Team = require("../models/Team");
const emailSender = require("../Utils/emailSender");
const team = require("../models/Team");
const passwordUtils = require("../Utils/passwordUtils");
const { generatePasswordHash, generateRandomPassword } = passwordUtils;
const bcrypt = require("bcrypt");
const { error } = require("console");

// Get event manager by ID
const getEventManagerById = async (req, res) => {
  try {
    const eventManagerId = req.params.id;
    const eventManager = await EventManager.findById(eventManagerId).populate(
      "managedEvents"
    );
    if (!eventManager) {
      return res.status(404).json({ error: "Event manager not found" });
    }
    res.json(eventManager);
  } catch (error) {
    console.error("Error fetching event manager by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add event manager
const AddEventManager = async (req, res) => {
  try {
    const { email, specialization } = req.body;
    console.log(req.body);
    const hashedPassword = await generatePasswordHash(generateRandomPassword());
    const newEventManager = new EventManager({
      email:email,
      password: hashedPassword,
      specialization: specialization,
    });

    // Save the new event manager to the database
    const savedEventManager = await newEventManager.save();

    res.status(201).json(savedEventManager);
  } catch (error) {
    console.error("Error creating event manager:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Updates a team with the provided information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the team is updated.
 * @throws {Error} - If there is an error updating the team.
 */
const updateTeam = async (req, res) => {
  try {
    const teamname = req.query.name;
    const updatedTeam = req.query;
    const team = await Team.findOne({ name: teamname });
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    await updatedTeam.save();
    res.json({ message: "Participant added to team successfully" });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Deletes a team.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the team is deleted.
 */
const deleteTeam = async (req, res) => {
  try {
    const team = req.query.name;
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Add a participant to the event.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the participant is added successfully.
 */
const AddParticipant = async (req, res) => {
  try {
    const { email, teamname } = req.query;
    console.log(req.query);
    const password = generateRandomPassword(8);
    const hashedPassword = await generatePasswordHash(password);
    const newParticipant = new Participant({
      email: email,
      password: hashedPassword,
      teamname: teamname,
    });
    response = searchAndUpdateTeam(teamname, newParticipant);
    if (response.status == 404 || response.status == 500) {
      res.status(response.status).json(response);
    } else {
      emailSender({
        receiver: email,
        name: email,
        password: password,
        link: process.env.LINK,
      });
      const savedParticipant = await newParticipant.save();
      res.status(201).json(savedParticipant);
    }
  } catch (error) {
    console.error("Error creating participant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Generates spaces from an Excel file containing participant email and team information.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the spaces are generated successfully.
 * @throws {Error} - If there is an error generating spaces from the Excel file.
 */
const generateSpacesFromExcel = async (req, res) => {
  try {
    const filePath = req.body.filePath;
    const excelFileBuffer = fs.readFileSync(filePath);

    // Code to read the Excel file and extract participant email and team information
    const workbook = XLSX.read(excelFileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Assuming you want to read from the first sheet
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Assuming the first row contains headers and the second row contains data
    const headers = data[0];
    const rows = data.slice(1); // Exclude the header row

    const emailColumnIndex = headers.indexOf("Email"); // Assuming 'Email' is the header for the email column
    const teamColumnIndex = headers.indexOf("Team"); // Assuming 'Team' is the header for the team column

    const result = rows.map((row) => ({
      email: row[emailColumnIndex],
      team: row[teamColumnIndex],
    }));
    const resultat = [];
    for (const participantData of result) {
      const password = generateRandomPassword(8);
      const existingParticipant = await Participant.findOne({
        email: participantData.email,
      });

      if (existingParticipant) {
        console.log(
          `Participant with email ${participantData.email} already exists. Skipping insertion.`
        );
        continue; // Skip insertion and move to the next participant
      }
      const participant = new Participant({
        email: participantData.email,
        teamname: participantData.team,
        password: generatePasswordHash(password),
      });
      resultat.push({
        team: participant.teamname,
        participant: participant,
      });
      await participant.save(); // Save participant to the database
      console.log(`Participant saved: ${participant}`);
      emailSender({
        receiver:participant.email,
        name:participant.email,
        password:password,
        link:process.env.LINK
    });
    }

    const teams = [...new Set(resultat.map((row) => row.team))];
    for (const teamId of teams) {
      const team = new Team({
        name: teamId,
        members: resultat
          .filter((row) => row.team === teamId)
          .map((row) => row.participant),
      });
      await team.save(); // Save team to the database
      console.log(`Team saved: ${team}`);
    }

    console.log("All participants and teams saved successfully");
    res.json({
      message: "All participants and teams saved successfully",
      teams: teams,
    });
  } catch (error) {
    console.error("Error generating spaces from Excel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Deletes a participant from a team and the participant collection.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the participant is deleted successfully.
 * @throws {Error} - If there is an error deleting the participant.
 */
const deleteParticipant = async (req, res) => {
  try {
    const participant = req.query;
    const participantId = participant.email;
    const participantTeam = participant.teamname;
    team = await Team.findOne({ name: participantTeam });
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    team.members = team.members.filter((member) => member != participantId);
    await team.save();
    const deletedParticipant = await Participant.findByIdAndDelete(
      participantId
    );
    if (!deletedParticipant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    res.json({ message: "Participant deleted successfully" });
  } catch (error) {
    console.error("Error deleting participant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the controller functions
module.exports = {
  getEventManagerById,
  generateSpacesFromExcel,
  AddEventManager,
  AddParticipant,
  updateTeam,
  deleteTeam,
  deleteParticipant,
};

// Helper function to search for a team and update it with a new participant
const searchAndUpdateTeam = async (teamname, participant) => {
  try {
    // Search for the team with the given name
    const team = await Team.findOne({ name: teamname });

    if (!team) {
      return error({ status: 404, message: "Team not found" });
    }

    // Add the participant to the list of participants of the team
    team.members.push(participant);

    // Update the team in the database
    await team.save();
    return error({
      status: 200,
      message: "Participant added to team successfully",
    });
  } catch (error) {
    console.error("Error searching and updating team:", error);
    return error({ status: 500, message: "Internal Server Error" });
  }
};
