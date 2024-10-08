// src/components/blog/BlogPostDetail.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ArrowLeft, Calendar, Trash2 } from 'lucide-react'

function BlogPostDetail({ post, setSelectedPost, isAuthenticated, handleDeletePost, setSelectedTag }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          onClick={() => setSelectedPost(null)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
        </Button>
        {isAuthenticated && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Post
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the blog post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeletePost(post.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <Card className="overflow-hidden">
        <div className="relative pb-[56.25%]">
          <img
            src={post.image}
            alt={post.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{post.title}</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div>{post.readTime}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag)
                  setSelectedPost(null)
                }}
                className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full hover:bg-purple-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author} />
              <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{post.author}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default BlogPostDetail