const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

//GET request for viewing all posts under a category
router.get("/:id/posts", categoryController.getCategoryPosts)

//POST request to create a category
router.post("/create", categoryController.createCategory);

//DELETE request to delete a category
router.delete("/:id/delete", categoryController.deleteCategory);

//PUT request to update a category
router.put("/:id/update", categoryController.updateCategory);

module.exports = router;
