const Category = require("../models/category");
const Post = require("../models/post")
const { validationResult } = require("express-validator");

//Return true if category with given id exists in database
const findCategory = async (id) => {
  try {
    const result = await Category.findOne({where: {id: id}});
    return result ? true : false;
  } catch (err) {
    console.log(err)
    return false
  }
}

//POST request controller to CREATE a category
exports.createCategory = async (req, res) => {
  //Handle errors coming from createCategory validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;

    //Create category with given name in database
    const createdCategory = await Category.create({ name: name });

    return res.status(201).send(createdCategory);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "An error has occured! Please try again later." });
  }
};

//GET request controller to view all posts under a category
exports.getCategoryPosts = async (req, res) => {
  try {

    //Find if the category with given id exists
    const result = findCategory(req.params.id);
    if (!result) {
      return res
        .status(400)
        .json({ err: "Post with given id does not exists!" });
    }

    //Get all posts with given categoryId from the posts table
    const categoryPosts = await Post.findAll({where: {categoryId: req.params.id}})
    return res.status(200).send(categoryPosts)

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "An error has occured! Please try again later." });
  }
};

//DELETE request controller to DELETE a category
exports.deleteCategory = async (req, res) => {
  try {

    //Find if the category with given id exists
    const result = await findCategory(req.params.id);
    if (!result) {
      return res
        .status(400)
        .json({ err: "Post with given id does not exists!" });
    }

    //Delete the category with given id
    await Category.destroy({where: {id: req.params.id}});
    return res.status(200).json({ msg: "Category with given id is deleted!" });

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "An error has occured! Please try again later." });
  }
};

//PUT request controller to UPDATE a category
exports.updateCategory = async (req, res) => {
  try {

    //Find if the category with given id exists
    const result = await findCategory(req.params.id);
    if (!result) {
      return res
        .status(400)
        .json({ err: "Post with given id does not exists!" });
    }

    //Update the category with given id
    await Category.update({name: req.body.name}, {where: {id: req.params.id}})
    return res.status(200).json({msg: "Category with given id is updated!"});

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "An error has occured! Please try again later." });
  }
};
