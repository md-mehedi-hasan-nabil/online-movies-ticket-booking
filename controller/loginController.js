const fs = require("fs");

function getLoginPage(req, res, next) {
  res.render("login");
}

module.exports = {
  getLoginPage,
};
