"use strict";
const express = require("express");
const logout = require("../controllers/logout_controller");
const router = express.Router();

// GET route: Handle user logout.
router.get("/", logout);

module.exports = router;
