require('dotenv').config();
const nodemailer = require('nodemailer')

/**
 * Sends an email to the specified receiver with login details for the website.
 * @param {Object} options - The email options.
 * @param {string} options.receiver - The email address of the receiver.
 * @param {string} options.name - The name of the receiver.
 * @param {string} options.password - The password for the receiver.
 * @param {string} options.link - The login link for the website.
 */
const emailSender=({receiver,name,password,link})=>{

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.EMAIL ,
    to:receiver,
    subject: 'Login Details for Website',
    html: `<p>Hello ${name},</p><p>Your password is: ${password}</p><p>Click <a href=${link}>here</a> to login.</p>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = emailSender;
