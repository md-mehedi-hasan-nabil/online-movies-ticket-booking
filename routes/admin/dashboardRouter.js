const express = require("express");
const {
  getAdminDashboardPage,
} = require("../../controller/dashboardController");
const { htmlResponse } = require("../../middlewares/htmlResponse");
const ProtectedRoute = require("../../middlewares/ProtectedRoute");

const router = express.Router();
// admin dashboard
router.get("/", htmlResponse("Admin Dashboard"), ProtectedRoute, getAdminDashboardPage)

module.exports = router;
