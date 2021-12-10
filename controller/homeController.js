const { error } = require("console");
const fs = require("fs");
const Admin = require("../models/Admin");

function getHomePage(req, res) {
  Admin.find({}, (error, data) => {
    if (error) {
      res.render("error", { title: "error", massage: error });
    }
    res.render("index", { title: "Home Page", data: data });
  });
}

module.exports = {
  getHomePage,
};
