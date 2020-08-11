

const express = require("express");
require("dotenv").config();
const cors = require('cors')
const router = express.Router();
const path = require("path");
const puppeteer = require('puppeteer');
const { response } = require("express");

var allowlist = ['https://monday.com', 'http://talkingcloud.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

router.get(['/api/1/puppeteer/:page?'], async (req, res) => {
    const path = req.url.split("/");
    try {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox'
              ],
        });
        const page = await browser.newPage();
        await page.goto(req.query.url);
        const image = await page.screenshot({type: "jpeg", quality: 50});
        await browser.close();
        res.set('Content-Type', 'image/jpeg');
        res.send(image);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;