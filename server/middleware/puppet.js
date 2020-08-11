

const express = require("express");
require("dotenv").config();
const cors = require('cors')
const router = express.Router();
const path = require("path");
const puppeteer = require('puppeteer');
const useProxy = require('puppeteer-page-proxy')


router.get(['/api/1/puppeteer/', '/api/1/puppeteer/:page?'], cors(), async (req, res) => {
    console.log(req.query.url)

    try {
        //allow all origin and limit when there are problems
        res.header('Access-Control-Allow-Origin', '*');        
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-web-security']
        });
        
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', async request => {
            await useProxy(request, null);
        });
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