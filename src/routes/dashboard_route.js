"use strict";
const express = require("express");
const control = require("../controllers/dashboard_controller");
const router = express.Router();

// GET route: Render dashboard.
router.get("/", control.renderDashboard);

module.exports = router;
