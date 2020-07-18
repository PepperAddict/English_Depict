const express = require("express");
require("dotenv").config();
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
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/contact", function (req, res) {
  from = '"Talking Cloud ☁️" <contact@talkingcloud.io>';
  mailOptions = {
    to: "jenearly@gmail.com",
    from,
    subject: `${req.body.name} ${req.body.reason}`,
    html: `
    ${req.body.name}: <b> ${req.body.email} </b>
    <p>${req.body.reason}</p>
    <p>${req.body.message}</p>
    `,
  };

  const mailOptionsCopy = {
    to: req.body.email,
    from,
    subject: `Talking Cloud Contact Copy`,
    html: `
    ${req.body.name}: <b> ${req.body.email} </b>
    <p>${req.body.reason}</p>
    <p style="border:1px solid black">${req.body.message}</p>
    `,
  };

  transporter.sendMail(mailOptions, function (err, response) {
    if (response) {
      transporter.sendMail(mailOptionsCopy, function (err, res) {
        console.log(res);
      });
    } else {
      console.log(err);
    }
  });
});
router.get("/client", async (req, res) => {
  var http = require("https");

  var options = {
    "method": "POST",
    "hostname": "api.sendgrid.com",
    "port": 443,
    "path": "/v3/mail/send",
    "headers": {
      "authorization": "Bearer " + process.env.GRIDPW,
      "content-type": "application/json"
    }
  };
  console.log(process.env.GRIDPW)
  
  var req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  
  req.write(JSON.stringify({ 
    personalizations: 
     [ { 
       to: [ { 
          email: 'jenearly@gmail.com', 
          name: 'Jenearly' } ],
        dynamic_template_data: 
          { name: 'Cheese', 
            code: "hello" },
         subject: 'Hello, World!' } ],
      from: { email: 'contact@talkincloud.io', name: 'Talking Cloud' },
    template_id: 'd-61d84cea1d174c9cb52df4a9170547a3' }));
  req.end();

});

// router.get("/grid", async (req, res) => {
//   const sgMail = require("@sendgrid/mail");
//   sgMail.setApiKey(process.env.GRIDPW);
//   console.log(process.env.GRIDPW);
//   const msg = {
//     to: "jenearly@gmail.com",
//     from: "contact@talkincloud.io",
//     subject: "sending with Twilio Sendgrid is fun",
//     text: "verify",
//     html: "<strong>ok hi </strong>",
//   };

//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     res.sendFile(path.resolve(__dirname, "../../dist/index.html"));
//   }
// });

router.get("/send", function (req, res) {
  rand = Math.floor(Math.random() * 100 + 54);
  host = req.get("host");
  email = req.body.email;
  token = req.body.token;
  link = `http://${host}/verify?token=${token}`;

  mailOptions = {
    to: email,
    from: '"Talking Cloud ☁️" <verify@talkingcloud.io>',
    subject: "Talking Cloud - Please verify your email address",
    html: `Thank you for registering with TalkingCloud.io. <br>
    Please verify your email address by clicking on the link<br>
    <a href="${link}">Click here to Verify</a>`,
  };

  transporter.sendMail(mailOptions, function (err, response) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.sendFile(path.resolve(__dirname, "../../dist/index.html"));
    }
  });
});

router.get("/verify", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../../dist/index.html"));
});

module.exports = router;
