require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

//Create tables
// const createTables = async () => {
//   try {
//     const result = await sequelize.sync();
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = sequelize;
