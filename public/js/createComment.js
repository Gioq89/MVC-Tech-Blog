const createCommentHandler = async (event) => {
    event.preventDefault();

    const commentsContent = document.querySelector('#comment-text').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (commentsContent) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Failed to create comment');
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', createCommentHandler);