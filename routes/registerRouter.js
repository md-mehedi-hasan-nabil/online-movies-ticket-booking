const express = require("express");
const {
  getRegisterPage,
  sanitization,
  registerUser,
} = require("../controller/registerController");
const { htmlResponse } = require("../middlewares/htmlResponse");

const router = express.Router();

router.get(
  "/",
  htmlResponse("Register | Create Your Account"),
  getRegisterPage
);
router.post("/", sanitization, registerUser);

module.exports = router;
