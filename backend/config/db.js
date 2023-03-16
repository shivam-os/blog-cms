const Sequelize = require("sequelize");

//Create connection
const sequelize = new Sequelize("blogcms", "root", "", {
  dialect: "mysql",
  host: "localhost"
} )

module.exports = sequelize;
