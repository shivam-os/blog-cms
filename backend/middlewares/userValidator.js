const { body } = require("express-validator");

exports.signup = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name field cannot be empty!")
    .isLength({ min: 3 })
    .withMessage("Name must contain minimum 3 letters!")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must not include any number or special characters!"),

  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email field cannot be empty!")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address!"),

  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password field cannot be empty!")
    .isStrongPassword()
    .withMessage(
      "Password must be atleast 8 characters long & must include- one uppercase letter, one lowercase letter, one special character, one digit."
    ),
];

exports.signin = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email field cannot be empty!")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address!"),

  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password field cannot be empty!")
    .isStrongPassword()
    .withMessage(
      "Password must be atleast 8 characters long & must include- one uppercase letter, one lowercase letter, one special character, one digit."
    ),
];
