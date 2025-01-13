"use strict";
const express = require("express");
const ctrl = require("../controllers/register_controller");
const router = express.Router();

// GET router : Render the registration form

router.get("/", ctrl.renderRegister);

// POST router : Handles form submission for user registration
router.post("/", ctrl.postRegister);
module.exports = router;
