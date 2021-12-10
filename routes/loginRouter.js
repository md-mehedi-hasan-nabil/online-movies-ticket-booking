const express = require("express");
const { getLoginPage } = require("../controller/loginController");

const router = express.Router();

router.get("/", getLoginPage);

module.exports = router;
