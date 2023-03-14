const Post = require("../models/post");

exports.getPost((req, res) => {
  try {
    const postId = req.params.id;

  //Get post with given id from db

  } catch (err) {
    console.log(err);
    return res.status(500).send("An error has occured! Please try again later.");
  }
})
