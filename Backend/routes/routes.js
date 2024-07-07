const { Router } = require("express");
const user = require("../model/user");
const requestValidator = require("../middlewares/requestValidator");
const userController = require("../controllers/userController");
const nodemailer = require('nodemailer');


const router = Router();

router.post('/userfeedback/send-email', (req, res) => {
    const { name, email, describtion, selectedDate, selectedTime, link } = req.body;
  
    // Create a transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '7455867051mohit@gmail.com', // Replace with your email
        pass: 'cgkd idfw zuvw zlqe' // Replace with your email password
      }
    });
  
    // Email options for author
    let mailOptionsAuthor = 
    {
      from: '7455867051mohit@gmail.com',
      to: '7455867051mohit@gmail.com',
      subject: 'New Meeting Scheduled From Portfolio',
      text: `Someone has visited to your portfolio website and scheduled meeting link
             Name: ${name}\n
             Email: ${email}\n
             Describtion: ${describtion}\n
             Date: ${selectedDate}\n
             Time: ${selectedTime}\n
             Link: ${link || 'https://meet.google.com/qkc-ranb-rpa?authuser=0'}`
    };
  
    // Email options for user
    let mailOptionsUser = {
      from: '7455867051mohit@gmail.com',
      to: email,
      subject: 'Meeting Confirmation',
      text: `Hello ${name},\n\nI hope you are doing well. Let's connect on ${selectedDate} at ${selectedTime}.\n\nHere is the meeting link: ${link || 'https://meet.google.com/qkc-ranb-rpa?authuser=0'}`
    };
  
    // Send email to author
    transporter.sendMail(mailOptionsAuthor, (error, info) => {
        if (error) {
            console.error('Error sending email to author:', error);
            return res.status(500).json({ message: 'Error sending email to author', error: error.toString() });
        }

        // Send email to user
        transporter.sendMail(mailOptionsUser, (error, info) => {
            if (error) {
                console.error('Error sending email to user:', error);
                return res.status(500).json({ message: 'Error sending email to user', error: error.toString() });
            }

            res.status(200).send('Emails sent successfully');
        });
    });
});




router.post('/userfeedback/send-email-contact', (req, res) => {
  const { fullName, email, requirement } = req.body;

  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '7455867051mohit@gmail.com', // Replace with your email
      pass: 'cgkd idfw zuvw zlqe' // Replace with your email password
    }
  });

  // Email options for author
  let mailOptionsAuthor = 
  {
    from: '7455867051mohit@gmail.com',
    to: '7455867051mohit@gmail.com',
    subject: 'Message From Portfolio',
    text: `Someone has Messaged you from portfolio website 
           Name: ${fullName}\n
           Email: ${email}\n
           Describtion: ${requirement}`
  };


  // Send email to author
  transporter.sendMail(mailOptionsAuthor, (error, info) => {
      if (error) {
          console.error('Error sending email to author:', error);
          return res.status(500).json({ message: 'Error sending email to author', error: error.toString() });
      }

      res.status(200).send('Emails sent successfully');
  });
});

router.post('/userfeedback/send-contact-info', (req, res) => {
  const { fullName, email, phonenumber, requirement } = req.body;

  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '7455867051mohit@gmail.com', // Replace with your email
      pass: 'cgkd idfw zuvw zlqe' // Replace with your email password
    }
  });

  // Email options for author
  let mailOptionsAuthor = 
  {
    from: '7455867051mohit@gmail.com',
    to: '7455867051mohit@gmail.com',
    subject: 'Conatct From Portfolio',
    text: `Someone contacted to you from portfolio website
           Name: ${fullName}\n
           Email: ${email}\n
           Describtion: ${requirement}\n
           Phone Number: ${phonenumber}`
  };


  // Send email to author
  transporter.sendMail(mailOptionsAuthor, (error, info) => {
      if (error) {
          console.error('Error sending email to author:', error);
          return res.status(500).json({ message: 'Error sending email to author', error: error.toString() });
      }

      res.status(200).send('Emails sent successfully');
  });
});

module.exports = router;
