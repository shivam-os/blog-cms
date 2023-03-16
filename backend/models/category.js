const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Post = require("./post")

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Category.hasMany(Post, {
  foreignKey: "categoryId",
});

module.exports = Category;
