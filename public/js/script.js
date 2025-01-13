"use strict";
import applySavedTheme from "../js/utils/LocalStorage_theme.js";
import "./reading_list.js";
import "./reaction.js";
import "./count_visits.js";
import "./update_blog.js";
import "./create_blog.js";
import "./delete_blog.js";
import "./login.js";
import "./register.js";
import "./settings.js";

const $topAppBar = document.querySelector("[data-top-app-bar]");
let lastScrollPos = 0;

/**
 * Attaches event listener to the window scroll event, toggling classes on the top app bar based on scroll position.
 */

window.addEventListener("scroll", (event) => {
  // Toggling the 'active' class on the $topAppBar element based on whether the vertical scroll position is greater than 50px
  $topAppBar?.classList[window.scrollY > 50 ? "add" : "remove"]("active");

  // Toggling the 'hide' class based on whether the current scroll position is greater than the last scroll position and scroll position is greater than 50px
  $topAppBar?.classList[
    window.scrollY > lastScrollPos && window.scrollY > 50 ? "add" : "remove"
  ]("hide");

  // Updating the last recorded scroll position
  lastScrollPos = window.scrollY;
});

//////////////////////////////////////////////
//               Toggle menu                //
//////////////////////////////////////////////

const $menuWrappers = document.querySelectorAll("[data-menu-wrapper]");
if ($menuWrappers)
  $menuWrappers.forEach(function ($menuWrapper) {
    const $menuToggler = $menuWrapper.querySelector("[data-menu-toggler]");
    const $menu = $menuWrapper.querySelector("[data-menu]");

    $menuToggler.addEventListener("click", (event) => {
      event.stopPropagation();
      $menu.classList.toggle("active");
    });

    // Close the menu on pressing Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        $menu.classList.remove("active");
      }
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", (event) => {
      if (!$menuWrapper.contains(event.target)) {
        $menu.classList.remove("active");
      }
    });
  });

//////////////////////////////////////////////////////
//  Backward btn functionality in blog create page  //
//////////////////////////////////////////////////////
const $backBtn = document.querySelector("[data-back-btn]");

const handleBackward = function () {
  window.history.back();
};

$backBtn?.addEventListener("click", handleBackward);

//////////////////////////////////////////////////////
//     Auto height textarea in blog create form     //
//////////////////////////////////////////////////////

const $autoHeightTextarea = document.querySelector(
  "[data-textarea-auto-height]"
);

const textareaAutoHeight = function () {
  this.style.height = this.scrollHeight + "px";
  this.style.maxHeight = this.scrollHeight + "px";
};

$autoHeightTextarea?.addEventListener("input", textareaAutoHeight);

// Set initial textarea height
$autoHeightTextarea && textareaAutoHeight.call($autoHeightTextarea);

// Dark/light themes

const toggleThemeButton = document.getElementById("theme-toggle");
const lightIcon = document.querySelector(".lighten");
const darkIcon = document.querySelector(".darken");

// Apply the saved theme when the page loads
applySavedTheme(lightIcon, darkIcon);

// Function to toggle between themes and save the choice
const toggleTheme = () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    lightIcon.style.opacity = 0;
    darkIcon.style.opacity = 1;
    localStorage.setItem("theme", "light-mode");
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark-mode");
    lightIcon.style.opacity = 1;
    darkIcon.style.opacity = 0;
  }
};

// Add event listener to the toggle button
if (toggleThemeButton) toggleThemeButton.addEventListener("click", toggleTheme);
