"use strict";
const mongoose = require("mongoose");

/**
 * Mongoose schema for blog
 */
const blogSchema = new mongoose.Schema(
  {
    banner: {
      url: {
        type: String,
        require: true,
      },
      public_id: {
        type: String,
        require: true,
      },
    },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    reaction: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: Number,
      default: 0,
    },
    totalBookmark: {
      type: Number,
      default: 0,
    },
    totalVisit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
