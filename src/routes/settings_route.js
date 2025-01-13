"use strict";
const express = require("express");
const {
  renderSettings,
  updateBasicInfo,
  updatePassword,
  deleteAccount,
} = require("../controllers/settings_controller");
const router = express.Router();

// GET route: Render the settings page.
router.get("/", renderSettings);

// PUT route: Update user basic info.
router.put("/basic_info", updateBasicInfo);

// PUT route: Update user password.
router.put("/password", updatePassword);

// DELETE route: Delete user account.
router.delete("/account", deleteAccount);

module.exports = router;
