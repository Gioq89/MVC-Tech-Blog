const editPostHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const postTitle = document.querySelector('#postTitle').value.trim();
    const postContent = document.querySelector('#postContent').value.trim();

    const response = await fetch(`/api/blogposts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            postTitle,
            postContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        console.log('Post updated!');
        document.location.replace('/dashboard');
    } else {
        alert("Failed to update post");
    }
};

document.querySelector('#editPostBtn').addEventListener('click', editPostHandler);