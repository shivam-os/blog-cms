const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Post = require("./post");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Post, {
  foreignKey: "userId",
});

module.exports = User;
