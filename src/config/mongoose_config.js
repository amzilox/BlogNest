"use strict";
const mongoose = require("mongoose");

/**
 * Client options obj containing server API configuration.
 * @type {ClientOptions}
 */

const ClientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

/**
 * Connects to the MongoDB database using the provided connection string.
 *
 * @param {string} connectionStr - The MongoDB connection string.
 * @returns {Promise<void>} - A promise that resolves when the connection is successfully established.
 * @throws {Error} - If there's an error during the connection process.
 */

exports.connectDB = async (connectionURL) => {
  try {
    await mongoose.connect(connectionURL, ClientOptions);
    console.log("Connected to mongodb");
  } catch (error) {
    console.error("Error connecting to mongodb", error.message);
    throw error;
  }
};

/**
 * DisConnects from the MongoDB database using Mongoose.
 * @async
 * @function disconnectDB
 * @returns {Promise<void>} - A promise that resolves once disconnection is complete.
 * @throws {Error} - If an error occurs during disconnection.
 */

exports.disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from mongodb");
  } catch (error) {
    console.error("Error disconnecting from mongodb", error.message);
    throw error;
  }
};
