const express = require("express");
const {
  getBookingPage,
  ticketBooking,
} = require("../controller/bookingController");
const { htmlResponse } = require("../middlewares/htmlResponse");
const checkLoggedInUser = require("../middlewares/checkLoggedInUser");

const router = express.Router();

router.get(
  "/:id",
  htmlResponse("Booking Page"),
  checkLoggedInUser,
  getBookingPage
);

router.post("/", ticketBooking);

module.exports = router;
