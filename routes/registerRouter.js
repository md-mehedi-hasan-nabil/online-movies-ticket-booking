const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("register", { title: "Register | Create Your Account" });
});

module.exports = router;
