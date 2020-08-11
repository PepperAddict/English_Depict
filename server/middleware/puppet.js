

const express = require("express");
require("dotenv").config();
const cors = require('cors')
const router = express.Router();
const path = require("path");
const puppeteer = require('puppeteer');
const { response } = require("express");


router.get(['/api/1/puppeteer/:page?'], cors(), async (req, res) => {
    const path = req.url.split("/");
    try {
        res.header('Access-Control-Allow-Origin', req.headers.origin);        
        const browser = await puppeteer.launch({
            args: ['--no-sandbox']
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