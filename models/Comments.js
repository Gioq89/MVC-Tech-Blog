const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create the BlogPost model
class Comments extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
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
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost',
  }
);

module.exports = Comments;