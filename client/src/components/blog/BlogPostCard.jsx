// src/components/blog/BlogPostCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function BlogPostCard({ post, index, setSelectedPost, setSelectedTag }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col transition-shadow duration-300 ease-in-out hover:shadow-xl cursor-pointer" onClick={() => setSelectedPost(post)}>
        <div className="relative pb-[40%]">
          <img
            src={post.image}
            alt={post.title}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            onError={(e) => {
              e.target.onerror = null; // prevents infinite loop
              e.target.src = 'default-image-url.jpg'; // fallback image
            }}
          />
        </div>
        <CardHeader className="flex-grow">
          <CardTitle className="text-xl font-semibold line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTag(tag);
                }}
                className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full hover:bg-purple-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author} />
              <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{post.author}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {post.date}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default BlogPostCard;
