// src/context/BlogContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getAllPosts, createPost, updatePost, deletePost, likePost, addComment } from '../services/api';

export const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchPosts();
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleUpdatePosts = (posts) => {
    setBlogPosts(posts);
  };

  const handleLogin = (token, userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleCreatePost = async (newPost) => {
    try {
      const response = await createPost(newPost);
      setBlogPosts([response.data, ...blogPosts]);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleUpdatePost = async (id, updatedPost) => {
    try {
      const response = await updatePost(id, updatedPost);
      setBlogPosts(blogPosts.map(post => post._id === id ? response.data : post));
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setBlogPosts(blogPosts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleLikePost = async (id) => {
    try {
      const response = await likePost(id);
      setBlogPosts(blogPosts.map(post => post._id === id ? response.data : post));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleAddComment = async (id, comment) => {
    try {
      const response = await addComment(id, comment);
      setBlogPosts(blogPosts.map(post => post._id === id ? response.data : post));
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <BlogContext.Provider value={{
      blogPosts,
      isAuthenticated,
      user,
      handleLogin,
      handleLogout,
      handleCreatePost,
      handleUpdatePost,
      handleDeletePost,
      handleLikePost,
      handleAddComment,
      handleUpdatePosts
    }}>
      {children}
    </BlogContext.Provider>
  );
}
