"use strict";

/**
 * Increments the visit count for the current blog post and updates
 the local storage.
 * @async
 * @function countVisit
 * @throws {Error} Throws an error if there's an issue with the fetch operation.   
 */

const countVisit = async () => {
  try {
    if (!document.querySelector("[data-reaction-btn]")) return;

    const currentPath = window.location.pathname; // e.g., '/blogs/67781059d5bfbf79608410a2/edit'
    const blogId = currentPath.split("/")[2]; // Extract '67781059d5bfbf79608410a2'
    const blogsWord = currentPath.split("/")[1];
    if (!blogId || blogsWord !== "blogs") return;
    // Increment the visit count
    const response = await fetch(`${blogId}/visit`, {
      method: "PUT",
    });

    // If the response if successful, update the visitedBlogs array and local storage
    if (response.ok) {
      visitedBlogs?.push(window.location.pathname);
      localStorage.setItem("visitedBlogs", JSON.stringify(visitedBlogs));
    }
  } catch (error) {
    // Log error
    console.error("Error counting visit: ", error.message);
    throw error;
  }
};

// Get visitedBlogs from localStorage
let visitedBlogs = localStorage.getItem("visitedBlogs");

// Initial visitedBlogs if not found
if (!visitedBlogs) localStorage.setItem("visitedBlogs", JSON.stringify([]));

// Parse visited blog from json to array
visitedBlogs = JSON.parse(localStorage.getItem("visitedBlogs"));

// If user visited first time then calls the countVisit function
if (!visitedBlogs.includes(window.location.pathname)) {
  countVisit();
}
