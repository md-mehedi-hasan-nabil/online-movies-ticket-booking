const express = require("express");
const {
  getAddMoviesPage,
  uploadFile,
  sanitization,
  sanitizationResult,
  addMovie,
} = require("../../controller/addMoviesController");
const { htmlResponse } = require("../../middlewares/htmlResponse");
const ProtectedRoute = require("../../middlewares/ProtectedRoute");

const router = express.Router();
// admin dashboard
router.get("/", htmlResponse("Add Movies"), ProtectedRoute, getAddMoviesPage);
// add movies
router.post("/", uploadFile, sanitization, sanitizationResult, addMovie);

module.exports = router;
