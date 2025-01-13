"use strict";

import imagePreview from "./utils/imagePreview.js";
import Snackbar from "./snackbar.js";
import config from "./config.js";
import imageAsDataURL from "./utils/imageAsDataUrl.js";
// Selectors for image field, image preview, and clear preview button
const $imageField = document.querySelector("[data-image-field]");
const $imagePreview = document.querySelector("[data-image-preview]");
const $imagePreviewClear = document.querySelector("[data-image-preview-clear]");
const $progressBar = document.querySelector("[data-progress-bar]");
// Event listener for image field change to trigger image preview

if ($imageField)
  $imageField.addEventListener("change", () => {
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
const $publishBtn = document.querySelector("[data-publish-btn]");

const handlePublishBlog = async function (event) {
  // Preventing default form submission behavior.
  event.preventDefault();

  // Disabling publish button to prevent multiple submissions.
  $publishBtn?.setAttribute("disabled", "");

  // Creating FormData object to capture form data.
  const formData = new FormData($form);

  // Ensure there's not conflics between this form and register form
  if (formData.get("confirm_password") || formData.get("password")) return;

  // Handle case where user not selected any image for banner when creating blog.
  if (!formData.get("banner")?.size) {
    // Enable publish button and show error message
    $publishBtn?.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message: "You Didn't select any image for blog banner",
    });
    return;
  }
  // Handle case where selected image size larger than 5MB.
  if (formData.get("banner").size > config.maxByteSize) {
    // Enable publish button and show error message
    $publishBtn?.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message: "Image should be less than 5MB.",
    });
    return;
  }

  // Overwrite banner value (which is type of 'File') to base64.
  formData.set("banner", await imageAsDataURL(formData.get("banner")));

  // Create request body from formdata
  const body = Object.fromEntries(formData.entries());

  // Show progress bar
  $progressBar.classList.add("loading");

  try {
    // Sending form data to the server for create blog.
    const response = await axios.post(`/createblog`, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      // Redirect or show success message
      Snackbar({
        message: "Your blog has been created successfully!",
      });
      // Re-enable the publish button
      $publishBtn.removeAttribute("disabled");
      $progressBar.classList.add("loading-end");

      return (window.location = response.request.responseURL);
    }
  } catch (error) {
    // Handle error if the request fails
    Snackbar({
      type: "error",
      message: error.response?.data?.message || "Failed to create blog.",
    });
    $progressBar.classList.add("loading-end");
  }
};
if ($form) $form.addEventListener("submit", handlePublishBlog);
