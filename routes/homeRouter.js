const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
    fs.readFile(`${__dirname}/json/movies.json`, "utf8", function (err, data) {
      if (err) {
        res.status(404).send("file read fail");
      } else {
        res.render("index", { title: "Home Page", data: JSON.parse(data) });
      }
    });
});

module.exports = router;
