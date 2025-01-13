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
 * Clear the image preview by removing the 'show' class from the 
 preview container.
 */
const clearImagePreview = function () {
  $imagePreview.classList.remove("show");
  $imagePreview.innerHTML = "";
  $imageField.value = "";
};

$imagePreviewClear?.addEventListener("click", clearImagePreview);

/**
 * Basic info update functionality
 */
const $basicInfoForm = document.querySelector("[data-basic-info-form]") || null;
const $basicInfoSubmit = document.querySelector("[data-basic-info-submit]");
const oldFormData = $basicInfoForm ? new FormData($basicInfoForm) : null;
const $progressBar = document.querySelector("[data-progress-bar]");

/**
 * Update basic information of the user profile.
 * @param {Event} event - The event object representing the form
 submission.
 */
const updateBasicInfo = async (event) => {
  // Preventing default form submission behavior.
  event.preventDefault();

  // Disable publish button to prevent multiple submissions.
  $basicInfoSubmit.setAttribute("disabled", "");

  // Create FormData object to capture basic info form data.
  const formData = new FormData($basicInfoForm);

  // Handle case where selected image size is larger than 1MB.
  if (formData.get("profilePhoto").size > config.profilePhoto.maxByteSize) {
    // Enable submit button and show error message
    $basicInfoSubmit.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message: "Your profile photo should be less than 1MB.",
    });
    return;
  }

  // Handle case where user not selected any image for profilePhoto
  if (!formData.get("profilePhoto").size) {
    formData.delete("profilePhoto");
  }

  // Handle case where profilePhoto field exists
  if (formData.get("profilePhoto")) {
    // Overwrite profilePhoto value (which is type of 'File') to
    // base64
    formData.set("profilePhoto", await imageAsDataURL($imageField.files[0]));
  }

  // Handle case where user did not change username
  if (formData.get("username") === oldFormData.get("username")) {
    formData.delete("username");
  }

  // Handle case where user did not change email
  if (formData.get("email") === oldFormData.get("email")) {
    formData.delete("email");
  }

  // Create request body from formData
  const body = Object.fromEntries(formData.entries());

  // Show progress bar
  $progressBar.classList.add("loading");

  try {
    // Send form data to the server for update profile basic info.
    const response = await axios.put(`/settings/basic_info`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle case where response is successful
    if (response.status === 200) {
      $basicInfoSubmit.removeAttribute("disabled");
      $progressBar.classList.add("loading-end");
      Snackbar({
        message: "Your profile has been updated.",
      });
      window.location.reload();
    }
  } catch (error) {
    // Handle error response
    if (error.response && error.response.status === 400) {
      // Enable submit button and show error message
      $basicInfoSubmit.removeAttribute("disabled");
      $progressBar.classList.add("loading-end");
      Snackbar({
        type: "error",
        message: error.response.data.message || "An error occurred.",
      });
    } else {
      // Handle other types of errors (e.g., network issues)
      Snackbar({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  }
};

$basicInfoForm?.addEventListener("submit", updateBasicInfo);

/**
 * Password update functionality
 */

const $passwordForm = document.querySelector("[data-password-info-form]");
const $passwordSubmit = document.querySelector("[data-password-info-submit]");

const updatePassword = async (event) => {
  // Preventing default form submission behavior.
  event.preventDefault();

  // Disable publish button to prevent multiple submissions.
  $passwordSubmit.setAttribute("disabled", "");

  // Create FormData object to capture password form data.
  const formData = new FormData($passwordForm);

  // Handle case where password and confirm password doesn't match.
  if (formData.get("password") !== formData.get("confirm_password")) {
    // Enable submit button and show error message
    $passwordSubmit.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message:
        "Please ensure your password and confirm password fields contain the same value.",
    });
    return;
  }

  // Create request body from formData.
  const body = Object.fromEntries(formData.entries());

  // Show progress bar.
  $progressBar.classList.add("loading");

  try {
    // Send form data to the server for update profile basic info.
    const response = await axios.put(`/settings/password`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle case where response is successful
    if (response.status === 200) {
      $passwordSubmit.removeAttribute("disabled");
      $progressBar.classList.add("loading-end");
      Snackbar({
        message: "Your password has been updated.",
      });
      return;
    }
  } catch (error) {
    // Handle error response
    if (error.response && error.response.status === 401) {
      // Enable submit button and show error message
      $passwordSubmit.removeAttribute("disabled");
      $progressBar.classList.add("loading-end");
      Snackbar({
        type: "error",
        message: error.response.data.message || "An error occurred.",
      });
    } else {
      // Handle other types of errors (e.g., network issues)
      Snackbar({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  }
};

$passwordForm?.addEventListener("submit", updatePassword);

/**
 * Account delete functionality
 */
const $accountDeleteBtn = document.querySelector("[data-account-delete]");

const deleteAccount = async (event) => {
  // Show a confirmation dialog for account delete
  const confirmDelete = confirm(
    "Are you sure you want to delete your account?"
  );

  // Handle case where user deny to delete account
  if (!confirmDelete) return;

  // Disable account delete button to prevent multiple requests.
  $accountDeleteBtn.setAttribute("disabled", "");

  // Show progress bar
  $progressBar.classList.add("loading");

  try {
    // Send account delete request in server
    const response = await axios.delete(`/settings/account`);

    // Handle case where response is successful
    if (response.status === 200) {
      $accountDeleteBtn.removeAttribute("disabled");
      $progressBar.classList.add("loading-end");
      // Redirect user to home page
      window.location = `${window.location.origin}/`;
    }
  } catch (error) {
    $accountDeleteBtn.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message:
        error.response?.data?.message ||
        "Failed to delete account. Please try again later.",
    });
  }
};

$accountDeleteBtn?.addEventListener("click", deleteAccount);
