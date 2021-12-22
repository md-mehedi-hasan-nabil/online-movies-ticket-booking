const express = require("express");
const fs = require("fs");
const {
  getAdminPage,
  uploadFile,
  sanitization,
  sanitizationResult,
  addMovie,
} = require("../controller/adminController");
const { htmlResponse } = require("../middlewares/htmlResponse");

const router = express.Router();
// admin dashboard
router.get("/", htmlResponse("Admin Dashboard"), getAdminPage);
// add movies
router.post("/", uploadFile, sanitization, sanitizationResult, addMovie);

module.exports = router;
