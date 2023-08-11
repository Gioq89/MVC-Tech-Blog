const deletePostHandler = async (event) => {
    event.preventDefault();

    const currentPost = window.location.href;
    const postId = currentPost.slice(currentPost.lastIndexOf('/') + 1, currentPost.length);

    const response = await fetch(`/api/blogposts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        console.log('Post deleted');
        document.location.replace('/dashboard');
    } else {
        alert("Failed to delete post");
    }
};

document.querySelector('#deletePostBtn').addEventListener('click', deletePostHandler);