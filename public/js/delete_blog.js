"use strict";

import Snackbar from "./snackbar.js";

const $blogDeleteBtnAll = document.querySelectorAll("[data-blog-delete-btn]");

/**
 * DELETE request to the server to delete a specified blog.
 * @async
 * @param {string} blogId - The unique identifier of the blog to be deleted.
 * @returns {Promise<void>} - Promise resolving when the deletion operation is complete.
 */

const handleBlogDelete = async (blogId) => {
  try {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    // Handle case where user cancels the delete confirmation
    if (!confirmDelete) return;

    // Sending DELETE request using axios
    const response = await axios.delete(`/blogs/${blogId}/delete`);

    // Handle case where response is successful
    if (response.status === 200) {
      Snackbar({
        message: "Blog has been deleted.",
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

$blogDeleteBtnAll?.forEach(($deleteBtn) => {
  const blogId = $deleteBtn.dataset.blogDeleteBtn;
  $deleteBtn.addEventListener("click", handleBlogDelete.bind(null, blogId));
});
