

const express = require("express");
require("dotenv").config();
const router = express.Router();
const path = require("path");
const {sayProblem, checkAnswer} = require('../utils/math')

function mathy(res, mode, callback) {
    const modeLevel = (mode == "hard") ? false : true
    const sayProb = sayProblem(modeLevel);
    console.log(sayProb)
     callback(sayProb)

}


router.get(['/api/1/math/cashier/:page?'], (req, res) => {
    const path = req.url.split("/");
    const mode = path[path.length - 1];
    res.setHeader('Content-Type', 'application/json');
     mathy(res, mode, function (data) {
        return res.send(data)
    })
})

module.exports = router;