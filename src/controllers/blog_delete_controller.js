"use strict";

const Blog = require("../models/blog_model");
const User = require("../models/user_model");

const deleteBlog = async (req, res) => {
  try {
    // Retrieve blog id from request params
    const { blogId } = req.params;

    // Retrieve username from session
    const { username } = req.session.user;

    // Find the blog to delete

    const ToBeDeletedBlog = await Blog.findOne({ _id: blogId }).select(
      "reaction totalVisit"
    );

    // Find the current user by username
    const currentUser = await User.findOne({ username }).select(
      "blogPublished totalVisits totalReactions blogs"
    );

    // Update user information from the database
    currentUser.blogPublished--;
    currentUser.totalVisits -= ToBeDeletedBlog.totalVisit;
    currentUser.totalReactions -= ToBeDeletedBlog.reaction;
    currentUser.blogs.splice(currentUser.blogs.indexOf(blogId), 1);
    await currentUser.save();

    // Delete blog from database
    await Blog.deleteOne({ _id: blogId });

    res.sendStatus(200);
  } catch (error) {
    // Log error
    console.error("Error deleting blog: ", error.message);
    throw error;
  }
};

module.exports = deleteBlog;
