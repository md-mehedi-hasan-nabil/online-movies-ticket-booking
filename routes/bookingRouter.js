const express = require("express");
const { getBookingPage } = require("../controller/bookingController");

const router = express.Router();

router.get("/:id", getBookingPage);

module.exports = router;
