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
router.post("/send", async (req, res) => {
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
  
  var request = await http.request(options, function (response) {
    var chunks = [];
          
    response.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    response.on("end", function () {
      var body = Buffer.concat(chunks);
      
    
    });
    
    response.on("error", (error) => {
        console.error(error)
        reject(error)
    })

  });
  name = ( 'username' in req.body) ? req.body.username : "New User";
  email = req.body.email;
  token = req.body.token;
  link = `https://talkingcloud.io/verify?token=${token}`;
  
  await request.write(JSON.stringify({ 
    personalizations: 
     [ { 
       to: [ { 
          email: email, 
          name: name } ],
        dynamic_template_data: 
          { name: name, 
            code: link,
           },
         subject: 'Please verify your Talking Cloud account' } ],
      from: { email: 'verify@talkincloud.io', name: 'Talking Cloud ☁️' },
    template_id: 'd-61d84cea1d174c9cb52df4a9170547a3' }));
  request.end();

});




router.get("/verify", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../../dist/index.html"));
});

module.exports = router;
