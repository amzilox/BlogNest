"use strict";
const express = require("express");
const control = require("../controllers/create_blog_controller");
const router = express.Router();

// GET route: Render the blog create page.
router.get("/", control.renderCreateBlog);

// POST route: Create a new blog.
router.post("/", control.postCreateBlog);

module.exports = router;
