const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const categoryRoutes = require("./routes/category");
require("dotenv").config()
require("./config/db")
const passport = require("passport");
require("./config/passport")(passport)

const PORT = 3000;
const baseUrl = "/api";

//Initialize passport object on every request
app.use(passport.initialize());

//Inbuilt middleware to access req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Created routes
app.use(`${baseUrl}/user`, userRoutes);
// app.use(`${baseUrl}/post`, postRoutes);
app.use(`${baseUrl}/category`, categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
