const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", UserSchema);
