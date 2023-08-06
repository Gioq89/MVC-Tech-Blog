const createPostHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#postTitle').value.trim();
    const postContent = document.querySelector('#postContent').value.trim();

    if (postTitle && postContent) {
        const response = await fetch('/api/blogPosts', {
            method: 'POST',
            body: JSON.stringify({ postTitle, postContent }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
};

document.querySelector('.create-post-form').addEventListener('submit', createPostHandler);