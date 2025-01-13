"use strict";
const express = require("express");
const { renderProfile } = require("../controllers/profile_controller");
const router = express.Router();

// GET route: Handle user logout.
router.get(["/:username", "/:username/page/:pageNumber"], renderProfile);

module.exports = router;
