const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create the BlogPost model
class Comments extends Model {
}
// define table columns and configuration
Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    commentsContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentsDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    commentsAuthor: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'username',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;
