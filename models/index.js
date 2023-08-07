const User = require("./User");
const BlogPost = require("./BlogPost");
const Comments = require("./Comments");
// create associations
// user has many blogposts
User.hasMany(BlogPost, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
// blogpost belongs to user
BlogPost.belongsTo(User, {
  foreignKey: "userId",
});
// user has many comments
User.hasMany(Comments, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
// comment belongs to user
Comments.belongsTo(User, {
  foreignKey: "userId",
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
