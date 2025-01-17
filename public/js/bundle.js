"use strict";
// Function to apply the saved theme
const $1e5893fe2098371b$var$applySavedTheme = (L_icon, D_icon)=>{
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
var $1e5893fe2098371b$export$2e2bcd8739ae039 = $1e5893fe2098371b$var$applySavedTheme;


"use strict";
const $756b505a347e85b6$var$dialog = (props)=>{
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
var $756b505a347e85b6$export$2e2bcd8739ae039 = $756b505a347e85b6$var$dialog;


"use strict";
// Select the reading list button element and reading list number
const $e183c84204e63473$var$$readingListBtn = document.querySelector("[data-reading-list-btn]");
const $e183c84204e63473$var$$readingListNumber = document.querySelector("[data-reading-list-number]");
const $e183c84204e63473$var$currentPath = window.location.pathname; // e.g., '/blogs/677815016911ab5c7f693efb'
const $e183c84204e63473$var$blogId = $e183c84204e63473$var$currentPath.split("/")[2];
const $e183c84204e63473$var$addToReadingList = async ()=>{
    try {
        // Send a put request to the readingList endpoint
        const response = await fetch(`${$e183c84204e63473$var$blogId}/readingList`, {
            method: "PUT"
        });
        // Handle case where response is successful
        if (response.ok) {
            // Active readingList button and increase the readingList number
            $e183c84204e63473$var$$readingListBtn.classList.add("active");
            $e183c84204e63473$var$$readingListBtn.classList.remove("reaction-anim-remove");
            $e183c84204e63473$var$$readingListNumber.textContent = Number($e183c84204e63473$var$$readingListNumber.textContent) + 1;
        }
        // Handle case where response is 401 (Unauthorized)
        if (response.status === 401) {
            const $dialog = (0, $756b505a347e85b6$export$2e2bcd8739ae039)({
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
 */ const $e183c84204e63473$var$removeFromReadingList = async ()=>{
    try {
        // Send a DELETE request to the readingList endpoint
        const response = await fetch(`${$e183c84204e63473$var$blogId}/readingList`, {
            method: "DELETE"
        });
        // Handle case where response is successful
        if (response.ok) {
            // Inactive readingList button and decrease the readingList number
            $e183c84204e63473$var$$readingListBtn.classList.remove("active");
            $e183c84204e63473$var$$readingListNumber.textContent = Number($e183c84204e63473$var$$readingListNumber.textContent) - 1;
        }
    } catch (error) {
        // Log error
        console.error("Error removing from reading list: ", error.message);
    }
};
// Add event listener for click event
if ($e183c84204e63473$var$$readingListBtn) $e183c84204e63473$var$$readingListBtn.addEventListener("click", async function() {
    $e183c84204e63473$var$$readingListBtn.setAttribute("disabled", "");
    if (!$e183c84204e63473$var$$readingListBtn.classList.contains("active")) await $e183c84204e63473$var$addToReadingList();
    else await $e183c84204e63473$var$removeFromReadingList();
    $e183c84204e63473$var$$readingListBtn.removeAttribute("disabled");
});



"use strict";
// select the reaction button element and reaction number
const $755c816f6bb4b172$var$$reactionBtn = document.querySelector("[data-reaction-btn]");
const $755c816f6bb4b172$var$$reactionNumber = document.querySelector("[data-reaction-number]");
const $755c816f6bb4b172$var$currentPath = window.location.pathname; // e.g., '/blogs/677815016911ab5c7f693efb'
const $755c816f6bb4b172$var$blogId = $755c816f6bb4b172$var$currentPath.split("/")[2];
/**
 * Add a reaction to the current blog.
 * This function sends a PUT request to the reactions endpoint to add a reaction.
 * If the response is successful (status code 200), it activates the reaction button
 * and increases the reaction count displayed on the page.
 * If the response status is 401 (Unauthorized), it prompts the user to log in.
 *
 * @function addReaction
 * @throws {Error} If there is an error during the process, it will be logged.
 */ const $755c816f6bb4b172$var$addReaction = async ()=>{
    try {
        // Send a put request to the reaction endpoint
        const response = await fetch(`${$755c816f6bb4b172$var$blogId}/reactions`, {
            method: "PUT"
        });
        // Handle case where response is successful
        if (response.ok) {
            // Active reaction button and increase the reaction number
            $755c816f6bb4b172$var$$reactionBtn.classList.add("active", "reaction-anim-add");
            $755c816f6bb4b172$var$$reactionBtn.classList.remove("reaction-anim-remove");
            $755c816f6bb4b172$var$$reactionNumber.textContent = Number($755c816f6bb4b172$var$$reactionNumber.textContent) + 1;
        }
        // Handle case where response is 401 (Unauthorized)
        if (response.status === 401) {
            const $dialog = (0, $756b505a347e85b6$export$2e2bcd8739ae039)({
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
 */ const $755c816f6bb4b172$var$removeReaction = async ()=>{
    try {
        // Send a DELETE request to the reactions endpoint
        const response = await fetch(`${$755c816f6bb4b172$var$blogId}/reactions`, {
            method: "DELETE"
        });
        // Handle case where response is successful
        if (response.ok) {
            // Inactive reaction button and decrease the reaction number
            $755c816f6bb4b172$var$$reactionBtn.classList.add("reaction-anim-remove");
            $755c816f6bb4b172$var$$reactionBtn.classList.remove("active", "reaction-anim-add");
            $755c816f6bb4b172$var$$reactionNumber.textContent = Number($755c816f6bb4b172$var$$reactionNumber.textContent) - 1;
        }
    } catch (error) {
        // Log error
        console.error("Error removing reactions: ", error.message);
    }
};
// Add event listener for click event
$755c816f6bb4b172$var$$reactionBtn?.addEventListener("click", async function() {
    $755c816f6bb4b172$var$$reactionBtn.setAttribute("disabled", "");
    if (!$755c816f6bb4b172$var$$reactionBtn.classList.contains("active")) await $755c816f6bb4b172$var$addReaction();
    else await $755c816f6bb4b172$var$removeReaction();
    $755c816f6bb4b172$var$$reactionBtn.removeAttribute("disabled");
});


"use strict";
/**
 * Increments the visit count for the current blog post and updates
 the local storage.
 * @async
 * @function countVisit
 * @throws {Error} Throws an error if there's an issue with the fetch operation.   
 */ const $e002b4fed3d00ac6$var$countVisit = async ()=>{
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
            $e002b4fed3d00ac6$var$visitedBlogs?.push(window.location.pathname);
            localStorage.setItem("visitedBlogs", JSON.stringify($e002b4fed3d00ac6$var$visitedBlogs));
        }
    } catch (error) {
        // Log error
        console.error("Error counting visit: ", error.message);
        throw error;
    }
};
// Get visitedBlogs from localStorage
let $e002b4fed3d00ac6$var$visitedBlogs = localStorage.getItem("visitedBlogs");
// Initial visitedBlogs if not found
if (!$e002b4fed3d00ac6$var$visitedBlogs) localStorage.setItem("visitedBlogs", JSON.stringify([]));
// Parse visited blog from json to array
$e002b4fed3d00ac6$var$visitedBlogs = JSON.parse(localStorage.getItem("visitedBlogs"));
// If user visited first time then calls the countVisit function
if (!$e002b4fed3d00ac6$var$visitedBlogs.includes(window.location.pathname)) $e002b4fed3d00ac6$var$countVisit();


"use strict";
const $af61a89a7b5401c4$var$$snackbarWrapper = document.querySelector("[data-snackbar-wrapper");
let $af61a89a7b5401c4$var$lastTimeout = null;
/**
 * Creates a snackbar component and displays it with specified props.
 * @param {Object} props - The properties for snackbar.
 * @param {string} props.message - The message to be displayed in the snackbar.
 * @param {string} [props.type] -the type of snackbar (optional). value: 'error' | null
 */ const $af61a89a7b5401c4$var$Snackbar = (props)=>{
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
    $af61a89a7b5401c4$var$$snackbarWrapper.innerHTML = "";
    $af61a89a7b5401c4$var$$snackbarWrapper.append($snackbar);
    // Remove snackbar after 10 seconds
    clearTimeout($af61a89a7b5401c4$var$lastTimeout);
    $af61a89a7b5401c4$var$lastTimeout = setTimeout(()=>{
        $af61a89a7b5401c4$var$$snackbarWrapper.removeChild($snackbar);
    }, 10000);
};
var $af61a89a7b5401c4$export$2e2bcd8739ae039 = $af61a89a7b5401c4$var$Snackbar;


"use strict";
/**
 * Generate an image preview from the selected file and display it in a specified container.
 * @param {HTMLInputElement} $imageField - The input field that contains the selected image file.
 * @param {HTMLElement} $imagePreview - The container element where the image preview will be displayed.
 * @returns {Promise<string>} - A promise that resolves with the object URL of the generated image.
 */ const $2519a1d0ab6f11dc$var$imagePreview = async function($imageField, $imagePreview) {
    const imageObjectUrl = URL.createObjectURL($imageField.files[0]);
    const $image = document.createElement("img");
    $image.classList.add("img-cover");
    $image.src = imageObjectUrl;
    $imagePreview.append($image);
    $imagePreview.classList.add("show");
    return imageObjectUrl;
};
var $2519a1d0ab6f11dc$export$2e2bcd8739ae039 = $2519a1d0ab6f11dc$var$imagePreview;


"use strict";
/**
 * Converts a given image blob into a data URL.
 *
 * @param {Blob} imageBlob - The Blob object representing the image.
 * @returns {Promise<string>} - A promise that resolves with the data URL representing the image, or rejects with an error if conversion fails
 */ const $5024421b7e735145$var$imageAsDataURL = async function(imageBlob) {
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
var $5024421b7e735145$export$2e2bcd8739ae039 = $5024421b7e735145$var$imageAsDataURL;


"use strict";
const $2076bbda8339c45f$var$blogBanner = {
    maxByteSize: 5120000,
    profilePhoto: {
        maxByteSize: 1024000
    }
};
var $2076bbda8339c45f$export$2e2bcd8739ae039 = $2076bbda8339c45f$var$blogBanner;


"use strict";
// Selectors for image field, image preview, and clear preview button
const $8cc802e1eef3035f$var$$imageField = document.querySelector("[data-image-field]");
const $8cc802e1eef3035f$var$$imagePreview = document.querySelector("[data-image-preview]");
const $8cc802e1eef3035f$var$$imagePreviewClear = document.querySelector("[data-image-preview-clear]");
// Event listener for image field change to trigger image preview
$8cc802e1eef3035f$var$$imageField?.addEventListener("change", ()=>{
    (0, $2519a1d0ab6f11dc$export$2e2bcd8739ae039)($8cc802e1eef3035f$var$$imageField, $8cc802e1eef3035f$var$$imagePreview);
});
/**
 * Clears the image preview by removing the 'show' class from the preview container
 * @function clearImagePreview
 */ const $8cc802e1eef3035f$var$clearImagePreview = function() {
    $8cc802e1eef3035f$var$$imagePreview.classList.remove("show");
    $8cc802e1eef3035f$var$$imagePreview.innerHTML = "";
};
$8cc802e1eef3035f$var$$imagePreviewClear?.addEventListener("click", $8cc802e1eef3035f$var$clearImagePreview);
/**
 * Handle blog publish
 */ const $8cc802e1eef3035f$var$$form = document.querySelector("[data-form]");
const $8cc802e1eef3035f$var$$submitBtn = document.querySelector("[data-submit-btn]");
const $8cc802e1eef3035f$var$$progressBar = document.querySelector("[data-progress-bar]");
// Function to toggle submit button state
function $8cc802e1eef3035f$var$toggleSubmitButton() {
    if ($8cc802e1eef3035f$var$$imageField.files.length > 0) $8cc802e1eef3035f$var$$submitBtn?.removeAttribute("disabled");
    else $8cc802e1eef3035f$var$$submitBtn?.setAttribute("disabled", "disabled");
}
// Event listener for image field change to trigger image preview
$8cc802e1eef3035f$var$$imageField?.addEventListener("change", ()=>{
    $8cc802e1eef3035f$var$toggleSubmitButton();
});
const $8cc802e1eef3035f$var$handlePublishBlog = async function(event) {
    // Preventing default form submission behavior.
    event.preventDefault();
    // Disabling publish button to prevent multiple submissions.
    $8cc802e1eef3035f$var$$submitBtn?.setAttribute("disabled", "");
    // Creating FromData object to capture form data.
    const formData = new FormData($8cc802e1eef3035f$var$$form);
    // Ensure there's not conflics between this form and register form
    if (formData.get("confirm_password") || formData.get("password")) return;
    // Handle case where user not selected any image for banner when creating blog.
    if (!formData.get("banner")?.size && !$8cc802e1eef3035f$var$$imagePreview?.hasChildNodes()) {
        // Enable submit button and show error message
        $8cc802e1eef3035f$var$$submitBtn?.removeAttribute("disabled");
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            type: "error",
            message: "You Didn't select any image for blog banner"
        });
        return;
    }
    // Handle case where selected image size larger than 5MB.
    if (formData.get("banner")?.size > (0, $2076bbda8339c45f$export$2e2bcd8739ae039).maxByteSize) {
        // Enable submit button and show error message
        $8cc802e1eef3035f$var$$submitBtn.removeAttribute("disabled");
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            type: "error",
            message: "Image should be less than 5MB."
        });
        return;
    }
    // Handle case when user don't update the blog banner.
    if (!formData.get("banner")?.size && $8cc802e1eef3035f$var$$imagePreview.hasChildNodes()) formData.delete("banner");
    // Handle case when user update the blog banner.
    if (formData.get("banner")) formData.set("banner", await (0, $5024421b7e735145$export$2e2bcd8739ae039)(formData.get("banner")));
    // Create request body form formData.
    const body = Object.fromEntries(formData.entries());
    // Show progress bar
    $8cc802e1eef3035f$var$$progressBar.classList.add("loading");
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
        $8cc802e1eef3035f$var$$submitBtn.removeAttribute("disabled");
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            message: "Your blog has been updated."
        });
        $8cc802e1eef3035f$var$$progressBar.classList.add("loading-end");
        // Redirect to the updated blog's page
        window.location = window.location.href.replace("/edit", "");
        return;
    }
    // Handle case where response is 400 (Bad Request)
    if (response.status === 400) {
        $8cc802e1eef3035f$var$$progressBar.classList.add("loading-end");
        $8cc802e1eef3035f$var$$submitBtn.removeAttribute("disabled");
        const { message: message } = await response.json();
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            type: "error",
            message: message
        });
    }
};
$8cc802e1eef3035f$var$$form?.addEventListener("submit", $8cc802e1eef3035f$var$handlePublishBlog);






"use strict";
// Selectors for image field, image preview, and clear preview button
const $f4a9ea06dcc00abf$var$$imageField = document.querySelector("[data-image-field]");
const $f4a9ea06dcc00abf$var$$imagePreview = document.querySelector("[data-image-preview]");
const $f4a9ea06dcc00abf$var$$imagePreviewClear = document.querySelector("[data-image-preview-clear]");
const $f4a9ea06dcc00abf$var$$progressBar = document.querySelector("[data-progress-bar]");
// Event listener for image field change to trigger image preview
if ($f4a9ea06dcc00abf$var$$imageField) $f4a9ea06dcc00abf$var$$imageField.addEventListener("change", ()=>{
    (0, $2519a1d0ab6f11dc$export$2e2bcd8739ae039)($f4a9ea06dcc00abf$var$$imageField, $f4a9ea06dcc00abf$var$$imagePreview);
});
/**
 * Clears the image preview by removing the 'show' class from the preview container
 * @function clearImagePreview
 */ const $f4a9ea06dcc00abf$var$clearImagePreview = function() {
    $f4a9ea06dcc00abf$var$$imagePreview.classList.remove("show");
    $f4a9ea06dcc00abf$var$$imagePreview.innerHTML = "";
};
$f4a9ea06dcc00abf$var$$imagePreviewClear?.addEventListener("click", $f4a9ea06dcc00abf$var$clearImagePreview);
/**
 * Handle blog publish
 */ const $f4a9ea06dcc00abf$var$$form = document.querySelector("[data-form]");
const $f4a9ea06dcc00abf$var$$publishBtn = document.querySelector("[data-publish-btn]");
const $f4a9ea06dcc00abf$var$handlePublishBlog = async function(event) {
    // Preventing default form submission behavior.
    event.preventDefault();
    // Disabling publish button to prevent multiple submissions.
    $f4a9ea06dcc00abf$var$$publishBtn?.setAttribute("disabled", "");
    // Creating FormData object to capture form data.
    const formData = new FormData($f4a9ea06dcc00abf$var$$form);
    // Ensure there's not conflics between this form and register form
    if (formData.get("confirm_password") || formData.get("password")) return;
    // Handle case where user not selected any image for banner when creating blog.
    if (!formData.get("banner")?.size) {
        // Enable publish button and show error message
        $f4a9ea06dcc00abf$var$$publishBtn?.removeAttribute("disabled");
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            type: "error",
            message: "You Didn't select any image for blog banner"
        });
        return;
    }
    // Handle case where selected image size larger than 5MB.
    if (formData.get("banner").size > (0, $2076bbda8339c45f$export$2e2bcd8739ae039).maxByteSize) {
        // Enable publish button and show error message
        $f4a9ea06dcc00abf$var$$publishBtn?.removeAttribute("disabled");
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            type: "error",
            message: "Image should be less than 5MB."
        });
        return;
    }
    // Overwrite banner value (which is type of 'File') to base64.
    formData.set("banner", await (0, $5024421b7e735145$export$2e2bcd8739ae039)(formData.get("banner")));
    // Create request body from formdata
    const body = Object.fromEntries(formData.entries());
    // Show progress bar
    $f4a9ea06dcc00abf$var$$progressBar.classList.add("loading");
    try {
        // Sending form data to the server for create blog.
        const response = await axios.post(`/createblog`, JSON.stringify(body), {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 200) {
            // Redirect or show success message
            (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
                message: "Your blog has been created successfully!"
            });
            // Re-enable the publish button
            $f4a9ea06dcc00abf$var$$publishBtn.removeAttribute("disabled");
            $f4a9ea06dcc00abf$var$$progressBar.classList.add("loading-end");
            return window.location = response.request.responseURL;
        }
    } catch (error) {
        // Handle error if the request fails
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            type: "error",
            message: error.response?.data?.message || "Failed to create blog."
        });
        $f4a9ea06dcc00abf$var$$progressBar.classList.add("loading-end");
    }
};
if ($f4a9ea06dcc00abf$var$$form) $f4a9ea06dcc00abf$var$$form.addEventListener("submit", $f4a9ea06dcc00abf$var$handlePublishBlog);



"use strict";
const $904daa6480eee718$var$$blogDeleteBtnAll = document.querySelectorAll("[data-blog-delete-btn]");
/**
 * DELETE request to the server to delete a specified blog.
 * @async
 * @param {string} blogId - The unique identifier of the blog to be deleted.
 * @returns {Promise<void>} - Promise resolving when the deletion operation is complete.
 */ const $904daa6480eee718$var$handleBlogDelete = async (blogId)=>{
    try {
        const confirmDelete = confirm("Are you sure you want to delete this blog?");
        // Handle case where user cancels the delete confirmation
        if (!confirmDelete) return;
        // Sending DELETE request using axios
        const response = await axios.delete(`/blogs/${blogId}/delete`);
        // Handle case where response is successful
        if (response.status === 200) {
            (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
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
$904daa6480eee718$var$$blogDeleteBtnAll?.forEach(($deleteBtn)=>{
    const blogId = $deleteBtn.dataset.blogDeleteBtn;
    $deleteBtn.addEventListener("click", $904daa6480eee718$var$handleBlogDelete.bind(null, blogId));
});




"use strict";
const $216482779f18b68a$var$$form = document.querySelector("[data-form]");
const $216482779f18b68a$var$$submitBtn = document.querySelector("[data-submit-btn]");
// Handling sign-up form submission
$216482779f18b68a$var$$form?.addEventListener("submit", async (e)=>{
    // Preventing default form behavior.
    e.preventDefault();
    // Disabling submit button to prevent multiple submissions.
    $216482779f18b68a$var$$submitBtn?.setAttribute("disabled", "");
    // Creating FormData object to capture form data.
    const formData = new FormData($216482779f18b68a$var$$form);
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
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            message: error.response.data.message,
            type: "error"
        });
        else console.error("Error submitting form:", error.message);
    } finally{
        // Re-enable the submit button in case of any error
        $216482779f18b68a$var$$submitBtn.removeAttribute("disabled");
    }
});
// Apply the saved theme when the page loads
(0, $1e5893fe2098371b$export$2e2bcd8739ae039)(null, null);




"use strict";
const $511612c42257f3ca$var$$form = document.querySelector("[data-form]");
const $511612c42257f3ca$var$$submitBtn = document.querySelector("[data-submit-btn]");
// Handling sign-up form submission
$511612c42257f3ca$var$$form?.addEventListener("submit", async (e)=>{
    // Preventing default form behavior.
    e.preventDefault();
    // Disabling submit button to prevent multiple submissions.
    $511612c42257f3ca$var$$submitBtn?.setAttribute("disabled", "");
    // Creating FormData object to capture form data.
    const formData = new FormData($511612c42257f3ca$var$$form);
    if (!formData.get("confirm_password")) return;
    // Handling case where password and confirm password fields doesn't match
    if (formData.get("password") !== formData.get("confirm_password")) {
        $511612c42257f3ca$var$$submitBtn.removeAttribute("disabled");
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
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
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            message: error.response.data.message,
            type: "error"
        });
        else console.error("Error submitting form:", error.message);
    } finally{
        // Re-enable the submit button in case of any error
        $511612c42257f3ca$var$$submitBtn.removeAttribute("disabled");
    }
});
// Apply the saved theme when the page loads
(0, $1e5893fe2098371b$export$2e2bcd8739ae039)(null, null);






"use strict";
// Selectors for image field, image preview, and clear preview button
const $fe6d77f7c7f1738d$var$$imageField = document.querySelector("[data-image-field]");
const $fe6d77f7c7f1738d$var$$imagePreview = document.querySelector("[data-image-preview]");
const $fe6d77f7c7f1738d$var$$imagePreviewClear = document.querySelector("[data-image-preview-clear]");
// Event listener for image field change to trigger image preview
$fe6d77f7c7f1738d$var$$imageField?.addEventListener("change", ()=>{
    (0, $2519a1d0ab6f11dc$export$2e2bcd8739ae039)($fe6d77f7c7f1738d$var$$imageField, $fe6d77f7c7f1738d$var$$imagePreview);
});
/**
 * Clear the image preview by removing the 'show' class from the 
 preview container.
 */ const $fe6d77f7c7f1738d$var$clearImagePreview = function() {
    $fe6d77f7c7f1738d$var$$imagePreview.classList.remove("show");
    $fe6d77f7c7f1738d$var$$imagePreview.innerHTML = "";
    $fe6d77f7c7f1738d$var$$imageField.value = "";
};
$fe6d77f7c7f1738d$var$$imagePreviewClear?.addEventListener("click", $fe6d77f7c7f1738d$var$clearImagePreview);
/**
 * Basic info update functionality
 */ const $fe6d77f7c7f1738d$var$$basicInfoForm = document.querySelector("[data-basic-info-form]") || null;
const $fe6d77f7c7f1738d$var$$basicInfoSubmit = document.querySelector("[data-basic-info-submit]");
const $fe6d77f7c7f1738d$var$oldFormData = $fe6d77f7c7f1738d$var$$basicInfoForm ? new FormData($fe6d77f7c7f1738d$var$$basicInfoForm) : null;
const $fe6d77f7c7f1738d$var$$progressBar = document.querySelector("[data-progress-bar]");
/**
 * Update basic information of the user profile.
 * @param {Event} event - The event object representing the form
 submission.
 */ const $fe6d77f7c7f1738d$var$updateBasicInfo = async (event)=>{
    // Preventing default form submission behavior.
    event.preventDefault();
    // Disable publish button to prevent multiple submissions.
    $fe6d77f7c7f1738d$var$$basicInfoSubmit.setAttribute("disabled", "");
    // Create FormData object to capture basic info form data.
    const formData = new FormData($fe6d77f7c7f1738d$var$$basicInfoForm);
    // Handle case where selected image size is larger than 1MB.
    if (formData.get("profilePhoto").size > (0, $2076bbda8339c45f$export$2e2bcd8739ae039).profilePhoto.maxByteSize) {
        // Enable submit button and show error message
        $fe6d77f7c7f1738d$var$$basicInfoSubmit.removeAttribute("disabled");
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
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
    formData.set("profilePhoto", await (0, $5024421b7e735145$export$2e2bcd8739ae039)($fe6d77f7c7f1738d$var$$imageField.files[0]));
    // Handle case where user did not change username
    if (formData.get("username") === $fe6d77f7c7f1738d$var$oldFormData.get("username")) formData.delete("username");
    // Handle case where user did not change email
    if (formData.get("email") === $fe6d77f7c7f1738d$var$oldFormData.get("email")) formData.delete("email");
    // Create request body from formData
    const body = Object.fromEntries(formData.entries());
    // Show progress bar
    $fe6d77f7c7f1738d$var$$progressBar.classList.add("loading");
    try {
        // Send form data to the server for update profile basic info.
        const response = await axios.put(`/settings/basic_info`, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        // Handle case where response is successful
        if (response.status === 200) {
            $fe6d77f7c7f1738d$var$$basicInfoSubmit.removeAttribute("disabled");
            $fe6d77f7c7f1738d$var$$progressBar.classList.add("loading-end");
            (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
                message: "Your profile has been updated."
            });
            window.location.reload();
        }
    } catch (error) {
        // Handle error response
        if (error.response && error.response.status === 400) {
            // Enable submit button and show error message
            $fe6d77f7c7f1738d$var$$basicInfoSubmit.removeAttribute("disabled");
            $fe6d77f7c7f1738d$var$$progressBar.classList.add("loading-end");
            (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
                type: "error",
                message: error.response.data.message || "An error occurred."
            });
        } else // Handle other types of errors (e.g., network issues)
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            type: "error",
            message: "Something went wrong. Please try again later."
        });
    }
};
$fe6d77f7c7f1738d$var$$basicInfoForm?.addEventListener("submit", $fe6d77f7c7f1738d$var$updateBasicInfo);
/**
 * Password update functionality
 */ const $fe6d77f7c7f1738d$var$$passwordForm = document.querySelector("[data-password-info-form]");
const $fe6d77f7c7f1738d$var$$passwordSubmit = document.querySelector("[data-password-info-submit]");
const $fe6d77f7c7f1738d$var$updatePassword = async (event)=>{
    // Preventing default form submission behavior.
    event.preventDefault();
    // Disable publish button to prevent multiple submissions.
    $fe6d77f7c7f1738d$var$$passwordSubmit.setAttribute("disabled", "");
    // Create FormData object to capture password form data.
    const formData = new FormData($fe6d77f7c7f1738d$var$$passwordForm);
    // Handle case where password and confirm password doesn't match.
    if (formData.get("password") !== formData.get("confirm_password")) {
        // Enable submit button and show error message
        $fe6d77f7c7f1738d$var$$passwordSubmit.removeAttribute("disabled");
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            type: "error",
            message: "Please ensure your password and confirm password fields contain the same value."
        });
        return;
    }
    // Create request body from formData.
    const body = Object.fromEntries(formData.entries());
    // Show progress bar.
    $fe6d77f7c7f1738d$var$$progressBar.classList.add("loading");
    try {
        // Send form data to the server for update profile basic info.
        const response = await axios.put(`/settings/password`, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        // Handle case where response is successful
        if (response.status === 200) {
            $fe6d77f7c7f1738d$var$$passwordSubmit.removeAttribute("disabled");
            $fe6d77f7c7f1738d$var$$progressBar.classList.add("loading-end");
            (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
                message: "Your password has been updated."
            });
            return;
        }
    } catch (error) {
        // Handle error response
        if (error.response && error.response.status === 401) {
            // Enable submit button and show error message
            $fe6d77f7c7f1738d$var$$passwordSubmit.removeAttribute("disabled");
            $fe6d77f7c7f1738d$var$$progressBar.classList.add("loading-end");
            (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
                type: "error",
                message: error.response.data.message || "An error occurred."
            });
        } else // Handle other types of errors (e.g., network issues)
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            type: "error",
            message: "Something went wrong. Please try again later."
        });
    }
};
$fe6d77f7c7f1738d$var$$passwordForm?.addEventListener("submit", $fe6d77f7c7f1738d$var$updatePassword);
/**
 * Account delete functionality
 */ const $fe6d77f7c7f1738d$var$$accountDeleteBtn = document.querySelector("[data-account-delete]");
const $fe6d77f7c7f1738d$var$deleteAccount = async (event)=>{
    // Show a confirmation dialog for account delete
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    // Handle case where user deny to delete account
    if (!confirmDelete) return;
    // Disable account delete button to prevent multiple requests.
    $fe6d77f7c7f1738d$var$$accountDeleteBtn.setAttribute("disabled", "");
    // Show progress bar
    $fe6d77f7c7f1738d$var$$progressBar.classList.add("loading");
    try {
        // Send account delete request in server
        const response = await axios.delete(`/settings/account`);
        // Handle case where response is successful
        if (response.status === 200) {
            $fe6d77f7c7f1738d$var$$accountDeleteBtn.removeAttribute("disabled");
            $fe6d77f7c7f1738d$var$$progressBar.classList.add("loading-end");
            // Redirect user to home page
            window.location = `${window.location.origin}/`;
        }
    } catch (error) {
        $fe6d77f7c7f1738d$var$$accountDeleteBtn.removeAttribute("disabled");
        (0, $af61a89a7b5401c4$export$2e2bcd8739ae039)({
            type: "error",
            message: error.response?.data?.message || "Failed to delete account. Please try again later."
        });
    }
};
$fe6d77f7c7f1738d$var$$accountDeleteBtn?.addEventListener("click", $fe6d77f7c7f1738d$var$deleteAccount);


"use strict";
const $39e086c72afa86d7$var$$topAppBar = document.querySelector("[data-top-app-bar]");
let $39e086c72afa86d7$var$lastScrollPos = 0;
/**
 * Attaches event listener to the window scroll event, toggling classes on the top app bar based on scroll position.
 */ window.addEventListener("scroll", (event)=>{
    // Toggling the 'active' class on the $topAppBar element based on whether the vertical scroll position is greater than 50px
    $39e086c72afa86d7$var$$topAppBar?.classList[window.scrollY > 50 ? "add" : "remove"]("active");
    // Toggling the 'hide' class based on whether the current scroll position is greater than the last scroll position and scroll position is greater than 50px
    $39e086c72afa86d7$var$$topAppBar?.classList[window.scrollY > $39e086c72afa86d7$var$lastScrollPos && window.scrollY > 50 ? "add" : "remove"]("hide");
    // Updating the last recorded scroll position
    $39e086c72afa86d7$var$lastScrollPos = window.scrollY;
});
//////////////////////////////////////////////
//               Toggle menu                //
//////////////////////////////////////////////
const $39e086c72afa86d7$var$$menuWrappers = document.querySelectorAll("[data-menu-wrapper]");
if ($39e086c72afa86d7$var$$menuWrappers) $39e086c72afa86d7$var$$menuWrappers.forEach(function($menuWrapper) {
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
const $39e086c72afa86d7$var$$backBtn = document.querySelector("[data-back-btn]");
const $39e086c72afa86d7$var$handleBackward = function() {
    window.history.back();
};
$39e086c72afa86d7$var$$backBtn?.addEventListener("click", $39e086c72afa86d7$var$handleBackward);
//////////////////////////////////////////////////////
//     Auto height textarea in blog create form     //
//////////////////////////////////////////////////////
const $39e086c72afa86d7$var$$autoHeightTextarea = document.querySelector("[data-textarea-auto-height]");
const $39e086c72afa86d7$var$textareaAutoHeight = function() {
    this.style.height = this.scrollHeight + "px";
    this.style.maxHeight = this.scrollHeight + "px";
};
$39e086c72afa86d7$var$$autoHeightTextarea?.addEventListener("input", $39e086c72afa86d7$var$textareaAutoHeight);
// Set initial textarea height
$39e086c72afa86d7$var$$autoHeightTextarea && $39e086c72afa86d7$var$textareaAutoHeight.call($39e086c72afa86d7$var$$autoHeightTextarea);
// Dark/light themes
const $39e086c72afa86d7$var$toggleThemeButton = document.getElementById("theme-toggle");
const $39e086c72afa86d7$var$lightIcon = document.querySelector(".lighten");
const $39e086c72afa86d7$var$darkIcon = document.querySelector(".darken");
// Apply the saved theme when the page loads
(0, $1e5893fe2098371b$export$2e2bcd8739ae039)($39e086c72afa86d7$var$lightIcon, $39e086c72afa86d7$var$darkIcon);
// Function to toggle between themes and save the choice
const $39e086c72afa86d7$var$toggleTheme = ()=>{
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        $39e086c72afa86d7$var$lightIcon.style.opacity = 0;
        $39e086c72afa86d7$var$darkIcon.style.opacity = 1;
        localStorage.setItem("theme", "light-mode");
    } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
        $39e086c72afa86d7$var$lightIcon.style.opacity = 1;
        $39e086c72afa86d7$var$darkIcon.style.opacity = 0;
    }
};
// Add event listener to the toggle button
if ($39e086c72afa86d7$var$toggleThemeButton) $39e086c72afa86d7$var$toggleThemeButton.addEventListener("click", $39e086c72afa86d7$var$toggleTheme);


//# sourceMappingURL=bundle.js.map
