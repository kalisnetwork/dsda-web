import BlogPost from '../models/BlogPost.js';
import { AppError } from '../utils/error.js';

export const createPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.create({ ...req.body, author: req.user._id });
    res.status(201).json(blogPost);
  } catch (err) {
    next(new AppError('Error creating blog post', 400));
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const blogPosts = await BlogPost.find().populate('author', 'username');
    res.json(blogPosts);
  } catch (err) {
    next(new AppError('Error fetching blog posts', 500));
  }
};

export const getPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!blogPost) return next(new AppError('Blog post not found', 404));
    res.json(blogPost);
  } catch (err) {
    next(new AppError('Error fetching blog post', 500));
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) return next(new AppError('Blog post not found', 404));
    if (blogPost.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to update this blog post', 403));
    }
    Object.assign(blogPost, req.body);
    await blogPost.save();
    res.json(blogPost);
  } catch (err) {
    next(new AppError('Error updating blog post', 400));
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) return next(new AppError('Blog post not found', 404));
    if (blogPost.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to delete this blog post', 403));
    }
    await blogPost.remove();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    next(new AppError('Error deleting blog post', 500));
  }
};

export const likePost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) return next(new AppError('Blog post not found', 404));
    if (blogPost.likes.includes(req.user._id)) {
      blogPost.likes = blogPost.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      blogPost.likes.push(req.user._id);
    }
    await blogPost.save();
    res.json(blogPost);
  } catch (err) {
    next(new AppError('Error liking/unliking blog post', 400));
  }
};

export const addComment = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) return next(new AppError('Blog post not found', 404));
    const newComment = {
      user: req.user._id,
      text: req.body.text
    };
    blogPost.comments.push(newComment);
    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (err) {
    next(new AppError('Error adding comment', 400));
  }
};
