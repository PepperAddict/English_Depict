const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = express.Router();
const path = require("path");
const puppeteer = require("puppeteer");
const {
    proxyRequest,
  } =require('puppeteer-proxy');

router.get(
  ["/api/1/puppeteer/", "/api/1/puppeteer/:page?"],
  cors(),
  async (req, res) => {
    //allow all origin and limit when there are problems
    res.header("Access-Control-Allow-Origin", "*");
    const browser = await puppeteer.launch({
      args: ["--disable-web-security", "--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    // await page.setRequestInterception(true);
    // page.on('request', async (request) => {
    //     await proxyRequest({
    //       page,
    //       proxyUrl: 'http://127.0.0.1:8080',
    //       request,
    //     });
    //   });
    try {

      await page.goto(req.query.url, {waitUntil: 'load'});
      const image = await page.screenshot({ type: "jpeg", quality: 50 });
      await browser.close();
      res.set("Content-Type", "image/jpeg");
      res.send(image);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
