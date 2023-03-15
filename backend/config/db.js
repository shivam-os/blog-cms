require("dotenv").config();
const mongoose = require("mongoose");

//Connect to the Mongodb
mongoose.connect(process.env.DATABASE_URL)
