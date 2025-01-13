"use strict";
import dialog from "./dialog.js";

// Select the reading list button element and reading list number
const $readingListBtn = document.querySelector("[data-reading-list-btn]");
const $readingListNumber = document.querySelector("[data-reading-list-number]");

const currentPath = window.location.pathname; // e.g., '/blogs/677815016911ab5c7f693efb'
const blogId = currentPath.split("/")[2];

const addToReadingList = async () => {
  try {
    // Send a put request to the readingList endpoint
    const response = await fetch(`${blogId}/readingList`, {
      method: "PUT",
    });

    // Handle case where response is successful
    if (response.ok) {
      // Active readingList button and increase the readingList number
      $readingListBtn.classList.add("active");
      $readingListBtn.classList.remove("reaction-anim-remove");
      $readingListNumber.textContent =
        Number($readingListNumber.textContent) + 1;
    }
    // Handle case where response is 401 (Unauthorized)
    if (response.status === 401) {
      const $dialog = dialog({
        title: "Login to continue",
        content: `
              We're a place where coders share, stay up-to-date and grow their careers.
            `,
      });

      document.body.appendChild($dialog);
    }
  } catch (error) {
    // Log any errors
    console.error("Error adding to reading list: ", error.message);
  }
};

/**
 * Removes the current blog from the user's reading list
 * asynchronously.
 *
 * @throws {Error} If an error occurs during the removal process.
 */

const removeFromReadingList = async () => {
  try {
    // Send a DELETE request to the readingList endpoint
    const response = await fetch(`${blogId}/readingList`, {
      method: "DELETE",
    });

    // Handle case where response is successful
    if (response.ok) {
      // Inactive readingList button and decrease the readingList number
      $readingListBtn.classList.remove("active");
      $readingListNumber.textContent =
        Number($readingListNumber.textContent) - 1;
    }
  } catch (error) {
    // Log error
    console.error("Error removing from reading list: ", error.message);
  }
};

// Add event listener for click event
if ($readingListBtn)
  $readingListBtn.addEventListener("click", async function () {
    $readingListBtn.setAttribute("disabled", "");

    if (!$readingListBtn.classList.contains("active")) {
      await addToReadingList();
    } else {
      await removeFromReadingList();
    }

    $readingListBtn.removeAttribute("disabled");
  });
