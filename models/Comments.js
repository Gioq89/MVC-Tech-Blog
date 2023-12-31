const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {
}

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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blogpost',
        key: 'id',
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
