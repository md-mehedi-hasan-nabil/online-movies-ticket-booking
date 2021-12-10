const fs = require("fs");

function getLoginPage(req, res, next) {
    res.render("login", {title: "Login Account"});
}

module.exports = {
    getLoginPage
}
