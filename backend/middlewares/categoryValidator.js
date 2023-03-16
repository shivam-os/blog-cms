const { body } = require("express-validator");

exports.createCategory = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Category field cannot be empty!")
    .isLength({ min: 3 })
    .withMessage("Caategory must contain minimum 3 letters!"),
];
