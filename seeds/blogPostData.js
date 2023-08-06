const { BlogPost } = require("../models");

const blogPostData = [
    {
        "id": 1,
        "postTitle": "Test",
        "postDate": "08/05/23",
        "postContent": "Test Blog Post 1",
        "postAuthor": "Test Author 1"
    },
    {
        "id": 2,
        "postTitle": "Test2",
        "postContent": "Test Blog Post 2",
        "postDate": "08/05/23",
        "postAuthor": "Test Author 2"
    },
    {
        "id": 3,
        "postTitle": "Test3",
        "postContent": "Test Blog Post 3",
        "postDate": "08/05/23",
        "postAuthor": "Test Author 3"
    },
    {
        "id": 4,
        "postTitle": "Test4",
        "postContent": "Test Blog Post 4",
        "postDate": "08/05/23",
        "postAuthor": "Test Author 4"
    },
    {
        "id": 5,
        "postTitle": "Test5",
        "postContent": "Test Blog Post 5",
        "postDate": "08/05/23",
        "postAuthor": "Test Author 5"
    },
];

const seedPosts = () => BlogPost.bulkCreate(blogPostData);

module.exports = seedPosts;