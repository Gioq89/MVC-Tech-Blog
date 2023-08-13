const editPostHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#postTitle").value.trim();
  const postContent = document.querySelector("#postContent").value.trim();

  const postId = window.location.href.slice(
    window.location.href.lastIndexOf("/") + 1,
    window.location.href.length
  );

  if (postTitle && postContent) {
    const date = new Date();
    const response = await fetch(`/api/blogposts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        postTitle,
        postContent,
        postDate: date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Post updated!");
      document.location.replace(`/blogpost/${postId}`);
    } else {
      alert("Failed to update post");
    }
  }
};

document
  .querySelector("#editPostBtn")
  .addEventListener("click", editPostHandler);
