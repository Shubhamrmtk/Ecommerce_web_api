var newOTP = require('otp-generators')
var nodemailer = require('nodemailer');
require('dotenv').config()
            // or
// import newOTP from 'otp-generators';

// For numeric OTP
const a=newOTP.generate(6, { alphabets: false, upperCase: false, specialChar: false });
// --------------------------------------------------------------------------------------

// nodemailler code for sending email

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.user_email,
    pass: process.env.email_pass
  }
});

var mailOptions = {
  from: 'Ecommerce Node App',
  to: 'shubhamr21@navgurukul.org',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


module.exports={transporter}

