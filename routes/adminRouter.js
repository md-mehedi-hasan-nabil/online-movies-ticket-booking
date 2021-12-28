const express = require("express");
const {
  getAdminPage,
  uploadFile,
  sanitization,
  sanitizationResult,
  addMovie,
} = require("../controller/adminController");
const { htmlResponse } = require("../middlewares/htmlResponse");
const ProtectedRoute = require("../middlewares/ProtectedRoute");

const router = express.Router();
// admin dashboard
router.get("/", htmlResponse("Admin Dashboard"), ProtectedRoute, getAdminPage);
// add movies
router.post("/", uploadFile, sanitization, sanitizationResult, addMovie);

module.exports = router;
