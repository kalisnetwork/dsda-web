// src/components/blog/CreatePostForm.jsx
import React, { useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { BlogContext } from '../../context/BlogContext';
import { createPost } from '../../services/api';
import { toast } from 'react-hot-toast';

const initialValue = [
  { type: 'paragraph', children: [{ text: '' }] },
];

function CreatePostForm({ setShowCreateForm, availableTags }) {
  const [title, setTitle] = useState('');
  const [editorValue, setEditorValue] = useState(initialValue);
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);
  const editor = useRef(withHistory(withReact(createEditor())));
  const { handleCreatePost } = useContext(BlogContext);

  const renderElement = (props) => {
    const { element } = props;
    switch (element.type) {
      case 'block-quote':
        return <blockquote>{props.children}</blockquote>;
      case 'bold':
        return <strong>{props.children}</strong>;
      case 'italic':
        return <em>{props.children}</em>;
      case 'heading-one':
        return <h1>{props.children}</h1>;
      case 'heading-two':
        return <h2>{props.children}</h2>;
      case 'list-item':
        return <li>{props.children}</li>;
      case 'unordered-list':
        return <ul>{props.children}</ul>;
      case 'ordered-list':
        return <ol>{props.children}</ol>;
      default:
        return <p>{props.children}</p>;
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const content = editorValue.map((block) => block.children[0].text).join('\n');
    try {
      const newPost = await createPost({ title, content, image, tags });
      handleCreatePost(newPost.data);
      setShowCreateForm(false);
      toast.success('Post created successfully');
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-8"
    >
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
              <Slate editor={editor.current} value={editorValue} onChange={setEditorValue}>
                <Editable renderElement={renderElement} placeholder="Start writing your post..." />
              </Slate>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                id="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span key={tag} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-purple-600 hover:text-purple-800">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTags.filter(tag => !tags.includes(tag)).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="submit">Create Post</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CreatePostForm;