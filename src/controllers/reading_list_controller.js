"use strict";
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog_model");
const User = require("../models/user_model");
const getPagination = require("../utils/get_pagination");

/**
 * Add a blog post to the reading list of the logged-in user
 * and update the total bookmark count of the bookmark count of the blog.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} - If an error occurs during the process.
 */

const addToReadingList = async function (req, res) {
  try {
    // Handle case where user is not authenticated
    if (!req.session.user) return res.sendStatus(401);

    // Destructure username from session
    const { username } = req.session.user;

    // Destructure blogId from request params
    const { blogId } = req.params;

    /**
     * Find current logged user and check,
     * if already added current blog to reading list
     */
    const loggedUser = await User.findOne({ username }).select("readingList");

    if (loggedUser.readingList.includes(blogId)) {
      return res.sendStatus(400);
    }

    // Update logged user reading list and save
    loggedUser.readingList.push(blogId);
    await loggedUser.save();

    // Find the totalBookmark and update
    const readingListedBlog = await Blog.findById(blogId).select(
      "totalBookmark"
    );

    if (!readingListedBlog) {
      return res.sendStatus(400);
    }

    readingListedBlog.totalBookmark++;
    await readingListedBlog.save();

    res.sendStatus(200);
  } catch (error) {
    // Log error
    console.error("Error updating reading list: ", error.message);
    throw error;
  }
};

/**
 * Removes a blog from the reading list of the logged-in
 * decrements the total bookmark count of the blog.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @throws {Error} Throws an error if any operation fails.
 */

const removeFromReadingList = async function (req, res) {
  try {
    // Handle case where user is not authenticated
    if (!req.session.user) return res.sendStatus(401);

    // Destructure username from session
    const { username } = req.session.user;

    // Destructure blogId from request params
    const { blogId } = req.params;

    // Handle case where blog is not contain in reading list
    const loggedUser = await User.findOne({ username }).select("readingList");

    if (!loggedUser.readingList.includes(blogId)) {
      return res.sendStatus(400);
    }

    // Update user reading list and save
    loggedUser.readingList.splice(loggedUser.readingList.indexOf(blogId), 1);
    await loggedUser.save();

    // Find the totalBookmark and update
    const readingListedBlog = await Blog.findById(blogId).select(
      "totalBookmark"
    );

    if (!readingListedBlog) {
      return res.sendStatus(400);
    }

    readingListedBlog.totalBookmark--;
    await readingListedBlog.save();

    res.sendStatus(200);
  } catch (error) {
    // Log Error
    console.error("Error removing from reading list: ", error.message);
    throw error;
  }
};

const renderReadingList = async (req, res) => {
  try {
    // Retrieve logged client username
    const { username } = req.session.user;

    // Retrieve total amount of reading list blogs
    const { readingList } = await User.findOne({ username }).select(
      "readingList"
    );

    // Get pagination object
    const pagination = getPagination(
      "/readinglist",
      req.params,
      20,
      readingList.length
    );

    // Retrieve reading list blogs based on pagination parameters
    const readingListBlogs = await Blog.find({
      _id: {
        $in: readingList,
      },
    })
      .select("owner createdAt readingTime title reaction totalBookmark")
      .populate({
        path: "owner",
        select: "name username profilePhoto",
      })
      .limit(pagination.limit)
      .skip(pagination.skip);

    // Render the reading list page with retrieved data
    res.render("./pages/reading_list", {
      sessionUser: req.session.user,
      readingListBlogs,
      pagination,
    });
  } catch (error) {
    // Log error
    console.error("Error rendering reading list: ", error.message);
    throw error;
  }
};

module.exports = { addToReadingList, removeFromReadingList, renderReadingList };
