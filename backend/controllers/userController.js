const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  //Handle errors coming from signup validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    //Check if the email already exists in database
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res
        .status(403)
        .send(
          "Error: User already exists! Try login or sign up with different information."
        );
    }

    //Hash the password for storing it in database
    const encryptedPassword = await bcrypt.hash(password, 10);

    //Save the user in database with hashed password
    const myuser = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
    });

    return res.status(201).send("User created successfully.");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Error: An error has occured! Please try again later.");
  }
};

exports.signin = async (req, res) => {
  //Handle errors coming from signup validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    //Check if user already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser) {
      return res
        .status(404)
        .send("Error: User not found. Check email again or signup.");
    }

    //Compare the entered password with stored password
    const doesPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!doesPasswordMatch) {
      return res
        .status(403)
        .send("Error: Incorrect password. Please try again.");
    }

    //If password matches, then assign a jwt token & save it in cookie
    const payload = { userId: existingUser.dataValues.id };
    console.log(existingUser.dataValues.id);
    const bearerToken = await jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    //Send the token in cookie with tkn as the key
    res.cookie("tkn", "Bearer " + bearerToken);

    return res.status(201).json({ token: "Bearer " + bearerToken });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("An error has occured! Please try again later.");
  }
};
