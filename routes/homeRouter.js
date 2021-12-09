const express = require("express");
const fs = require("fs");
const { getHomePage } = require("../controller/homeController");

const router = express.Router();

router.get("/", getHomePage);

module.exports = router;
