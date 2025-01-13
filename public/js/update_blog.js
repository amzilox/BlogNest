"use strict";

import Snackbar from "./snackbar.js";
import imagePreview from "./utils/imagePreview.js";
import imageAsDataURL from "./utils/imageAsDataUrl.js";
import config from "./config.js";

// Selectors for image field, image preview, and clear preview button
const $imageField = document.querySelector("[data-image-field]");
const $imagePreview = document.querySelector("[data-image-preview]");
const $imagePreviewClear = document.querySelector("[data-image-preview-clear]");

// Event listener for image field change to trigger image preview
$imageField?.addEventListener("change", () => {
  imagePreview($imageField, $imagePreview);
});

/**
 * Clears the image preview by removing the 'show' class from the preview container
 * @function clearImagePreview
 */

const clearImagePreview = function () {
  $imagePreview.classList.remove("show");
  $imagePreview.innerHTML = "";
};

$imagePreviewClear?.addEventListener("click", clearImagePreview);

/**
 * Handle blog publish
 */
const $form = document.querySelector("[data-form]");
const $submitBtn = document.querySelector("[data-submit-btn]");
const $progressBar = document.querySelector("[data-progress-bar]");

// Function to toggle submit button state
function toggleSubmitButton() {
  if ($imageField.files.length > 0) {
    $submitBtn?.removeAttribute("disabled");
  } else {
    $submitBtn?.setAttribute("disabled", "disabled");
  }
}

// Event listener for image field change to trigger image preview
$imageField?.addEventListener("change", () => {
  toggleSubmitButton();
});

const handlePublishBlog = async function (event) {
  // Preventing default form submission behavior.
  event.preventDefault();

  // Disabling publish button to prevent multiple submissions.
  $submitBtn?.setAttribute("disabled", "");

  // Creating FromData object to capture form data.
  const formData = new FormData($form);

  // Ensure there's not conflics between this form and register form
  if (formData.get("confirm_password") || formData.get("password")) return;

  // Handle case where user not selected any image for banner when creating blog.
  if (!formData.get("banner")?.size && !$imagePreview?.hasChildNodes()) {
    // Enable submit button and show error message
    $submitBtn?.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message: "You Didn't select any image for blog banner",
    });
    return;
  }

  // Handle case where selected image size larger than 5MB.
  if (formData.get("banner")?.size > config.maxByteSize) {
    // Enable submit button and show error message
    $submitBtn.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message: "Image should be less than 5MB.",
    });
    return;
  }

  // Handle case when user don't update the blog banner.
  if (!formData.get("banner")?.size && $imagePreview.hasChildNodes()) {
    formData.delete("banner");
  }

  // Handle case when user update the blog banner.
  if (formData.get("banner")) {
    formData.set("banner", await imageAsDataURL(formData.get("banner")));
  }

  // Create request body form formData.
  const body = Object.fromEntries(formData.entries());

  // Show progress bar
  $progressBar.classList.add("loading");

  // Send form data to the server for update blog.
  //   const response = await fetch(window.location.href, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });

  const currentPath = window.location.pathname; // e.g., '/blogs/67781059d5bfbf79608410a2/edit'
  // Send form data to the server to update the blog
  const response = await axios.put(`${currentPath}`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Handle case where response is success.
  if (response.status >= 200 && response.status < 300) {
    $submitBtn.removeAttribute("disabled");
    Snackbar({ message: "Your blog has been updated." });
    $progressBar.classList.add("loading-end");

    // Redirect to the updated blog's page
    window.location = window.location.href.replace("/edit", "");
    return;
  }

  // Handle case where response is 400 (Bad Request)
  if (response.status === 400) {
    $progressBar.classList.add("loading-end");
    $submitBtn.removeAttribute("disabled");
    const { message } = await response.json();
    Snackbar({
      type: "error",
      message,
    });
  }
};

$form?.addEventListener("submit", handlePublishBlog);
