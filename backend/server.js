const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const categoryRoutes = require("./routes/category");
const PORT = 3000;
const baseUrl = "/api";
const sequelize = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`${baseUrl}/user`, userRoutes);
// app.use(`${baseUrl}/post`, userRoutes);
// app.use(`${baseUrl}/category`, userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
