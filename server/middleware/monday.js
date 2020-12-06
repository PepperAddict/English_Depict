const express = require("express");
require("dotenv").config();
const router = express();
const formidable = require("formidable");
var fs = require("fs");
var fetch = require("node-fetch");
const thaturi = "https://talkingcloud.io";

const path = require("path");

router.use("/api/1/munday", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.query.code) {

    fetch(
      "https://auth.monday.com/oauth2/token?code=" +
        req.query.code +
        `&client_id=c402136ecfc3e375135e5002cb9ebaa0&client_secret=7559d1f42b861a812a4d539c75a6fee1&redirect_uri=${thaturi}/api/1/munday`,
      {
        method: "POST",
      }
    )
      .then((resd) => {
        return resd.json();
      }).then((resp) => {
        res.app.set(resp.access_token
          , res.req.token)
        res.redirect(`${thaturi}/api/1/test?token=` + resp.access_token)

      })
  } else {
    res.redirect(
      `https://auth.monday.com/oauth2/authorize?client_id=c402136ecfc3e375135e5002cb9ebaa0&redirect_uri=${thaturi}/api/1/munday`
    );
  }
});
router.use(['/api/1/apiformun', '/api/1/test/:page?'], (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.query.token) {
    res.sendFile(path.join(__dirname +'/monday.html'))
  } else {
    res.redirect(`${thaturi}/api/1/munday`)
  }
})


router.use(["/api/1/mupload/", "/api/1/mupload/:page?"], async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin", "X-Requested-With", "Content-Type", "Accept",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
        var updateid;
        var theKey;
        let fields = []
        new formidable.IncomingForm()
          .parse(req)
          .on("field", (name, field) => {
            fields.push({name, field})
          })
          .on("file", (name, file) => {

            for (let x of fields) {
              if (x.name === "updateId") {
                updateid = x.field
              }
              if (x.name === "apiKey") {
                theKey = x.field
              }
            } 

            var boundary = "xxxxxxxxxx";
            var data = "";
            const query = `mutation ($file: File!){add_file_to_update (update_id: ${updateid}, file: $file) {id, url, url_thumbnail}}`;
      
            fs.readFile((upfile = file.path), function (err, content) {
              // construct query part
              data += "--" + boundary + "\r\n";
              data += 'Content-Disposition: form-data; name="query"; \r\n';
              data += "Content-Type:application/json\r\n\r\n";
              data += "\r\n" + query + "\r\n";
      
              // construct file part
              data += "--" + boundary + "\r\n";
              data += 'Content-Disposition: form-data; name="variables[file]"; filename="' + upfile + file.name + '"\r\n';
              data += "Content-Type:application/octet-stream\r\n\r\n";
              let payload = Buffer.concat([
                Buffer.from(data, "utf8"),
                new Buffer.from(content, "binary"),
                Buffer.from("\r\n--" + boundary + "--\r\n", "utf8"),
              ]);
      
              // construct request options

              var options = {
                method: "post",
                headers: {
                  "Content-Type": "multipart/form-data; boundary=" + boundary,
                  Authorization: theKey,
                },
                body: payload,
              };
      
              // make request
              fetch('https://api.monday.com/v2/file', options)
                .then((resp) => resp.json())
                .then((respn) => {
                  updateid = null
                  theKey = null
                  fields = []
                  res.json(respn) })
                .catch((err) => {
                  console.log(err)
                  throw err
                });
                
            })
      
          })
          .on("aborted", () => {
            console.error("Request aborted by the user");
          })
          .on("error", (err) => {
            console.error("Error", err);
            throw err;
          });
      
  
 

});

router.use("/api/1/xd-call", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  try {
    fetch("https://xdce.adobe.io/v2/document/" + req.query.xdid, {
      headers: {
        "x-api-key": process.env.XD_KEY,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        res.json(resp);
      });
  } catch {
    console.log("error");
  }
});

router.use("/api/1/figma-call", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  try {
    fetch("https://api.figma.com/v1/files/" + req.query.figid, {
      headers: {
        "X-Figma-Token": process.env.FIGMA,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        res.json(resp);
      });
  } catch {
    console.log("error");
  }
});

router.use("/api/1/img-to-blob", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  try {
    fetch(req.query.imgurl)
      .then((response) => response.blob())
      .then((resp) => {
        console.log(resp);
      });
  } catch {
    console.log("error");
  }
});

module.exports = router;
