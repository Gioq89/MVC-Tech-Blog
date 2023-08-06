const { Comments } = require("../models");

const commentsData = [
    {
        "id": 1,
        "commentsContent": "Test Comment 1",
        "commentsDate": "08/05/23",
        "commentsAuthor": "Test Author 1"
    },
    {
        "id": 2,
        "commentsContent": "Test Comment 2",
        "commentsDate": "08/05/23",
        "commentsAuthor": "Test Author 2"
    },
    {
        "id": 3,
        "commentsContent": "Test Comment 3",
        "commentsDate": "08/05/23",
        "commentsAuthor": "Test Author 3"
    },
    {
        "id": 4,
        "commentsContent": "Test Comment 4",
        "commentsDate": "08/05/23",
        "commentsAuthor": "Test Author 4"
    },
    {
        "id": 5,
        "commentsContent": "Test Comment 5",
        "commentsDate": "08/05/23",
        "commentsAuthor": "Test Author 5"
    },
];

const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;