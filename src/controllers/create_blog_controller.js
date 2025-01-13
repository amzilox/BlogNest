"use strict";
const crypto = require("crypto");
const { uploadToCloudinary } = require("../config/cloudinary_config");
const getReadingTime = require("../utils/get_reading_time");
const Blog = require("../models/blog_model");
const User = require("../models/user_model");
/**
 * Renders the blog create page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */

exports.renderCreateBlog = (req, res) => {
  res.render("./pages/create_blog", {
    sessionUser: req.session.user,
    route: req.originalUrl,
  });
};

exports.postCreateBlog = async (req, res) => {
  try {
    // Retrieve title and content from request body.
    const { banner, title, content } = req.body;
    // Retrieve blog owner's data.
    const user = await User.findOne({
      username: req.session.user.username,
    }).select("_id blogs blogPublished");
    // Upload blog banner to Cloudinary
    const public_id = crypto.randomBytes(10).toString("hex");
    const bannerURL = await uploadToCloudinary(banner, public_id);

    // Create a new blog post
    const newBlog = await Blog.create({
      banner: {
        url: bannerURL,
        public_id,
      },
      title,
      content,
      owner: user._id,
      readingTime: getReadingTime(content),
    });

    // Update user's blog data
    user.blogs.push(newBlog._id);
    user.blogPublished++;
    await user.save();
    // res.status(200).json({ blogId: newBlog._id });
    // Redirect to the newly created post page
    res.redirect(`/blogs/${newBlog._id}`);
  } catch (error) {
    // Log and throw error if any
    console.error("Error create new blog: ", error.message);
    throw error;
  }
};
