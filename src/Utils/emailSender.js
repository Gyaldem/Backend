const emailSender=({receiver,name,password,link})=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'll_aouinine@esi.dz',
            pass: 'LyliaEsi@1.67'
        }
      });
      const mailOptions = {
        from: 'll_aouinine@esi.dz',
        to: {receiver},
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

module.exports=emailSender