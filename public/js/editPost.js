const editPostHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#postTitle").value.trim();
  const postContent = document.querySelector("#postContent").value.trim();
  const currentPost = window.location.href;
  const postId = window.currentPost.slice(
    window.currentPost.lastIndexOf("/") + 1,
    window.currentPost.length
  );

  if (postTitle && postContent) {
    const response = await fetch(`/api/blogposts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        postTitle,
        postContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Post updated!");
      document.location.replace("/blogpost/${postId}");
    } else {
      alert("Failed to update post");
    }
  }
};

document
  .querySelector("#editPostBtn")
  .addEventListener("click", editPostHandler);
