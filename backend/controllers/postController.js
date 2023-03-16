const Post = require("../models/post");
const Category = require("../models/category");
const { validationResult } = require("express-validator");
const Comment = require("../models/comment");

//Return true if post with given id exists in database
const findPost = async (id) => {
  try {
    const existingPost = await Post.findOne({ where: { id: id } });
    return existingPost ? true : false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//GET request controller to VIEW all posts
exports.getPosts = async (req, res) => {
  try {
    //Get all posts from the post table
    const allPosts = await Post.findAll();
    return res.status(200).send(allPosts);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Error: An error has occured! Please try again later.");
  }
};

//GET request controller to VIEW a single post
exports.getPost = async (req, res) => {
  try {
    //Check if post with given id exists
    const result = await findPost(req.params.id);
    if (!result) {
      return res
        .status(400)
        .json({ err: "Post with given id does not exists!" });
    }

    //Get the post with given id
    const existingPost = await Post.findOne({ where: { id: req.params.id } });

    return res.status(200).send(existingPost);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Error: An error has occured! Please try again later.");
  }
};

//GET request controller to VIEW all comments for a single post
exports.getComments = async (req, res) => {
  try {
    //Check if post with given id exists
    const result = await findPost(req.params.id);
    if (!result) {
      return res
        .status(400)
        .json({ err: "Post with given id does not exists!" });
    }

    //Get all comments for the post with given id
    const commentsList = await Comment.findAll({where: {postId: req.params.id}})

    return res.status(200).send(commentsList);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Error: An error has occured! Please try again later.");
  }
}

//POST request controller to add a single comment
exports.addComment = async (req, res) => {
  try {
    //Check if post with given id exists
    const result = await findPost(req.params.id);
    if (!result) {
      return res
        .status(400)
        .json({ err: "Post with given id does not exists!" });
    }

    //Create a comment for the post with given id
    const { email, content } = req.body;

    const addedComment = await Comment.create({
      email: email,
      content: content,
      postId: req.params.id,
    });

    return res.status(201).send(addedComment);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Error: An error has occured! Please try again later.");
  }
};

//POST request controller to CREATE a post
exports.createPost = async (req, res) => {
  //Handle errors coming from createPost validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content } = req.body;

    //Find the category from the category table
    const foundCategory = await Category.findOne(
      { attributes: ["id"] },
      { name: "Python" }
    );

    //Create the post in database
    const createdPost = await Post.create({
      title: title,
      content: content,
      categoryId: foundCategory.dataValues.id,
      userId: req.user.dataValues.id,
    });

    return res.status(201).send(createdPost);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Error: An error has occured! Please try again later.");
  }
};

//PUT request controller to UPDATE a category
exports.updatePost = async (req, res) => {
  try {
    //Check if post with given id exists
    const result = await findPost(req.params.id);
    if (!result) {
      return res
        .status(400)
        .json({ err: "Post with given id does not exists!" });
    }

    //Update the post with given id
    const { title, content } = req.body;
    await Post.update(
      { title: title, content: content },
      { where: { id: req.params.id } }
    );

    return res.status(204).json({ msg: "Post with given id is updated!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Error: An error has occured! Please try again later.");
  }
};

//DELETE request controller to DELETE a category
exports.deletePost = async (req, res) => {
  try {
    //Check if post with given id exists
    const result = await findPost(req.params.id);
    if (!result) {
      return res
        .status(400)
        .json({ err: "Post with given id does not exists!" });
    }

    //Delete the post matching given id
    await Post.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ msg: "Post with given id is deleted!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Error: An error has occured! Please try again later.");
  }
};
