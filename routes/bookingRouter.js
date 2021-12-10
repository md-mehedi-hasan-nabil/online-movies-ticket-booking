const express = require("express");
const {
  getBookingPage,
  ticketBooking,
} = require("../controller/bookingController");

const router = express.Router();

router.get("/:id", getBookingPage);

router.post("/", ticketBooking);

module.exports = router;
