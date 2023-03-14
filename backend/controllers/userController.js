const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    //Handle errors coming from signup validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    //Hash the password for storing it in database
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    //Save the user in database with hashed password
    await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
    });

    return res.status(201).send("User created successfully.");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("An error has occured! Please try again later.");
  }
};

exports.signin = async (req, res) => {
  try {
    //Handle errors coming from signup validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    //Check if user already exists
    
    //Compare the entered password with stored password
    const doesPasswordMatch = await bcrypt.compare(password, existingUser.password)

    return res.status(201).send("User logged in successfully.");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("An error has occured! Please try again later.");
  }
}
