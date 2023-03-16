const {body} = require("express-validator");

exports.createPost = [
  body("title")
  .trim()
  .not()
  .isEmpty()
  .withMessage("Title field cannot be empty!")
  .isLength({ min: 5 })
  .withMessage("Title must contain minimum 5 letters!"),

  body("content")
  .trim()
  .not()
  .isEmpty()
  .withMessage("Content field cannot be empty!")
  .isLength({ min: 10 })
  .withMessage("Content must contain minimum 10 letters!")
]
