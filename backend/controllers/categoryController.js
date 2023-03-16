const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const createdCategory = await Category.create({ name: name });
    return res.status(201).send(createdCategory);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "An error has occured! Please try again later." });
  }
};

exports.getCategoryPosts = async (req, res) => {};

exports.deleteCategory = async (req, res) => {};

exports.updateCategory = async (req, res) => {};
