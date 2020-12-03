const express = require("express");
require("dotenv").config();
const router = express();
const formidable = require('formidable')
var fs = require('fs');
var fetch = require('node-fetch');


router.use(
  ["/api/1/mupload/", "/api/1/mupload/:page?"],
  async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    var updateid;
    new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
      updateid = field
    })
    .on('file', (name, file) => {

    var url = "https://cors-anywhere.herokuapp.com/https://api.monday.com/v2/file";
    var boundary = "xxxxxxxxxx";
    var data = "";
    const query = `mutation ($file: File!){add_file_to_update (update_id: ${updateid}, file: $file) {id, url, url_thumbnail}}`

    fs.readFile(upfile =  file.path, function(err, content){
    
        // construct query part
        data += "--" + boundary + "\r\n";
        data += "Content-Disposition: form-data; name=\"query\"; \r\n";
        data += "Content-Type:application/json\r\n\r\n";
        data += "\r\n" + query + "\r\n";
    
        // construct file part
        data += "--" + boundary + "\r\n";
        data += "Content-Disposition: form-data; name=\"variables[file]\"; filename=\"" + upfile + file.name + "\"\r\n";
        data += "Content-Type:application/octet-stream\r\n\r\n";
        var payload = Buffer.concat([
                Buffer.from(data, "utf8"),
                new Buffer.from(content, 'binary'),
                Buffer.from("\r\n--" + boundary + "--\r\n", "utf8"),
        ]);
    
        // construct request options
        var options = {
            method: 'post',
            headers: {
              "Content-Type": "multipart/form-data; boundary=" + boundary,
              "Authorization" : process.env.MONDAY
            },
            body: payload,
        };
    
        // make request
        fetch(url, options)
          .then(resp => resp.json())
          .then(json => res.json(json))
          .catch((err) => console.log(err));
    });

    })
    .on('aborted', () => {
      console.error('Request aborted by the user')
    })
    .on('error', (err) => {
      console.error('Error', err)
      throw err
    })
    // .on('end', () => {
    //   res.end()
    // })

  }
);

router.use('/api/1/xd-call', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  try {
    fetch("https://xdce.adobe.io/v2/document/" + req.query.xdid, {headers: {
      "x-api-key": process.env.XD_KEY
    }})
    .then((res) => {
      return res.json()
    }).then((resp) => {
      res.json(resp)
    })
  } catch {
    console.log('error')
  }
})


router.use('/api/1/figma-call', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  try {
    fetch("https://api.figma.com/v1/files/" + req.query.figid, {headers: {
      "X-Figma-Token": process.env.FIGMA
    }})
    .then((res) => {
      return res.json()
    }).then((resp) => {
      res.json(resp)
    })
  } catch {
    console.log('error')
  }
})

router.use('/api/1/img-to-blob', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  try {
    fetch(req.query.imgurl).then((response) => response.blob()).then((resp) =>  {
      console.log(resp)

    })
  } catch {
    console.log('error')
  }
})

module.exports = router;
