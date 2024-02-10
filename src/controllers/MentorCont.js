const Mentor = require('../models/Mentor');
const  passwordUtils  = require('../Utils/passwordUtils');
const { generatePasswordHash ,generateRandomPassword } = passwordUtils;
const bcrypt = require('bcrypt');
  
// Controller function to create a new mentor
const addMentor = async (req, res) => {
    try {
<<<<<<< HEAD
        const { name,email , specialization , linkedinUrl  } = req.body;

=======
        const { email , specialization , linkedinUrl  } = req.body;
    console.log(req.body);
>>>>>>> efab0d382f5f4b264267e47d4c2af1ab0b1ffb29
        const hashedPassword = await generatePasswordHash(generateRandomPassword());       
        const newMentor = new Mentor({
            name,
            email,
            password: hashedPassword ,
            specialization : specialization , 
            linkedinUrl: linkedinUrl
        });

        // Save the new mentor to the database
        const savedMentor = await newMentor.save();

        res.status(201).json(savedMentor);
    } catch (error) {
        console.error('Error creating mentor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to retrieve mentor information
const getMentor = async (req, res) => {
    try {
       const {email} = req.body;
        ;
        // Find the mentor by ID in the database
        const mentor = await Mentor.findById(email);
        res.json(mentor);
    } catch (error) {
        console.error('Error retrieving mentor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to update mentor profile
const updateMentorProfile = async (req, res) => {
    try {
        const mentorId = req.params.id;
        const {  email, newPassword } = req.body;

        // Hash the new password if provided
        let hashedPassword;
        if (newPassword) {
            hashedPassword = await generatePasswordHash(newPassword);
        }

        // Update mentor profile in the database
        const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, {
            email,
            password: hashedPassword // Update password if provided
        }, { new: true });

        res.json(updatedMentor);
    } catch (error) {
        console.error('Error updating mentor profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to delete mentor
const deleteMentor = async (req, res) => {
    try {
        const mentorId = req.params.id; // Extracting mentor ID from URL params
        // Delete mentor from the database using ID
        await Mentor.findByIdAndDelete(mentorId);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting mentor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




const MentorLogin = async (req, res) => {
    const { email, password } = req.body; // Assuming email and password are sent in the request body
    try {
      // Find the user by email
      const user = await Mentor.findOne({ email });
      console.log('here is the email ' + email);
      console.log('here is the password ' + password);
      console.log('hre is the mentor'+ user);
      // If user not found, return error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the password matches
      const isPasswordValid = await bcrypt.compare(password, user.password);
       console.log('here is the password'+password);

      // If password is invalid, return error
      console.log(isPasswordValid);
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

  module.exports = {
    MentorLogin ,
    addMentor,
    updateMentorProfile,
    deleteMentor ,
    
};