const { error } = require("console");
const Admin = require("../models/Movie");

function getHomePage(req, res) {
  Admin.find({}, (error, data) => {
    if (error) {
      res.status(500).render("error", { title: "error", massage: error });
    } else {
      res.status(200).render("index", { title: "Home Page", data: data });
    }
  });
}

module.exports = {
  getHomePage,
};
