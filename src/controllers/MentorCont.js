const Mentor = require('../models/Mentor');

const MentorLogin = async (req, res) => {
    const { email, password } = req.body; // Assuming email and password are sent in the request body
  
    try {
      // Find the user by email
      const user = await Mentor.findOne({ email });
  
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

  module.exports={
    MentorLogin
  }