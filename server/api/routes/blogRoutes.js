import express from 'express';
import { protect } from '../controllers/authController.js'; // Import only protect
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  addComment
} from '../controllers/blogController.js';

const router = express.Router();

// Allow unauthenticated access to get all posts
router.route('/')
  .get(getAllPosts) // No middleware here
  .post(protect, createPost); // Protect only for creating a post

router.route('/:id')
  .get(getPost) // No middleware here
  .put(protect, updatePost) // Protect for updating a post
  .delete(protect, deletePost); // Protect for deleting a post

// Protect like and comment routes
router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, addComment);

export default router;
