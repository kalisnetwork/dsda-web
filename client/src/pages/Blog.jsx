// src/pages/Blog.jsx
import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogPostCard from '../components/blog/BlogPostCard';
import BlogPostDetail from '../components/blog/BlogPostDetail';
import CreatePostForm from '../components/blog/CreatePostForm';
import LoginForm from '../components/blog/LoginForm';
import Pagination from '../components/blog/Pagination';
import { BlogContext } from '../context/BlogContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { getAllPosts } from '../services/api';

function Blog() {
  const { blogPosts, isAuthenticated, handleLogout, handleCreatePost, handleDeletePost, handleUpdatePosts } = useContext(BlogContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getAllPosts();
      handleUpdatePosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const postTagsLower = post.tags.map(tag => tag.toLowerCase());
    const selectedTagLower = selectedTag ? selectedTag.toLowerCase() : '';

    return (
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedTag || postTagsLower.includes(selectedTagLower))
    );
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Dive Into Our Blog</h1>
        <p className="text-lg text-gray-400">Discover insights and stories that inspire.</p>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          {isAuthenticated ? (
            <>
              <Button onClick={() => setShowCreateForm(true)}>Create Post</Button>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button onClick={() => setShowLoginForm(true)}>Login</Button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showLoginForm && (
          <LoginForm setShowLoginForm={setShowLoginForm} />
        )}
        {showCreateForm && (
          <CreatePostForm
            handleCreatePost={handleCreatePost}
            setShowCreateForm={setShowCreateForm}
            availableTags={[]} 
          />
        )}
        {selectedPost ? (
          <BlogPostDetail
            post={selectedPost}
            setSelectedPost={setSelectedPost}
            isAuthenticated={isAuthenticated}
            handleDeletePost={handleDeletePost}
            setSelectedTag={setSelectedTag}
          />
        ) : (
          <>
            {selectedTag && (
              <div className="mb-4 flex items-center">
                <Button variant="ghost" onClick={() => setSelectedTag(null)} className="mr-2">
                  <X className="h-4 w-4 mr-1" /> Clear filter
                </Button>
                <span className="text-sm text-muted-foreground">
                  Showing posts tagged with: <span className="font-semibold">{selectedTag}</span>
                </span>
              </div>
            )}
            {loading ? (
              <div className="loader">Loading...</div>
            ) : currentPosts.length === 0 ? (
              <p className="text-gray-500">No posts found.</p>
            ) : (
              <motion.div
                key="post-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentPosts.map((post, index) => (
                  <BlogPostCard
                    key={post._id}
                    post={post}
                    index={index}
                    setSelectedPost={setSelectedPost}
                    setSelectedTag={setSelectedTag}
                  />
                ))}
              </motion.div>
            )}
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filteredPosts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Blog;
