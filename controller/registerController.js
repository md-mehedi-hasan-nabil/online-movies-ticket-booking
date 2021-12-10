const fs = require("fs");

function getRegisterPage(req, res, next) {
  res.render("register", { title: "Register | Create Your Account" });
}

module.exports = {
  getRegisterPage,
};
