"use strict";
const express = require("express");
const router = express.Router();
const {
  renderBlogEdit,
  updateBlog,
} = require("../controllers/blog_update_controller");

// GET route: Render the reading list page.
router.get("/:blogId/edit", renderBlogEdit);

// PUT route: update blog
router.put("/:blogId/edit", updateBlog);

module.exports = router;
