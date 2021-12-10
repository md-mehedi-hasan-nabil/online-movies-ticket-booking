const express = require("express");
const { getRegisterPage } = require("../controller/registerController");

const router = express.Router();

router.get("/", getRegisterPage);

module.exports = router;
