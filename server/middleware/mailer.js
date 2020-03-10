const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = function(server) {
  var rand, mailOptions, host, link;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });
  transporter.set('oauth2_provision_cb', (user, renew, callback) => {
      let accessToken = userTokens[user];
      if(!accessToken) {
          return callback(new Error('unknown user'));
      } else {
          return callback(null, accessToken)
      }
  })

  server.get("/send", function(req, res) {
    rand = Math.floor(Math.random() * 100 + 54);
    host = req.get("host");
    link = `http://${host}/verify?id=${rand}`;

    mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Please confirm your email account",
      text: "clickityclick"
    };

     return transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.log(error);
        res.end('did not work')
      } else {
        console.log("mes sent" + Response.message);
        res.end("send");
      }
    });
  });

//   server.get("/verify", function(req, res) {
//     if (req.protocol + "://" + req.get("host") === "http://" + host) {
//       if (req.query.id == rand) {
//         res.end(" email " + mailOptions.to + "has been verified");
//       } else {
//         res.end(" bad request ");
//       }
//     }
//   });
};
