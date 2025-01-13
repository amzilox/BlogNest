"use strict";
const bcrypt = require("bcrypt");

const User = require("../models/user_model");
const Utilfunc = require("../utils/generate_username");
exports.renderRegister = (req, res) => {
  const { userAuthenticated } = req.session.user || {};
  if (userAuthenticated) {
    return res.redirect("/");
  }
  res.render("./pages/register");
};

exports.postRegister = async (req, res) => {
  try {
    // Extract user data from request body:
    const { name, email, password } = req.body;

    // Create Username:
    const username = Utilfunc.generateUsername(name);

    // Hash the password:(In a pre hook at userModel)

    // Create user with provided data:
    await User.create({ name, email, password, username });

    // Redirect user to login page upon successful signup:
    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      // Handle specific duplicate field conflicts
      const field = Object.keys(error.keyPattern)[0]; // gets 'email' or 'username' field
      return res.status(409).send({
        message: `This ${field} is already associated with an account.`,
      });
    } else {
      return res.status(500).send({
        message: `Failed to register user. ${error.message}`,
      });
    }
    // console.error("Registration error:", error); // Logs full error details for debugging
    // throw error;
  }
};
