import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getAllPosts = () => api.get('/blog');
export const getPost = (id) => api.get(`/blog/${id}`);
export const createPost = (postData) => api.post('/blog', postData);
export const updatePost = (id, postData) => api.put(`/blog/${id}`, postData);
export const deletePost = (id) => api.delete(`/blog/${id}`);
export const likePost = (id) => api.post(`/blog/${id}/like`);
export const addComment = (id, comment) => api.post(`/blog/${id}/comment`, comment);
export const getAllUsers = () => api.get('/user');
export const getUser = (id) => api.get(`/user/${id}`);
export const updateUser = (id, userData) => api.put(`/user/${id}`, userData);
export const deleteUser = (id) => api.delete(`/user/${id}`);

export default api;