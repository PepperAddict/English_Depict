

const express = require("express");
require("dotenv").config();
const cors = require('cors')
const router = express.Router();
const path = require("path");
const puppeteer = require('puppeteer');
const { response } = require("express");


router.get(['/api/1/puppeteer/', '/api/1/puppeteer/:page?'], async (req, res) => {

    try {
        //allow all origin and limit when there are problems
        res.header('Access-Control-Allow-Origin', '*');        
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(req.query.url, {waitUntil: 'networkidle0'});
        const image = await page.screenshot({type: "jpeg", quality: 50});
        await browser.close();
        res.set('Content-Type', 'image/jpeg');
        res.send(image);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;