const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = express.Router();
const puppeteer = require("puppeteer");


router.get(
  ["/api/1/puppeteer/", "/api/1/puppeteer/:page?"],
  cors(),
  async (req, res) => {
    const whichView = {
      mobile: {
        width: 375,
        height: 667,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        isLandscape: false,
      },
      tablet: {
        width: 768,
        height: 1024,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        isLandscape: false,
      },
      desktop: {
        width: 1200,
        height: 800
      }
    }

    if (req.headers.origin.endsWith('ngrok.io') || req.headers.origin.endsWith('monday.com')) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
        console.log(req.query)
    
    const browser = await puppeteer.launch();
    
    try {
        const page = await browser.newPage();

        await page.setViewport(whichView[req.query.mode]);
        await page.goto(req.query.url, {waitUntil: 'networkidle0'});
        const image = await page.screenshot({ type: "jpeg", quality: 50, fullPage: (req.query.full === 'yes' ? true : false) });
        await browser.close();
        res.set("Content-Type", "image/jpeg");
        res.send(image);
    } catch (error) {
      console.log(error);
    }}
  }
);

module.exports = router;
