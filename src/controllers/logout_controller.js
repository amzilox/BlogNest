"use strict";
const User = require("../models/user_model");

/**
 * Logout the user by destroying the session and redirecting to home page.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */

const logout = async (req, res) => {
  try {
    // Delete user session
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    // Log and throw error
    console.error("Error logout: ", error.message);
    throw error;
  }
};

module.exports = logout;
