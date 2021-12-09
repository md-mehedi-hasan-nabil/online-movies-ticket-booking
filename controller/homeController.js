const fs = require("fs");

function getHomePage(req, res, next) {
  fs.readFile(`${__dirname}/json/movies.json`, "utf8", function (err, data) {
    if (err) {
      res.status(404).send("file read fail");
    } else {
      res.render("index", { title: "Home Page", data: JSON.parse(data) });
    }
  });
}

module.exports = {
  getHomePage,
};
