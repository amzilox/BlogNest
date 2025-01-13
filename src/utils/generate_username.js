"use strict";
exports.generateUsername = (name) => {
  const username = name.toLowerCase().replace(/\s+/g, "");
  return `${username}-${Date.now()}`;
};
