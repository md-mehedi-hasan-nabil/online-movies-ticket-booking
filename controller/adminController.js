// const mongoose = require("mongoose");
// const { Schema } = mongoose;
const Admin = require("../models/Admin");

function getAdminPage(req, res) {
  res.render("admin", { title: "Admin Dashboard" });
}

function addMovie(req, res) {
  const movieData = new Admin(req.body);
  movieData.save(function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    }
  });
  console.log(req.body);
  res.status("200").send("data insert successful!");
}

module.exports = {
  getAdminPage,
  addMovie,
};
