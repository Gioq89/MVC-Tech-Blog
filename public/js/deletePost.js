const deletePostHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/blogposts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        console.log('Post deleted!');
        document.location.replace('/dashboard');
    } else {
        alert("Failed to delete post");
    }
};

document.querySelector('#deletePostBtn').addEventListener('click', deletePostHandler);