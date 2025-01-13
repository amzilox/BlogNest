"use strict";
const express = require("express");
const control = require("../controllers/blog_detail_controller");
const {
  updateReaction,
  deleteReaction,
} = require("../controllers/reaction_controller");

const {
  addToReadingList,
  removeFromReadingList,
} = require("../controllers/reading_list_controller");

const updateVisit = require("../controllers/visit_controller");
const router = express.Router();

// GET route: Render the blog create page.
router.get("/:blogId", control.renderBlogDetail);

// PUT route: Update blog reactions.
router.put("/:blogId/reactions", updateReaction);

// DELETE route: DELETE blog reactions.
router.delete("/:blogId/reactions", deleteReaction);

// PUT route: add blog to reading list.
router.put("/:blogId/readingList", addToReadingList);

// DELETE route: DELETE blog reading list.
router.delete("/:blogId/readingList", removeFromReadingList);

router.put("/:blogId/visit", updateVisit);

module.exports = router;
