"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Mongoose schema for user data.

const UserSchema = new mongoose.Schema(
  {
    profilePhoto: {
      url: String,
      public_id: String,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: String,
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    blogs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Blog",
    },
    blogPublished: {
      type: Number,
      default: 0,
    },
    reactedBlogs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Blog",
    },
    totalVisits: {
      type: Number,
      default: 0,
    },
    totalReactions: {
      type: Number,
      default: 0,
    },
    readingList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "blog",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Hash the password using bcrypt
  this.password = await bcrypt.hash(this.password, 12); // 12 is the salt rounds

  next();
});

// instance Methods
UserSchema.methods.isCorrect = async function (condidatPassword, userPassword) {
  return await bcrypt.compare(condidatPassword, userPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
