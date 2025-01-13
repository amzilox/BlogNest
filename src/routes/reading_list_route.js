"use strict";
const express = require("express");
const router = express.Router();
const { renderReadingList } = require("../controllers/reading_list_controller");

// GET route: Render the reading list page.
router.get(["/", "/page/:pageNumber"], renderReadingList);

module.exports = router;
