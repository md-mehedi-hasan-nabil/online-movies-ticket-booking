const express = require("express");
const {
  getRegisterPage,
  sanitization,
  registerUser,
} = require("../controller/registerController");

const router = express.Router();

router.get("/", getRegisterPage);
router.post("/", sanitization, registerUser);

module.exports = router;
