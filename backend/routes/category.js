const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const passport = require("passport");

//GET request for VIEWING all posts under a category
router.get("/:id/posts", categoryController.getCategoryPosts)

/*
-------------PROTECTED Routes----------------
*/

//POST request to CREATE a category
router.post("/create", passport.authenticate("jwt", {session: false}), categoryController.createCategory);

//DELETE request to DELETE a category
router.delete("/:id/delete", passport.authenticate("jwt", {session: false}), categoryController.deleteCategory);

//PUT request to UPDATE a category
router.put("/:id/update", passport.authenticate("jwt", {session: false}), categoryController.updateCategory);

module.exports = router;
