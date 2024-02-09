const passwordUtils = require('./passwordUtils');
const {generatePassword}=passwordUtils ;
const nodemailer = require('nodemailer');

async function sendEmail(email) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: 'lh_dehili@esi.dz', // Your email address
        pass: '8218 9268' // Your email password or app password
      }
  });

  // Email options
  const mailOptions = {
    from: 'lh_dehili@esi.dz', // Sender address
    to: email, // List of recipients
    subject: 'Here is the password for you account ' + generatePassword() , // Subject line
    text: 'This is a test email sent from Nodemailer.' // Plain text body
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return 'Email sent successfully';
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
}

module.exports = { sendEmail };
