"use strict";

// Function to apply the saved theme
const applySavedTheme = (L_icon, D_icon) => {
  const savedTheme = localStorage.getItem("theme");
  const isDarken = savedTheme === "dark-mode";
  if (savedTheme) {
    document.body.classList.remove("light-mode", "dark-mode"); // Clear any existing theme classes
    document.body.classList.add(savedTheme);
    if (L_icon && D_icon) {
      L_icon.style.opacity = isDarken ? 1 : 0;
      D_icon.style.opacity = isDarken ? 0 : 1;
    }
  } else {
    // Default to light mode if no theme is saved
    document.body.classList.add("light_mode");
  }
};

export default applySavedTheme;
