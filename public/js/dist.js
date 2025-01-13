"use strict";
// Function to apply the saved theme
const $6a473be143a0c410$var$applySavedTheme = (L_icon, D_icon)=>{
    const savedTheme = localStorage.getItem("theme");
    const isDarken = savedTheme === "dark-mode";
    if (savedTheme) {
        document.body.classList.remove("light-mode", "dark-mode"); // Clear any existing theme classes
        document.body.classList.add(savedTheme);
        if (L_icon && D_icon) {
            L_icon.style.opacity = isDarken ? 1 : 0;
            D_icon.style.opacity = isDarken ? 0 : 1;
        }
    } else // Default to light mode if no theme is saved
    document.body.classList.add("light_mode");
};
var $6a473be143a0c410$export$2e2bcd8739ae039 = $6a473be143a0c410$var$applySavedTheme;


"use strict";
const $d6c5a79c796896a7$var$dialog = (props)=>{
    const dialog = document.createElement("div");
    dialog.classList.add("dialog-root", "active");
    dialog.innerHTML = `
              <div class="dialog-container">
        <div class="dialog-header">
          <h2 class="headline-small dialog-title text-on-surface">
            ${props.title}
          </h2>

          <button class="icon-btn" data-dialog-toggler>
            <span class="material-symbols-rounded" aria-hidden="true">
              close
            </span>
            <div class="state-layer"></div>
          </button>
        </div>
        <div class="dialog-content">
          <p class="body-medium dialog-content-text text-on-surface-variant">
          ${props.content}
          </p>
        </div>
        <div class="dialog-actions">
          <a href="/login" class="btn btn-text" data-dialog-toggler>
            <p class="label-large">Login</p>

            <div class="state-layer"></div>
          </a>
          <a href="/register" class="btn btn-fill" data-dialog-toggler>
            <p class="label-large">Create account</p>

            <div class="state-layer"></div>
          </a>
        </div>
      </div>

      <div class="dialog-backdrop" data-dialog-toggler></div>
    `;
    const $dialogTogglerAll = dialog.querySelectorAll("[data-dialog-toggler]");
    $dialogTogglerAll.forEach((toggler)=>{
        toggler?.addEventListener("click", ()=>{
            dialog.remove();
        });
    });
    return dialog;
};
var $d6c5a79c796896a7$export$2e2bcd8739ae039 = $d6c5a79c796896a7$var$dialog;


"use strict";
// Select the reading list button element and reading list number
const $415f7c15956b9952$var$$readingListBtn = document.querySelector("[data-reading-list-btn]");
const $415f7c15956b9952$var$$readingListNumber = document.querySelector("[data-reading-list-number]");
const $415f7c15956b9952$var$currentPath = window.location.pathname; // e.g., '/blogs/677815016911ab5c7f693efb'
const $415f7c15956b9952$var$blogId = $415f7c15956b9952$var$currentPath.split("/")[2];
const $415f7c15956b9952$var$addToReadingList = async ()=>{
    try {
        // Send a put request to the readingList endpoint
        const response = await fetch(`${$415f7c15956b9952$var$blogId}/readingList`, {
            method: "PUT"
        });
        // Handle case where response is successful
        if (response.ok) {
            // Active readingList button and increase the readingList number
            $415f7c15956b9952$var$$readingListBtn.classList.add("active");
            $415f7c15956b9952$var$$readingListBtn.classList.remove("reaction-anim-remove");
            $415f7c15956b9952$var$$readingListNumber.textContent = Number($415f7c15956b9952$var$$readingListNumber.textContent) + 1;
        }
        // Handle case where response is 401 (Unauthorized)
        if (response.status === 401) {
            const $dialog = (0, $d6c5a79c796896a7$export$2e2bcd8739ae039)({
                title: "Login to continue",
                content: `
              We're a place where coders share, stay up-to-date and grow their careers.
            `
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
 */ const $415f7c15956b9952$var$removeFromReadingList = async ()=>{
    try {
        // Send a DELETE request to the readingList endpoint
        const response = await fetch(`${$415f7c15956b9952$var$blogId}/readingList`, {
            method: "DELETE"
        });
        // Handle case where response is successful
        if (response.ok) {
            // Inactive readingList button and decrease the readingList number
            $415f7c15956b9952$var$$readingListBtn.classList.remove("active");
            $415f7c15956b9952$var$$readingListNumber.textContent = Number($415f7c15956b9952$var$$readingListNumber.textContent) - 1;
        }
    } catch (error) {
        // Log error
        console.error("Error removing from reading list: ", error.message);
    }
};
// Add event listener for click event
if ($415f7c15956b9952$var$$readingListBtn) $415f7c15956b9952$var$$readingListBtn.addEventListener("click", async function() {
    $415f7c15956b9952$var$$readingListBtn.setAttribute("disabled", "");
    if (!$415f7c15956b9952$var$$readingListBtn.classList.contains("active")) await $415f7c15956b9952$var$addToReadingList();
    else await $415f7c15956b9952$var$removeFromReadingList();
    $415f7c15956b9952$var$$readingListBtn.removeAttribute("disabled");
});



"use strict";
// select the reaction button element and reaction number
const $8701965ba314c829$var$$reactionBtn = document.querySelector("[data-reaction-btn]");
const $8701965ba314c829$var$$reactionNumber = document.querySelector("[data-reaction-number]");
const $8701965ba314c829$var$currentPath = window.location.pathname; // e.g., '/blogs/677815016911ab5c7f693efb'
const $8701965ba314c829$var$blogId = $8701965ba314c829$var$currentPath.split("/")[2];
/**
 * Add a reaction to the current blog.
 * This function sends a PUT request to the reactions endpoint to add a reaction.
 * If the response is successful (status code 200), it activates the reaction button
 * and increases the reaction count displayed on the page.
 * If the response status is 401 (Unauthorized), it prompts the user to log in.
 *
 * @function addReaction
 * @throws {Error} If there is an error during the process, it will be logged.
 */ const $8701965ba314c829$var$addReaction = async ()=>{
    try {
        // Send a put request to the reaction endpoint
        const response = await fetch(`${$8701965ba314c829$var$blogId}/reactions`, {
            method: "PUT"
        });
        // Handle case where response is successful
        if (response.ok) {
            // Active reaction button and increase the reaction number
            $8701965ba314c829$var$$reactionBtn.classList.add("active", "reaction-anim-add");
            $8701965ba314c829$var$$reactionBtn.classList.remove("reaction-anim-remove");
            $8701965ba314c829$var$$reactionNumber.textContent = Number($8701965ba314c829$var$$reactionNumber.textContent) + 1;
        }
        // Handle case where response is 401 (Unauthorized)
        if (response.status === 401) {
            const $dialog = (0, $d6c5a79c796896a7$export$2e2bcd8739ae039)({
                title: "Login to continue",
                content: `
            We're a place where coders share, stay up-to-date and grow their careers.
          `
            });
            document.body.appendChild($dialog);
        }
    } catch (error) {
        // Log any errors
        console.error("Error adding reaction: ", error.message);
    }
};
/**
 * Removes a reaction from the current blog.
 * Sends a DELETE request to the reactions endpoint.
 * Updates UI accordingly based on server response.
 *
 * @function removeReaction
 * @throws {Error} If an error occurs during the process.
 */ const $8701965ba314c829$var$removeReaction = async ()=>{
    try {
        // Send a DELETE request to the reactions endpoint
        const response = await fetch(`${$8701965ba314c829$var$blogId}/reactions`, {
            method: "DELETE"
        });
        // Handle case where response is successful
        if (response.ok) {
            // Inactive reaction button and decrease the reaction number
            $8701965ba314c829$var$$reactionBtn.classList.add("reaction-anim-remove");
            $8701965ba314c829$var$$reactionBtn.classList.remove("active", "reaction-anim-add");
            $8701965ba314c829$var$$reactionNumber.textContent = Number($8701965ba314c829$var$$reactionNumber.textContent) - 1;
        }
    } catch (error) {
        // Log error
        console.error("Error removing reactions: ", error.message);
    }
};
// Add event listener for click event
$8701965ba314c829$var$$reactionBtn?.addEventListener("click", async function() {
    $8701965ba314c829$var$$reactionBtn.setAttribute("disabled", "");
    if (!$8701965ba314c829$var$$reactionBtn.classList.contains("active")) await $8701965ba314c829$var$addReaction();
    else await $8701965ba314c829$var$removeReaction();
    $8701965ba314c829$var$$reactionBtn.removeAttribute("disabled");
});


"use strict";
/**
 * Increments the visit count for the current blog post and updates
 the local storage.
 * @async
 * @function countVisit
 * @throws {Error} Throws an error if there's an issue with the fetch operation.   
 */ const $f480238ca0d164db$var$countVisit = async ()=>{
    try {
        if (!document.querySelector("[data-reaction-btn]")) return;
        const currentPath = window.location.pathname; // e.g., '/blogs/67781059d5bfbf79608410a2/edit'
        const blogId = currentPath.split("/")[2]; // Extract '67781059d5bfbf79608410a2'
        const blogsWord = currentPath.split("/")[1];
        if (!blogId || blogsWord !== "blogs") return;
        // Increment the visit count
        const response = await fetch(`${blogId}/visit`, {
            method: "PUT"
        });
        // If the response if successful, update the visitedBlogs array and local storage
        if (response.ok) {
            $f480238ca0d164db$var$visitedBlogs?.push(window.location.pathname);
            localStorage.setItem("visitedBlogs", JSON.stringify($f480238ca0d164db$var$visitedBlogs));
        }
    } catch (error) {
        // Log error
        console.error("Error counting visit: ", error.message);
        throw error;
    }
};
// Get visitedBlogs from localStorage
let $f480238ca0d164db$var$visitedBlogs = localStorage.getItem("visitedBlogs");
// Initial visitedBlogs if not found
if (!$f480238ca0d164db$var$visitedBlogs) localStorage.setItem("visitedBlogs", JSON.stringify([]));
// Parse visited blog from json to array
$f480238ca0d164db$var$visitedBlogs = JSON.parse(localStorage.getItem("visitedBlogs"));
// If user visited first time then calls the countVisit function
if (!$f480238ca0d164db$var$visitedBlogs.includes(window.location.pathname)) $f480238ca0d164db$var$countVisit();


"use strict";
const $de697d687a6b1937$var$$snackbarWrapper = document.querySelector("[data-snackbar-wrapper");
let $de697d687a6b1937$var$lastTimeout = null;
/**
 * Creates a snackbar component and displays it with specified props.
 * @param {Object} props - The properties for snackbar.
 * @param {string} props.message - The message to be displayed in the snackbar.
 * @param {string} [props.type] -the type of snackbar (optional). value: 'error' | null
 */ const $de697d687a6b1937$var$Snackbar = (props)=>{
    // Create snackbar element
    const $snackbar = document.createElement("div");
    $snackbar.classList.add("snackbar");
    props.type && $snackbar.classList.add(props.type);
    $snackbar.innerHTML = `
        <p class="body-medium snackbar-text">
            ${props.message}
        </p>
    `;
    // Clear previous snackbar and append new one
    $de697d687a6b1937$var$$snackbarWrapper.innerHTML = "";
    $de697d687a6b1937$var$$snackbarWrapper.append($snackbar);
    // Remove snackbar after 10 seconds
    clearTimeout($de697d687a6b1937$var$lastTimeout);
    $de697d687a6b1937$var$lastTimeout = setTimeout(()=>{
        $de697d687a6b1937$var$$snackbarWrapper.removeChild($snackbar);
    }, 10000);
};
var $de697d687a6b1937$export$2e2bcd8739ae039 = $de697d687a6b1937$var$Snackbar;


"use strict";
/**
 * Generate an image preview from the selected file and display it in a specified container.
 * @param {HTMLInputElement} $imageField - The input field that contains the selected image file.
 * @param {HTMLElement} $imagePreview - The container element where the image preview will be displayed.
 * @returns {Promise<string>} - A promise that resolves with the object URL of the generated image.
 */ const $10354ac91047b38f$var$imagePreview = async function($imageField, $imagePreview) {
    const imageObjectUrl = URL.createObjectURL($imageField.files[0]);
    const $image = document.createElement("img");
    $image.classList.add("img-cover");
    $image.src = imageObjectUrl;
    $imagePreview.append($image);
    $imagePreview.classList.add("show");
    return imageObjectUrl;
};
var $10354ac91047b38f$export$2e2bcd8739ae039 = $10354ac91047b38f$var$imagePreview;


"use strict";
/**
 * Converts a given image blob into a data URL.
 *
 * @param {Blob} imageBlob - The Blob object representing the image.
 * @returns {Promise<string>} - A promise that resolves with the data URL representing the image, or rejects with an error if conversion fails
 */ const $54d0dd2b14f97da9$var$imageAsDataURL = async function(imageBlob) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageBlob);
    return new Promise((resolve, reject)=>{
        fileReader.addEventListener("load", ()=>{
            resolve(fileReader.result);
        });
        fileReader.addEventListener("error", ()=>{
            reject(fileReader.error);
        });
    });
};
var $54d0dd2b14f97da9$export$2e2bcd8739ae039 = $54d0dd2b14f97da9$var$imageAsDataURL;


"use strict";
const $5076055a0a259aab$var$blogBanner = {
    maxByteSize: 5120000,
    profilePhoto: {
        maxByteSize: 1024000
    }
};
var $5076055a0a259aab$export$2e2bcd8739ae039 = $5076055a0a259aab$var$blogBanner;


"use strict";
// Selectors for image field, image preview, and clear preview button
const $cf03fd781986fabf$var$$imageField = document.querySelector("[data-image-field]");
const $cf03fd781986fabf$var$$imagePreview = document.querySelector("[data-image-preview]");
const $cf03fd781986fabf$var$$imagePreviewClear = document.querySelector("[data-image-preview-clear]");
// Event listener for image field change to trigger image preview
$cf03fd781986fabf$var$$imageField?.addEventListener("change", ()=>{
    (0, $10354ac91047b38f$export$2e2bcd8739ae039)($cf03fd781986fabf$var$$imageField, $cf03fd781986fabf$var$$imagePreview);
});
/**
 * Clears the image preview by removing the 'show' class from the preview container
 * @function clearImagePreview
 */ const $cf03fd781986fabf$var$clearImagePreview = function() {
    $cf03fd781986fabf$var$$imagePreview.classList.remove("show");
    $cf03fd781986fabf$var$$imagePreview.innerHTML = "";
};
$cf03fd781986fabf$var$$imagePreviewClear?.addEventListener("click", $cf03fd781986fabf$var$clearImagePreview);
/**
 * Handle blog publish
 */ const $cf03fd781986fabf$var$$form = document.querySelector("[data-form]");
const $cf03fd781986fabf$var$$submitBtn = document.querySelector("[data-submit-btn]");
const $cf03fd781986fabf$var$$progressBar = document.querySelector("[data-progress-bar]");
// Function to toggle submit button state
function $cf03fd781986fabf$var$toggleSubmitButton() {
    if ($cf03fd781986fabf$var$$imageField.files.length > 0) $cf03fd781986fabf$var$$submitBtn?.removeAttribute("disabled");
    else $cf03fd781986fabf$var$$submitBtn?.setAttribute("disabled", "disabled");
}
// Event listener for image field change to trigger image preview
$cf03fd781986fabf$var$$imageField?.addEventListener("change", ()=>{
    $cf03fd781986fabf$var$toggleSubmitButton();
});
const $cf03fd781986fabf$var$handlePublishBlog = async function(event) {
    // Preventing default form submission behavior.
    event.preventDefault();
    // Disabling publish button to prevent multiple submissions.
    $cf03fd781986fabf$var$$submitBtn?.setAttribute("disabled", "");
    // Creating FromData object to capture form data.
    const formData = new FormData($cf03fd781986fabf$var$$form);
    // Ensure there's not conflics between this form and register form
    if (formData.get("confirm_password") || formData.get("password")) return;
    // Handle case where user not selected any image for banner when creating blog.
    if (!formData.get("banner")?.size && !$cf03fd781986fabf$var$$imagePreview?.hasChildNodes()) {
        // Enable submit button and show error message
        $cf03fd781986fabf$var$$submitBtn?.removeAttribute("disabled");
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: "You Didn't select any image for blog banner"
        });
        return;
    }
    // Handle case where selected image size larger than 5MB.
    if (formData.get("banner")?.size > (0, $5076055a0a259aab$export$2e2bcd8739ae039).maxByteSize) {
        // Enable submit button and show error message
        $cf03fd781986fabf$var$$submitBtn.removeAttribute("disabled");
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: "Image should be less than 5MB."
        });
        return;
    }
    // Handle case when user don't update the blog banner.
    if (!formData.get("banner")?.size && $cf03fd781986fabf$var$$imagePreview.hasChildNodes()) formData.delete("banner");
    // Handle case when user update the blog banner.
    if (formData.get("banner")) formData.set("banner", await (0, $54d0dd2b14f97da9$export$2e2bcd8739ae039)(formData.get("banner")));
    // Create request body form formData.
    const body = Object.fromEntries(formData.entries());
    // Show progress bar
    $cf03fd781986fabf$var$$progressBar.classList.add("loading");
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
            "Content-Type": "application/json"
        }
    });
    // Handle case where response is success.
    if (response.status >= 200 && response.status < 300) {
        $cf03fd781986fabf$var$$submitBtn.removeAttribute("disabled");
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            message: "Your blog has been updated."
        });
        $cf03fd781986fabf$var$$progressBar.classList.add("loading-end");
        // Redirect to the updated blog's page
        window.location = window.location.href.replace("/edit", "");
        return;
    }
    // Handle case where response is 400 (Bad Request)
    if (response.status === 400) {
        $cf03fd781986fabf$var$$progressBar.classList.add("loading-end");
        $cf03fd781986fabf$var$$submitBtn.removeAttribute("disabled");
        const { message: message } = await response.json();
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: message
        });
    }
};
$cf03fd781986fabf$var$$form?.addEventListener("submit", $cf03fd781986fabf$var$handlePublishBlog);






"use strict";
// Selectors for image field, image preview, and clear preview button
const $66bded4a15db91b9$var$$imageField = document.querySelector("[data-image-field]");
const $66bded4a15db91b9$var$$imagePreview = document.querySelector("[data-image-preview]");
const $66bded4a15db91b9$var$$imagePreviewClear = document.querySelector("[data-image-preview-clear]");
const $66bded4a15db91b9$var$$progressBar = document.querySelector("[data-progress-bar]");
// Event listener for image field change to trigger image preview
if ($66bded4a15db91b9$var$$imageField) $66bded4a15db91b9$var$$imageField.addEventListener("change", ()=>{
    (0, $10354ac91047b38f$export$2e2bcd8739ae039)($66bded4a15db91b9$var$$imageField, $66bded4a15db91b9$var$$imagePreview);
});
/**
 * Clears the image preview by removing the 'show' class from the preview container
 * @function clearImagePreview
 */ const $66bded4a15db91b9$var$clearImagePreview = function() {
    $66bded4a15db91b9$var$$imagePreview.classList.remove("show");
    $66bded4a15db91b9$var$$imagePreview.innerHTML = "";
};
$66bded4a15db91b9$var$$imagePreviewClear?.addEventListener("click", $66bded4a15db91b9$var$clearImagePreview);
/**
 * Handle blog publish
 */ const $66bded4a15db91b9$var$$form = document.querySelector("[data-form]");
const $66bded4a15db91b9$var$$publishBtn = document.querySelector("[data-publish-btn]");
const $66bded4a15db91b9$var$handlePublishBlog = async function(event) {
    // Preventing default form submission behavior.
    event.preventDefault();
    // Disabling publish button to prevent multiple submissions.
    $66bded4a15db91b9$var$$publishBtn?.setAttribute("disabled", "");
    // Creating FormData object to capture form data.
    const formData = new FormData($66bded4a15db91b9$var$$form);
    // Ensure there's not conflics between this form and register form
    if (formData.get("confirm_password") || formData.get("password")) return;
    // Handle case where user not selected any image for banner when creating blog.
    if (!formData.get("banner")?.size) {
        // Enable publish button and show error message
        $66bded4a15db91b9$var$$publishBtn?.removeAttribute("disabled");
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: "You Didn't select any image for blog banner"
        });
        return;
    }
    // Handle case where selected image size larger than 5MB.
    if (formData.get("banner").size > (0, $5076055a0a259aab$export$2e2bcd8739ae039).maxByteSize) {
        // Enable publish button and show error message
        $66bded4a15db91b9$var$$publishBtn?.removeAttribute("disabled");
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: "Image should be less than 5MB."
        });
        return;
    }
    // Overwrite banner value (which is type of 'File') to base64.
    formData.set("banner", await (0, $54d0dd2b14f97da9$export$2e2bcd8739ae039)(formData.get("banner")));
    // Create request body from formdata
    const body = Object.fromEntries(formData.entries());
    // Show progress bar
    $66bded4a15db91b9$var$$progressBar.classList.add("loading");
    try {
        // Sending form data to the server for create blog.
        const response = await axios.post(`/createblog`, JSON.stringify(body), {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 200) {
            // Redirect or show success message
            (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
                message: "Your blog has been created successfully!"
            });
            // Re-enable the publish button
            $66bded4a15db91b9$var$$publishBtn.removeAttribute("disabled");
            $66bded4a15db91b9$var$$progressBar.classList.add("loading-end");
            return window.location = response.request.responseURL;
        }
    } catch (error) {
        // Handle error if the request fails
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: error.response?.data?.message || "Failed to create blog."
        });
        $66bded4a15db91b9$var$$progressBar.classList.add("loading-end");
    }
};
if ($66bded4a15db91b9$var$$form) $66bded4a15db91b9$var$$form.addEventListener("submit", $66bded4a15db91b9$var$handlePublishBlog);



"use strict";
const $cefb83714ddd47f6$var$$blogDeleteBtnAll = document.querySelectorAll("[data-blog-delete-btn]");
/**
 * DELETE request to the server to delete a specified blog.
 * @async
 * @param {string} blogId - The unique identifier of the blog to be deleted.
 * @returns {Promise<void>} - Promise resolving when the deletion operation is complete.
 */ const $cefb83714ddd47f6$var$handleBlogDelete = async (blogId)=>{
    try {
        const confirmDelete = confirm("Are you sure you want to delete this blog?");
        // Handle case where user cancels the delete confirmation
        if (!confirmDelete) return;
        // Sending DELETE request using axios
        const response = await axios.delete(`/blogs/${blogId}/delete`);
        // Handle case where response is successful
        if (response.status === 200) {
            (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
                message: "Blog has been deleted."
            });
            window.location.reload(); // Reload the page to reflect the change
        }
    } catch (error) {
        // Handle error
        console.error("Error deleting the blog: ", error.message);
    }
};
// Attaches click event listeners to all delete buttons to trigger
// the handleBlogDelete function.
$cefb83714ddd47f6$var$$blogDeleteBtnAll?.forEach(($deleteBtn)=>{
    const blogId = $deleteBtn.dataset.blogDeleteBtn;
    $deleteBtn.addEventListener("click", $cefb83714ddd47f6$var$handleBlogDelete.bind(null, blogId));
});




"use strict";
const $70af9284e599e604$var$$form = document.querySelector("[data-form]");
const $70af9284e599e604$var$$submitBtn = document.querySelector("[data-submit-btn]");
// Handling sign-up form submission
$70af9284e599e604$var$$form?.addEventListener("submit", async (e)=>{
    // Preventing default form behavior.
    e.preventDefault();
    // Disabling submit button to prevent multiple submissions.
    $70af9284e599e604$var$$submitBtn?.setAttribute("disabled", "");
    // Creating FormData object to capture form data.
    const formData = new FormData($70af9284e599e604$var$$form);
    if (formData.get("confirm_password") || !formData.get("email")) return;
    try {
        // Send account create request to server
        const response = await axios.post(`/login`, new URLSearchParams(formData));
        // Handle case where response status success
        if (response.status === 200) // Redirect user to login page
        window.location = response.data.redirectUrl || response.request.responseURL;
    } catch (error) {
        // Check if there's a response from the server
        if (error.response && error.response.data) // Display custom error message from the server
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            message: error.response.data.message,
            type: "error"
        });
        else console.error("Error submitting form:", error.message);
    } finally{
        // Re-enable the submit button in case of any error
        $70af9284e599e604$var$$submitBtn.removeAttribute("disabled");
    }
});
// Apply the saved theme when the page loads
(0, $6a473be143a0c410$export$2e2bcd8739ae039)(null, null);




"use strict";
const $ac7ca8669a3fb450$var$$form = document.querySelector("[data-form]");
const $ac7ca8669a3fb450$var$$submitBtn = document.querySelector("[data-submit-btn]");
// Handling sign-up form submission
$ac7ca8669a3fb450$var$$form?.addEventListener("submit", async (e)=>{
    // Preventing default form behavior.
    e.preventDefault();
    // Disabling submit button to prevent multiple submissions.
    $ac7ca8669a3fb450$var$$submitBtn?.setAttribute("disabled", "");
    // Creating FormData object to capture form data.
    const formData = new FormData($ac7ca8669a3fb450$var$$form);
    if (!formData.get("confirm_password")) return;
    // Handling case where password and confirm password fields doesn't match
    if (formData.get("password") !== formData.get("confirm_password")) {
        $ac7ca8669a3fb450$var$$submitBtn.removeAttribute("disabled");
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            message: "Please ensure your password and confirm password fields contain the same value.",
            type: "error"
        });
        return;
    }
    try {
        // Send account create request to server
        const response = await axios.post(`/register`, new URLSearchParams(formData));
        // Handle case where response status success
        if (response.status === 200) // Redirect user to login page
        window.location = response.data.redirectUrl || response.request.responseURL;
    } catch (error) {
        // Check if there's a response from the server
        if (error.response && error.response.data) // Display custom error message from the server
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            message: error.response.data.message,
            type: "error"
        });
        else console.error("Error submitting form:", error.message);
    } finally{
        // Re-enable the submit button in case of any error
        $ac7ca8669a3fb450$var$$submitBtn.removeAttribute("disabled");
    }
});
// Apply the saved theme when the page loads
(0, $6a473be143a0c410$export$2e2bcd8739ae039)(null, null);






"use strict";
// Selectors for image field, image preview, and clear preview button
const $3b60e6bf3e5e84f5$var$$imageField = document.querySelector("[data-image-field]");
const $3b60e6bf3e5e84f5$var$$imagePreview = document.querySelector("[data-image-preview]");
const $3b60e6bf3e5e84f5$var$$imagePreviewClear = document.querySelector("[data-image-preview-clear]");
// Event listener for image field change to trigger image preview
$3b60e6bf3e5e84f5$var$$imageField?.addEventListener("change", ()=>{
    (0, $10354ac91047b38f$export$2e2bcd8739ae039)($3b60e6bf3e5e84f5$var$$imageField, $3b60e6bf3e5e84f5$var$$imagePreview);
});
/**
 * Clear the image preview by removing the 'show' class from the 
 preview container.
 */ const $3b60e6bf3e5e84f5$var$clearImagePreview = function() {
    $3b60e6bf3e5e84f5$var$$imagePreview.classList.remove("show");
    $3b60e6bf3e5e84f5$var$$imagePreview.innerHTML = "";
    $3b60e6bf3e5e84f5$var$$imageField.value = "";
};
$3b60e6bf3e5e84f5$var$$imagePreviewClear?.addEventListener("click", $3b60e6bf3e5e84f5$var$clearImagePreview);
/**
 * Basic info update functionality
 */ const $3b60e6bf3e5e84f5$var$$basicInfoForm = document.querySelector("[data-basic-info-form]") || null;
const $3b60e6bf3e5e84f5$var$$basicInfoSubmit = document.querySelector("[data-basic-info-submit]");
const $3b60e6bf3e5e84f5$var$oldFormData = $3b60e6bf3e5e84f5$var$$basicInfoForm ? new FormData($3b60e6bf3e5e84f5$var$$basicInfoForm) : null;
const $3b60e6bf3e5e84f5$var$$progressBar = document.querySelector("[data-progress-bar]");
/**
 * Update basic information of the user profile.
 * @param {Event} event - The event object representing the form
 submission.
 */ const $3b60e6bf3e5e84f5$var$updateBasicInfo = async (event)=>{
    // Preventing default form submission behavior.
    event.preventDefault();
    // Disable publish button to prevent multiple submissions.
    $3b60e6bf3e5e84f5$var$$basicInfoSubmit.setAttribute("disabled", "");
    // Create FormData object to capture basic info form data.
    const formData = new FormData($3b60e6bf3e5e84f5$var$$basicInfoForm);
    // Handle case where selected image size is larger than 1MB.
    if (formData.get("profilePhoto").size > (0, $5076055a0a259aab$export$2e2bcd8739ae039).profilePhoto.maxByteSize) {
        // Enable submit button and show error message
        $3b60e6bf3e5e84f5$var$$basicInfoSubmit.removeAttribute("disabled");
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: "Your profile photo should be less than 1MB."
        });
        return;
    }
    // Handle case where user not selected any image for profilePhoto
    if (!formData.get("profilePhoto").size) formData.delete("profilePhoto");
    // Handle case where profilePhoto field exists
    if (formData.get("profilePhoto")) // Overwrite profilePhoto value (which is type of 'File') to
    // base64
    formData.set("profilePhoto", await (0, $54d0dd2b14f97da9$export$2e2bcd8739ae039)($3b60e6bf3e5e84f5$var$$imageField.files[0]));
    // Handle case where user did not change username
    if (formData.get("username") === $3b60e6bf3e5e84f5$var$oldFormData.get("username")) formData.delete("username");
    // Handle case where user did not change email
    if (formData.get("email") === $3b60e6bf3e5e84f5$var$oldFormData.get("email")) formData.delete("email");
    // Create request body from formData
    const body = Object.fromEntries(formData.entries());
    // Show progress bar
    $3b60e6bf3e5e84f5$var$$progressBar.classList.add("loading");
    try {
        // Send form data to the server for update profile basic info.
        const response = await axios.put(`/settings/basic_info`, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        // Handle case where response is successful
        if (response.status === 200) {
            $3b60e6bf3e5e84f5$var$$basicInfoSubmit.removeAttribute("disabled");
            $3b60e6bf3e5e84f5$var$$progressBar.classList.add("loading-end");
            (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
                message: "Your profile has been updated."
            });
            window.location.reload();
        }
    } catch (error) {
        // Handle error response
        if (error.response && error.response.status === 400) {
            // Enable submit button and show error message
            $3b60e6bf3e5e84f5$var$$basicInfoSubmit.removeAttribute("disabled");
            $3b60e6bf3e5e84f5$var$$progressBar.classList.add("loading-end");
            (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
                type: "error",
                message: error.response.data.message || "An error occurred."
            });
        } else // Handle other types of errors (e.g., network issues)
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: "Something went wrong. Please try again later."
        });
    }
};
$3b60e6bf3e5e84f5$var$$basicInfoForm?.addEventListener("submit", $3b60e6bf3e5e84f5$var$updateBasicInfo);
/**
 * Password update functionality
 */ const $3b60e6bf3e5e84f5$var$$passwordForm = document.querySelector("[data-password-info-form]");
const $3b60e6bf3e5e84f5$var$$passwordSubmit = document.querySelector("[data-password-info-submit]");
const $3b60e6bf3e5e84f5$var$updatePassword = async (event)=>{
    // Preventing default form submission behavior.
    event.preventDefault();
    // Disable publish button to prevent multiple submissions.
    $3b60e6bf3e5e84f5$var$$passwordSubmit.setAttribute("disabled", "");
    // Create FormData object to capture password form data.
    const formData = new FormData($3b60e6bf3e5e84f5$var$$passwordForm);
    // Handle case where password and confirm password doesn't match.
    if (formData.get("password") !== formData.get("confirm_password")) {
        // Enable submit button and show error message
        $3b60e6bf3e5e84f5$var$$passwordSubmit.removeAttribute("disabled");
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: "Please ensure your password and confirm password fields contain the same value."
        });
        return;
    }
    // Create request body from formData.
    const body = Object.fromEntries(formData.entries());
    // Show progress bar.
    $3b60e6bf3e5e84f5$var$$progressBar.classList.add("loading");
    try {
        // Send form data to the server for update profile basic info.
        const response = await axios.put(`/settings/password`, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        // Handle case where response is successful
        if (response.status === 200) {
            $3b60e6bf3e5e84f5$var$$passwordSubmit.removeAttribute("disabled");
            $3b60e6bf3e5e84f5$var$$progressBar.classList.add("loading-end");
            (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
                message: "Your password has been updated."
            });
            return;
        }
    } catch (error) {
        // Handle error response
        if (error.response && error.response.status === 401) {
            // Enable submit button and show error message
            $3b60e6bf3e5e84f5$var$$passwordSubmit.removeAttribute("disabled");
            $3b60e6bf3e5e84f5$var$$progressBar.classList.add("loading-end");
            (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
                type: "error",
                message: error.response.data.message || "An error occurred."
            });
        } else // Handle other types of errors (e.g., network issues)
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: "Something went wrong. Please try again later."
        });
    }
};
$3b60e6bf3e5e84f5$var$$passwordForm?.addEventListener("submit", $3b60e6bf3e5e84f5$var$updatePassword);
/**
 * Account delete functionality
 */ const $3b60e6bf3e5e84f5$var$$accountDeleteBtn = document.querySelector("[data-account-delete]");
const $3b60e6bf3e5e84f5$var$deleteAccount = async (event)=>{
    // Show a confirmation dialog for account delete
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    // Handle case where user deny to delete account
    if (!confirmDelete) return;
    // Disable account delete button to prevent multiple requests.
    $3b60e6bf3e5e84f5$var$$accountDeleteBtn.setAttribute("disabled", "");
    // Show progress bar
    $3b60e6bf3e5e84f5$var$$progressBar.classList.add("loading");
    try {
        // Send account delete request in server
        const response = await axios.delete(`/settings/account`);
        // Handle case where response is successful
        if (response.status === 200) {
            $3b60e6bf3e5e84f5$var$$accountDeleteBtn.removeAttribute("disabled");
            $3b60e6bf3e5e84f5$var$$progressBar.classList.add("loading-end");
            // Redirect user to home page
            window.location = `${window.location.origin}/`;
        }
    } catch (error) {
        $3b60e6bf3e5e84f5$var$$accountDeleteBtn.removeAttribute("disabled");
        (0, $de697d687a6b1937$export$2e2bcd8739ae039)({
            type: "error",
            message: error.response?.data?.message || "Failed to delete account. Please try again later."
        });
    }
};
$3b60e6bf3e5e84f5$var$$accountDeleteBtn?.addEventListener("click", $3b60e6bf3e5e84f5$var$deleteAccount);


"use strict";
const $4997c3e5c76ee42c$var$$topAppBar = document.querySelector("[data-top-app-bar]");
let $4997c3e5c76ee42c$var$lastScrollPos = 0;
/**
 * Attaches event listener to the window scroll event, toggling classes on the top app bar based on scroll position.
 */ window.addEventListener("scroll", (event)=>{
    // Toggling the 'active' class on the $topAppBar element based on whether the vertical scroll position is greater than 50px
    $4997c3e5c76ee42c$var$$topAppBar?.classList[window.scrollY > 50 ? "add" : "remove"]("active");
    // Toggling the 'hide' class based on whether the current scroll position is greater than the last scroll position and scroll position is greater than 50px
    $4997c3e5c76ee42c$var$$topAppBar?.classList[window.scrollY > $4997c3e5c76ee42c$var$lastScrollPos && window.scrollY > 50 ? "add" : "remove"]("hide");
    // Updating the last recorded scroll position
    $4997c3e5c76ee42c$var$lastScrollPos = window.scrollY;
});
//////////////////////////////////////////////
//               Toggle menu                //
//////////////////////////////////////////////
const $4997c3e5c76ee42c$var$$menuWrappers = document.querySelectorAll("[data-menu-wrapper]");
if ($4997c3e5c76ee42c$var$$menuWrappers) $4997c3e5c76ee42c$var$$menuWrappers.forEach(function($menuWrapper) {
    const $menuToggler = $menuWrapper.querySelector("[data-menu-toggler]");
    const $menu = $menuWrapper.querySelector("[data-menu]");
    $menuToggler.addEventListener("click", (event)=>{
        event.stopPropagation();
        $menu.classList.toggle("active");
    });
    // Close the menu on pressing Escape
    document.addEventListener("keydown", (event)=>{
        if (event.key === "Escape") $menu.classList.remove("active");
    });
    // Close menu when clicking outside of it
    document.addEventListener("click", (event)=>{
        if (!$menuWrapper.contains(event.target)) $menu.classList.remove("active");
    });
});
//////////////////////////////////////////////////////
//  Backward btn functionality in blog create page  //
//////////////////////////////////////////////////////
const $4997c3e5c76ee42c$var$$backBtn = document.querySelector("[data-back-btn]");
const $4997c3e5c76ee42c$var$handleBackward = function() {
    window.history.back();
};
$4997c3e5c76ee42c$var$$backBtn?.addEventListener("click", $4997c3e5c76ee42c$var$handleBackward);
//////////////////////////////////////////////////////
//     Auto height textarea in blog create form     //
//////////////////////////////////////////////////////
const $4997c3e5c76ee42c$var$$autoHeightTextarea = document.querySelector("[data-textarea-auto-height]");
const $4997c3e5c76ee42c$var$textareaAutoHeight = function() {
    this.style.height = this.scrollHeight + "px";
    this.style.maxHeight = this.scrollHeight + "px";
};
$4997c3e5c76ee42c$var$$autoHeightTextarea?.addEventListener("input", $4997c3e5c76ee42c$var$textareaAutoHeight);
// Set initial textarea height
$4997c3e5c76ee42c$var$$autoHeightTextarea && $4997c3e5c76ee42c$var$textareaAutoHeight.call($4997c3e5c76ee42c$var$$autoHeightTextarea);
// Dark/light themes
const $4997c3e5c76ee42c$var$toggleThemeButton = document.getElementById("theme-toggle");
const $4997c3e5c76ee42c$var$lightIcon = document.querySelector(".lighten");
const $4997c3e5c76ee42c$var$darkIcon = document.querySelector(".darken");
// Apply the saved theme when the page loads
(0, $6a473be143a0c410$export$2e2bcd8739ae039)($4997c3e5c76ee42c$var$lightIcon, $4997c3e5c76ee42c$var$darkIcon);
// Function to toggle between themes and save the choice
const $4997c3e5c76ee42c$var$toggleTheme = ()=>{
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        $4997c3e5c76ee42c$var$lightIcon.style.opacity = 0;
        $4997c3e5c76ee42c$var$darkIcon.style.opacity = 1;
        localStorage.setItem("theme", "light-mode");
    } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
        $4997c3e5c76ee42c$var$lightIcon.style.opacity = 1;
        $4997c3e5c76ee42c$var$darkIcon.style.opacity = 0;
    }
};
// Add event listener to the toggle button
if ($4997c3e5c76ee42c$var$toggleThemeButton) $4997c3e5c76ee42c$var$toggleThemeButton.addEventListener("click", $4997c3e5c76ee42c$var$toggleTheme);


//# sourceMappingURL=dist.js.map
