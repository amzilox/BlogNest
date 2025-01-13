"use strict";
const express = require("express");
const control = require("../controllers/home_controller");
const router = express.Router();

// GET route: Render the login form
router.get(["/", "/page/:pageNumber"], control.renderHome);

module.exports = router;
