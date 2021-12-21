const express = require("express");
const fs = require("fs");
const {
  getAdminPage,
  uploadFile,
  sanitization,
  addMovie,
} = require("../controller/adminController");

const router = express.Router();

router.get("/", getAdminPage);
router.post("/", uploadFile, sanitization, addMovie);

module.exports = router;
