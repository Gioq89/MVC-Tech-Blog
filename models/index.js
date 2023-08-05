const User = require('./User');\
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');
// create associations
// user has many blogposts
User.hasMany(BlogPost, {
    foreignKey: 'postAuthor',
    onDelete: 'CASCADE'
});
// blogpost belongs to user
BlogPost.belongsTo(User, {
    foreignKey: 'postAuthor'
});
// user has many comments
User.hasMany(Comment, {
    foreignKey: 'commentsAuthor',
    onDelete: 'CASCADE'
});
// comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'commentsAuthor'
});
// blogpost has many comments
BlogPost.hasMany(Comment, {
    foreignKey: 'commentsPost',
    onDelete: 'CASCADE'
});
// comment belongs to blogpost
Comment.belongsTo(BlogPost, {
    foreignKey: 'commentsPost'
});

module.exports = { User, BlogPost, Comment };
