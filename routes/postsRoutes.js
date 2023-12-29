const express = require("express");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controller/postsController");
const { protect } = require("../middleware/authController.js");

const router = express.Router();

router.get("/", getPosts);
router.post("/", protect, createPost);
router.patch("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.patch("/:id/likePost", protect, likePost);

module.exports = router;
