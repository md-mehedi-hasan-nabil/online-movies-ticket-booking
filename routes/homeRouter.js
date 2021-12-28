const express = require("express");
const fs = require("fs");
const { getHomePage } = require("../controller/homeController");
const { htmlResponse } = require("../middlewares/htmlResponse");
const checkLoggedInUser = require("../middlewares/checkLoggedInUser");

const router = express.Router();

router.get("/", htmlResponse("Home Page"), checkLoggedInUser, getHomePage);

module.exports = router;
