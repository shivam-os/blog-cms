const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: String,
    content: String,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["Published", "Unpublished"],
      default: "Unpublished",
    },
    comments: [
      {
        commentUser: String,
        commentBody: String,
        commentDate: {
          type: Date,
          default: () => {
            const date = new Date();
            return date.toLocaleDateString();
          },
        },
      },
    ],
  },
  { collection: "post" }
);

//Generate createdAt & updatedAt fields automatically
PostSchema.set("timestamps", true);

module.exports = mongoose.model("Post", PostSchema);
