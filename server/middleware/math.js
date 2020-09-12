const express = require("express");
require("dotenv").config();
const router = express.Router();
const path = require("path");
const { sayProblem, checkAnswer } = require("../utils/math");
var schedule = require("node-schedule");

let sayProb;

function mathy(res, mode, callback) {
  const modeLevel = mode == "hard" ? false : true;
  //Get new math problems once a day

  schedule.scheduleJob("*/60 * * * *", (fireDate) => {
      sayProb = {
          easy : sayProblem(true),
          hard : sayProblem(false)
      }
  });
  callback(sayProb);
}

router.get(["/api/1/math/cashier/:page?"], (req, res) => {
  const path = req.url.split("/");
  const mode = path[path.length - 1];
  res.setHeader("Content-Type", "application/json");
  mathy(res, mode, function (data) {
    return res.json(data);
  });
});

router.get("/api/2/math", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  mathy(res, "easy", (data) => {
    return res.send(data);
  });
});

module.exports = router;
