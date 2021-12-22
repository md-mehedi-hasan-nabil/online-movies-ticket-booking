const express = require("express");
const fs = require("fs");
const { getHomePage } = require("../controller/homeController");
const { htmlResponse } = require("../middlewares/htmlResponse");

const router = express.Router();

router.get("/", htmlResponse("Home Page"), getHomePage);

module.exports = router;
