"use strict";
import Snackbar from "./snackbar.js";
import applySavedTheme from "../js/utils/LocalStorage_theme.js";

const $form = document.querySelector("[data-form]");
const $submitBtn = document.querySelector("[data-submit-btn]");

// Handling sign-up form submission
$form?.addEventListener("submit", async (e) => {
  // Preventing default form behavior.
  e.preventDefault();
  // Disabling submit button to prevent multiple submissions.
  $submitBtn?.setAttribute("disabled", "");

  // Creating FormData object to capture form data.
  const formData = new FormData($form);

  if (!formData.get("confirm_password")) return;
  // Handling case where password and confirm password fields doesn't match
  if (formData.get("password") !== formData.get("confirm_password")) {
    $submitBtn.removeAttribute("disabled");
    Snackbar({
      message:
        "Please ensure your password and confirm password fields contain the same value.",
      type: "error",
    });
    return;
  }
  try {
    // Send account create request to server
    const response = await axios.post(
      `/register`,
      new URLSearchParams(formData)
    );

    // Handle case where response status success
    if (response.status === 200) {
      // Redirect user to login page
      window.location =
        response.data.redirectUrl || response.request.responseURL;
    }
  } catch (error) {
    // Check if there's a response from the server
    if (error.response && error.response.data) {
      // Display custom error message from the server
      Snackbar({
        message: error.response.data.message,
        type: "error",
      });
    } else {
      console.error("Error submitting form:", error.message);
    }
  } finally {
    // Re-enable the submit button in case of any error
    $submitBtn.removeAttribute("disabled");
  }
});

// Apply the saved theme when the page loads
applySavedTheme(null, null);
