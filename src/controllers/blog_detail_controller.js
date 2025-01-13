"use strict";
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog_model");
const User = require("../models/user_model");
const markdown = require("../config/markdown_it_config");
/**
 * Retrieves and renders the detail of the blog.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If there is an error during the process.
 */

exports.renderBlogDetail = async (req, res) => {
  try {
    // Destructure blogId from request params
    const { blogId } = req.params;

    // Handle case where the provided blogId is not valid Mongoose ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);

    if (!isValidObjectId) {
      return res.render("./pages/404", {
        sessionUser: req.session.user,
      });
    }

    // Handle case where no blog found with provided blogId
    const blogExists = await Blog.exists({
      _id: new mongoose.Types.ObjectId(blogId),
    });
    if (!blogExists) {
      return res.render("./pages/404", {
        sessionUser: req.session.user,
      });
    }

    // Retrieve blog detail and populate owner info
    const blog = await Blog.findById(blogId).populate({
      path: "owner",
      select: "name username profilePhoto",
    });

    // Retrieve more blogs from blog owner
    const ownerBlogs = await Blog.find({ owner: { _id: blog.owner._id } })
      .select("title reaction totalBookmark owner readingTime createdAt")
      .populate({
        path: "owner",
        select: "name username profilePhoto",
      })
      // Get more blogs without current blog
      .where("_id")
      .nin(blogId)
      .sort({ createdAt: "desc" })
      .limit(3);

    // check if the session user has reacted to the blog or added to reading list.
    let user;
    if (req.session.user) {
      user = await User.findOne({ username: req.session.user.username }).select(
        "reactedBlogs readingList"
      );
    }

    res.render("./pages/blog_detail", {
      sessionUser: req.session.user,
      blog,
      ownerBlogs,
      markdown,
      user,
    });
  } catch (error) {
    // Log and throw error
    console.error("Error rendering blog detail page: ", error.message);
    throw error;
  }
};
