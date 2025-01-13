"use strict";
const express = require("express");
const control = require("../controllers/login_controller");
const router = express.Router();

// GET route: Render the login form
router.get("/", control.renderLogin);

// POST route: Handles form submission for user login.
router.post("/", control.postLogin);

module.exports = router;
