const express = require("express");
const fs = require("fs");
const { getAdminPage, addMovie } = require("../controller/adminController");

const router = express.Router();

router.get("/", getAdminPage);
router.post("/", addMovie);

module.exports = router;
