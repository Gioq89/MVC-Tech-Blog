const User = require("./User");
const BlogPost = require("./BlogPost");
const Comments = require("./Comments");

// create associations
// user has many blogposts
User.hasMany(BlogPost, {
  foreignKey: "postAuthor",
  onDelete: "CASCADE",
});
// blogpost belongs to user
BlogPost.belongsTo(User, {
  foreignKey: "postAuthor",
});
// user has many comments
User.hasMany(Comments, {
  foreignKey: "commentsAuthor",
  onDelete: "CASCADE",
});
// comment belongs to user
Comments.belongsTo(User, {
  foreignKey: "commentsAuthor",
});
// blogpost has many comments
BlogPost.hasMany(Comments, {
  foreignKey: "commentsPost",
  onDelete: "CASCADE",
});
// comment belongs to blogpost
Comments.belongsTo(BlogPost, {
  foreignKey: "commentsPost",
});

module.exports = { User, BlogPost, Comments };
