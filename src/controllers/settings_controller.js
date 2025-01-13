"use strict";
const mongoose = require("mongoose");
const { startSession } = mongoose;
const User = require("../models/user_model");
const Blog = require("../models/blog_model");
const { uploadToCloudinary } = require("../config/cloudinary_config");

/**
 * Retrieves settings for the current user and renders the settings page.
 *
 * @async
 * @function renderSettings
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - Throws an error if there's an issue during the process.
 */

const renderSettings = async (req, res) => {
  try {
    // Retrieve logged client username
    const { username } = req.session.user;

    // Retrieve current user
    const currentUser = await User.findOne({ username });

    // Render the settings page
    res.render("./pages/settings", {
      sessionUser: req.session.user,
      currentUser,
    });
  } catch (error) {
    // Log error
    console.error("Error rendering settings page: ", error.message);
    throw error;
  }
};

/**
 * Updates basic info of the logged-in user such as name, username, email, bio, and
 profile photo.
 * @async
 * @param {Object} req 
 * @param {Object} res
 * @throws {Error} - Throws an error if there's an issue during the process. 
 */

const updateBasicInfo = async (req, res) => {
  try {
    // Retrieve logged client username from session
    const { username: sessionUsername } = req.session.user;

    // Retrieve current user based on session username
    const currentUser = await User.findOne({
      username: sessionUsername,
    }).select("profilePhoto name username email bio");

    // Destructure properties from request body
    const { profilePhoto, name, username, email, bio } = req.body;

    // Handle case where new email is already associated with an account
    if (email) {
      if (await User.exists({ email })) {
        return res.status(400).json({
          message:
            "Sorry, an account is already associated with this email address.",
        });
      }

      // Update email of the current user
      currentUser.email = email;
    }

    // Handle case where new username is already in use
    if (username) {
      if (await User.exists({ username })) {
        return res.status(400).json({
          message:
            "Sorry, that username is already taken. Please choose a different one.",
        });
      }

      // Update username of the current user ans session user
      currentUser.username = username;
      req.session.user.username = username;
    }

    // If profile photo is provided, upload it to cloudinary and update user's profile photo
    if (profilePhoto) {
      const public_id = currentUser.username;
      const imageURL = await uploadToCloudinary(profilePhoto, public_id);

      currentUser.profilePhoto = {
        url: imageURL,
        public_id,
      };
      req.session.user.profilePhoto = imageURL;
    }

    // Update name and bio of the current user and session user
    currentUser.name = name;
    req.session.user.name = name;
    currentUser.bio = bio;

    // Save updated user information to the database
    await currentUser.save();

    // Send success response
    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    // Log error
    console.error("Error updating basic info: ", error.message);
    // Send error response
    res
      .status(500)
      .json({ message: "An internal error occurred. Please try again later." });
  }
};

/**
 * Updates the password for the logged-in user.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - Throws an error if there's an issue during the process.
 */

const updatePassword = async (req, res) => {
  try {
    // Retrieve logged client username from session
    const { username: sessionUsername } = req.session.user;

    // Retrieve current user based on session username
    const currentUser = await User.findOne({
      username: sessionUsername,
    }).select("password");

    // Destructure properties from request body
    const { old_password, password } = req.body;

    // Handle case where old password is not valid
    if (!(await currentUser.isCorrect(old_password, currentUser.password))) {
      return res.status(401).json({
        status: "fail",
        message: "The Current Password is Incorrect!",
      });
    }

    // Handle case where user set old password as the new one
    if (await currentUser.isCorrect(password, currentUser.password)) {
      return res.status(401).json({
        status: "fail",
        message: "You can't use the old one here again!",
      });
    }

    // Assign to current user password
    currentUser.password = password;

    // Save the updated password
    await currentUser.save();

    // Send success status
    res.sendStatus(200);
  } catch (error) {
    // Log error
    console.error("Error while updating password: ", error.message);
    throw error;
  }
};

/**
 * Delete the current user account.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - Throws an error if there's an issue during the process.
 */

const deleteAccount = async (req, res) => {
  const session = await startSession();
  try {
    session.startTransaction();

    // Validate user session
    if (!req.session.user || !req.session.user.username) {
      return res
        .status(400)
        .json({ message: "User session is invalid or missing." });
    }

    // Retrieve logged client username from session
    const { username } = req.session.user;

    // Retrieve current user based on session username
    const currentUser = await User.findOne({ username })
      .select("blogs")
      .session(session);

    if (!currentUser) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found." });
    }

    // Delete all blogs that current user published
    await Blog.deleteMany({ _id: { $in: currentUser.blogs } }).session(session);

    // Delete current user account
    await User.deleteOne({ username }).session(session);

    // Destroy current user session from all devices
    const Session = mongoose.connection.db.collection("sessions");
    // Destroy session from database
    await Session.deleteMany({
      session: { $regex: `"username":"${username}"` },
    });
    // Destroy session from client device
    req.session.destroy((err) => {
      if (err) {
        console.error("Failed to destroy session:", err);
      }
    });

    await session.commitTransaction();
    res.status(200).json({
      message: "User account and associated data deleted successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    // Log error
    console.error("Error deleting account: ", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the account." });
  } finally {
    session.endSession();
  }
};

module.exports = {
  renderSettings,
  updateBasicInfo,
  updatePassword,
  deleteAccount,
};
