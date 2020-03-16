const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();
var rand, mailOptions, host, link, email, token;

const transporter = nodemailer.createTransport({
  service: "FastMail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: true
  }
});

router.get("/send", function(req, res) {
  rand = Math.floor(Math.random() * 100 + 54);
  host = req.get("host");
  email = req.headers.email;
  token = req.headers.token;
  link = `http://${host}/verify?token=${token}`;

  mailOptions = {
    to: email,
    from: '"Talking Cloud ☁️" <verify@talkingcloud.io>',
    subject: "Talking Cloud - Please verify your email address",
    html: `Thank you for registering with TalkingCloud.io. <br>
    Please verify your email address by clicking on the link<br>
    <a href="${link}">Click here to Verify</a>`
  };

  transporter.sendMail(mailOptions, function(err, response) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.sendFile(path.resolve(__dirname, "../../dist/index.html"));
    }
  });
});

router.get("/verify", function(req, res) {

  res.sendFile(path.resolve(__dirname, "../../dist/index.html"));
});

module.exports = router;
