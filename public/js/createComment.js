const createCommentHandler = async (event) => {
  event.preventDefault();

  const commentsContent = document.querySelector("#comment-text").value.trim();
  const postId = window.location.pathname.split("/").pop();

  if (commentsContent) {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          post_id: postId,
          commentsContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      alert("An error occurred while creating the comment.");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", createCommentHandler);

