const Post = require("../models/post");

exports.getPosts = (req, res) => {

}

exports.getPost = (req, res) => {

}

exports.addComment = (req, res) => {

}

exports.createPost = (req, res) => {
  //Handle errors coming from createPost validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content } = req.body;

  const createdPost = Post.create({
    title: title,
    content: content,
    
  })
}

exports.updatePost = (req, res) => {

}

exports.deletePost = (req, res) => {

}
