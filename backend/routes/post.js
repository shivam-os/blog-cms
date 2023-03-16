const express = require("express");
const router = express.Router();
const passport = require("passport")
const postValidator = require("../middlewares/postValidator");
const postController = require("../controllers/postController");

//GET request to get all posts
router.get("/list", postController.getPosts)

//GET request to get a post
router.get("/:id", postController.getPost);

//GET request to 

//POST request to add comment to a post
router.post("/:id/comment", postController.addComment)

//PUT request to update a post
router.put("/:id/update", postController.updatePost);

//DELETE request to delete a post
router.delete("/:id/delete", postController.deletePost);

//POST request to create a post
router.post("/create", passport.authenticate("jwt", {session: false}), postValidator.createPost, postController.createPost);

module.exports = router
