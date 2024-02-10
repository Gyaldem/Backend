const bcrypt = require('bcrypt');
const Mentor = require('../models/Mentor');
const Participant = require('../models/Participant');
const Juge = require('../models/Juge');
const Lead = require('../models/Lead');
const EventManager = require('../models/EvenetManager');

// const login = async (req, res) => {
//     const { email, password } = req.body; // Assuming email and password are sent in the request body
//     try {
//       console.log('HINDOIZAKDQ?JIZK')
//       // Array of user models
//       const userModels = [Mentor, Participant,Juge,Lead,EventManager]; // Add more models as needed
//       let user;
//       // Iterate through each user model
//       for (const UserModel of userModels) {
//         // Find the user by email
//         user = await UserModel.findOne({ email });
//         if (user) {
//           break; // Break the loop if user is found
//         }
//       }
  
//       // If user not found, return error
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Check if the password matches
//       const isPasswordValid = user.password == password;
  
//       // If password is invalid, return error
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Invalid password' });
//       }
  
//       // If email and password are correct, login successful
//       res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };



  const login = async (req, res) => {
    const { email, password } = req.body; // Assuming email and password are sent in the request body
    try { 
      // Array of user models
      const userModels = [Mentor, Participant,Juge,Lead,EventManager]; // Add more models as needed
      let user;
      // Iterate through each user model
      for (const UserModel of userModels) {
        // Find the user by email
        user = await UserModel.findOne({ email });
        if (user) {
          break; // Break the loop if user is found
        }
      }
  
      // If user not found, return error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the password matches
      const isPasswordValid = user.password == password;
      // If password is invalid, return error
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // If email and password are correct, login successful
      if (isPasswordValid) 
      {

     
      switch (user.role) {
        case '1':
            redirectUrl = '';
            break;
        case '2':
          console.log('erzzzzzzzzzzzzrer')
            redirectUrl = '/eventManager/overview';
            console.log('hindd after')
            res.status(200).json({ message: 'Login successful', user , redirectUrl });
            break;
        case '3':
            redirectUrl = '';
            break;
        case '4':
            redirectUrl = '';
            break;
        case '5':
            redirectUrl = '';
            break;
        default:
            redirectUrl = '/login';   
            res.status(200).json({ message: 'Login successful', user , redirectUrl });

      }
     
    }




    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports={login} ;