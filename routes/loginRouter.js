const express = require("express");
const { getLoginPage } = require("../controller/loginController");
const { htmlResponse } = require("../middlewares/htmlResponse");

const router = express.Router();

router.get("/", htmlResponse("Login to Account"),getLoginPage);

module.exports = router;
