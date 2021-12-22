const Admin = require("../models/Movie");
const shuffleArray = require("../lib/shuffleArray");

function getHomePage(req, res) {
  Admin.find({}, (error, data) => {
    if (error) {
      res.status(500).render("error", { title: "error", massage: error });
    } else {
      res.status(200).render("index", { data: shuffleArray(data) });
    }
  });
}

module.exports = {
  getHomePage,
};
