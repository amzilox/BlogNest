"use strict";
const Blog = require("../models/blog_model");
const getPagination = require("../utils/get_pagination");

/**
 * Controller function to render the home page with blog data.
 *
 * @param {Object} req - The request object.
 * @param {Object} res _ The response object.
 * @throws {Error} - Throws an error if there's an issue rendering the home page
 */

exports.renderHome = async (req, res) => {
  try {
    // Retrieve total amount of created blogs
    const totalBlogs = await Blog.countDocuments();
    // Get pagination object
    const pagination = getPagination("/", req.params, 6, totalBlogs);
    // Retrieve blogs from the database, selecting specified fields and populating 'owner' field.
    const latestBlogs = await Blog.find()
      .select("banner createdAt readingTime title reaction totalBookmark")
      .populate({
        path: "owner",
        select: "name username profilePhoto",
      })
      .sort({ createdAt: "desc" })
      .limit(pagination.limit)
      .skip(pagination.skip);
    res.render("./pages/home", {
      sessionUser: req.session.user,
      latestBlogs,
      pagination,
    });
  } catch (error) {
    // log & throw error if there's an issue rendering the home page
    console.error("Error rendering home page: ", error.message);
    throw error;
  }
};
