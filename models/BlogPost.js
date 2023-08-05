const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


// create the BlogPost model
class BlogPost extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// define table columns and configuration
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

module.exports = BlogPost;