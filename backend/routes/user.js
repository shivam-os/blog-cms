const express = require("express");
const userController = require("../controllers/userController");
const validators = require("../middlewares/validators");
const router = express.Router();

//Signup API for new users
router.post("/signup", validators.signup, userController.signup);

//Signin API for old users
router.post("/signin", validators.signin, userController.signin);

module.exports = router;
