const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Comment = sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  content: {
    type: DataTypes.TEXT("medium"),
    allowNull: false,
  },
});

module.exports = Comment;
