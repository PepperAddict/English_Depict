const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = express.Router();
const puppeteer = require("puppeteer");



router.get(
  ["/api/1/puppeteer/", "/api/1/puppeteer/:page?"],
  cors(),
  async (req, res) => {

    if (req.headers.origin.endsWith('ngrok.io') || req.headers.origin.endsWith('monday.com')) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    
    const browser = await puppeteer.launch({
        args: ["--disable-web-security", "--no-sandbox", "--disable-setuid-sandbox"],
    });
    
    try {
        const page = await browser.newPage();
        await page.goto(req.query.url, {waitUntil: 'load'});
        const image = await page.screenshot({ type: "jpeg", quality: 50 , fullPage: true});
        await browser.close();
        res.set("Content-Type", "image/jpeg");
        res.send(image);
    } catch (error) {
      console.log(error);
    }}
  }
);

module.exports = router;
