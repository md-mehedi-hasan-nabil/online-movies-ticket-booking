const express = require("express");

const {
  getRegisterPage,
  sanitization,
  sanitizationResult,
  registerUser,
} = require("../controller/registerController");
const { htmlResponse } = require("../middlewares/htmlResponse");

const router = express.Router();
const PAGE_TITLE = "Register | Create Your Account";

router.get("/", htmlResponse(PAGE_TITLE), getRegisterPage);
router.post("/", htmlResponse(PAGE_TITLE), sanitization, sanitizationResult, registerUser);

module.exports = router;
