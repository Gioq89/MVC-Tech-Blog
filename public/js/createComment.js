const createCommentHandler = async (event) => {
  event.preventDefault();

  const commentsContent = document.querySelector("#comment-content").value.trim();
  const currentPost = window.location.href;
  const postId = currentPost.slice(currentPost.lastIndexOf("/") + 1); // Corrected this line

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
        document.location.replace(`/blogpost/${postId}`);
      } else {
        alert("An error occurred while creating the comment.");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      alert("An error occurred while creating the comment.");
    }
  }
};

document.querySelector(".newComment-form").addEventListener("submit", createCommentHandler);
