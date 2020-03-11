const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
var rand, mailOptions, host, link;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

router.get("/send", function(req, res) {
  rand = Math.floor(Math.random() * 100 + 54);
  host = req.get("host");
  link = `http://${host}/verify?id=${rand}`;

  mailOptions = {
    to: "jenearly@gmail.com",
    subject: "Please confirm your email account",
    html: `Please verify your email address by clicking on the link<br>
    <a href="${link}">Click here to Verify</a>`
  };

  transporter.sendMail(mailOptions, function(err, response) {
    if (err) {
      console.log(err);
      res.redirect('/')
    } else {
      res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    }
  });
});

//   router.get("/verify", function(req, res) {
//     if (req.protocol + "://" + req.get("host") === "http://" + host) {
//       if (req.query.id == rand) {
//         res.end(" email " + mailOptions.to + "has been verified");
//       } else {
//         res.end(" bad request ");
//       }
//     }
//   });

module.exports = router;
