const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Comment = require("./comment");

const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
  },

  content: {
    type: DataTypes.TEXT("long"),
  },

  status: {
    type: DataTypes.ENUM("published", "unpublished"),
    defaultValue: "unpublished",
  },
});

Post.hasMany(Comment, {
  referenceKey: "postId"
})

module.exports = Post;
