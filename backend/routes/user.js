const express = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");
const validators = require("../middlewares/userValidator");
const router = express.Router();

//Signup API for new users
router.post("/signup", validators.signup, userController.signup);

//Signin API for old users
router.post("/signin", validators.signin, userController.signin);

/*
-------------PROTECTED Routes----------------
*/

//Demo
router.get("/protected", passport.authenticate("jwt", {session: false}), (req, res) => {
  console.log(req.user.dataValues)
  res.send("You can access this route as you are verified.")
})

module.exports = router;
