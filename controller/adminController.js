const Admin = require("../models/Admin");

function getAdminPage(req, res) {
  res.render("admin", { title: "Admin Dashboard", massage: "" });
}

function addMovie(req, res) {
  const movieData = new Admin(req.body);
  movieData.save(function (err) {
    if (err) {
      console.log(err);
      res.status("200").render("admin", {
        title: "Admin Dashboard",
        error: "data insert fail!"
      });
    }
  });
  // res.redirect('/admin');
  res.status("200").render("admin", {
    title: "Admin Dashboard",
    massage: "data insert successful!"
  });
}

function sanitization() {
  return [
    check("email")
  ];
}

module.exports = {
  getAdminPage,
  addMovie,
  sanitization,
};
