"use strict";
const User = require("../models/user_model");
/**
 * Render the login page
 *
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 */

exports.renderLogin = (req, res) => {
  const { userAuthenticated } = req.session.user || {};

  if (userAuthenticated) {
    return res.redirect("/");
  }
  res.render("./pages/login");
};

/**
 * Handles the login process for a user
 *
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @return {Promise<void>} A Promise representing the asynchronous operation
 */

exports.postLogin = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide an email and a password!" });
    }

    // Find user from database by email
    const currentUser = await User.findOne({ email }).select("+password");
    if (
      !currentUser ||
      !(await currentUser.isCorrect(password, currentUser.password))
    ) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // Set session userAuthenticated to true & redirect to homepage
    req.session.user = {
      userAuthenticated: true,
      name: currentUser.name,
      username: currentUser.username,
      profilePhoto: currentUser.profilePhoto?.url,
    };

    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Failed to save session." });
      }
      // Only redirect after session has saved
      return res.redirect("/register");
    });
  } catch (error) {
    throw error;
  }
};
