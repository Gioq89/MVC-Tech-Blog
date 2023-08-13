const createPostHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#postTitle").value.trim();
  const postContent = document.querySelector("#postContent").value.trim();
  
  console.log("Post Title:", postTitle);
  console.log("Post Content:", postContent);
  
  if (postTitle && postContent) {
    const date = new Date();
      try {
          const response = await fetch("/api/blogposts", {
              method: "POST",
              body: JSON.stringify({ postTitle, postContent , postDate: date}),
              headers: { "Content-Type": "application/json" },
            });
            console.log(postTitle, postContent)
            console.log("Response:", response);
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post.");
    }
  }
};

document
  .querySelector(".createPost-form")
  .addEventListener("submit", createPostHandler);
