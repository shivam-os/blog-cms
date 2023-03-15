const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: String,
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { collection: "category" }
);

module.exports = mongoose.model("Category", CategorySchema);
