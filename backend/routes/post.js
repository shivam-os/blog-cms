const express = require("express");
const router = express.Router();
const passport = require("passport")
const postValidator = require("../middlewares/postValidator");
const postController = require("../controllers/postController");

//GET request to VIEW all posts
router.get("/list", postController.getPosts)

//GET request to VIEW a post
router.get("/:id", postController.getPost);

//GET request to VIEW all comments
router.get("/:id/comment", postController.getComments)

//POST request to CREATE comment for a post
router.post("/:id/comment/add", postController.addComment)

/*
-------------PROTECTED Routes----------------
*/

//PUT request to update a post
router.put("/:id/update", passport.authenticate("jwt", {session: false}), postValidator.createPost, postController.updatePost);

//DELETE request to delete a post
router.delete("/:id/delete", passport.authenticate("jwt", {session: false}), postController.deletePost);

//POST request to create a post
router.post("/create", passport.authenticate("jwt", {session: false}), postValidator.createPost, postController.createPost);

module.exports = router
