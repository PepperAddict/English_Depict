const express = require("express");
const router = express.Router();
const path = require('path')

require("dotenv").config();



router.get(["/api/alexa", "/api/alexa/:page?"], (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../dist/index.html"))

// res.setHeader('Content-Type', 'application/json');
// res.send(JSON.stringify({
//     1: {first: {
//             word: "am",
//             sentence: "I am 5 years old.",
//             spell: ["a", "m"],
//             completed: false
        

//     }},
//     2: "YOU ENTERED TWO YOU PIECE OF SHIT",
//     3: "YEAH WUDDUP DAWWWGGG"
// }))
});

router.get("/api/1/alexa", function(req, res) {
    
})


module.exports = router;
