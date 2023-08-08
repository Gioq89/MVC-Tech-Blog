const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {
}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    postAuthor: {
      type: DataTypes.INTEGER, // Change this to INTEGER since it references the user's ID
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost',
  }
);

module.exports = BlogPost;
