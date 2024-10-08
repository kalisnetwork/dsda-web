import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './api/models/User.js';
import BlogPost from './api/models/BlogPost.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB for seeding'))
.catch((err) => console.error('MongoDB connection error:', err));

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await BlogPost.deleteMany({});

    // Create admin user without hashing the password here
    const adminUser = new User({
      username: 'admin',
      email: 'admin@dsda.com',
      password: 'Kalis@555', // Store raw password here; hashing will happen in the model
      role: 'admin'
    });
    await adminUser.save();

    console.log('Admin user created');

    const blogPosts = [
      {
        title: "The Future of AI in Web Development",
        content: "Artificial Intelligence is revolutionizing the way we approach web development.",
        author: "kalisnetwork", // Fixed author
        tags: ["AI", "Web Development", "Future Tech"],
        image: "https://picsum.photos/800/600?random=1" // Random image from Picsum
      },
      {
        title: "Mastering CSS Grid Layout",
        content: "CSS Grid has changed the game for web layouts. In this post, we'll explore...",
        author: "kalisnetwork", // Fixed author
        tags: ["CSS", "Web Design", "Frontend"],
        image: "https://picsum.photos/800/600?random=2" // Random image from Picsum
      },
      {
        title: "The Rise of JAMstack",
        content: "JAMstack is becoming increasingly popular for building fast and secure websites...",
        author: "kalisnetwork", // Fixed author
        tags: ["JAMstack", "Web Development", "Performance"],
        image: "https://picsum.photos/800/600?random=3" // Random image from Picsum
      },
      {
        title: "Optimizing React Performance",
        content: "Learn how to boost your React app's performance with these advanced techniques...",
        author: "kalisnetwork", // Fixed author
        tags: ["React", "JavaScript", "Performance"],
        image: "https://picsum.photos/800/600?random=4" // Random image from Picsum
      },
      {
        title: "Introduction to WebAssembly",
        content: "WebAssembly is changing the landscape of web applications. Let's dive into...",
        author: "kalisnetwork", // Fixed author
        tags: ["WebAssembly", "Performance", "Web Development"],
        image: "https://picsum.photos/800/600?random=5" // Random image from Picsum
      },
      {
        title: "The Power of Progressive Web Apps",
        content: "Progressive Web Apps combine the best of web and mobile apps. In this post...",
        author: "kalisnetwork", // Fixed author
        tags: ["PWA", "Mobile", "Web Development"],
        image: "https://picsum.photos/800/600?random=6" // Random image from Picsum
      },
      {
        title: "Mastering Git for Team Collaboration",
        content: "Effective use of Git can significantly improve team productivity. Let's explore...",
        author: "kalisnetwork", // Fixed author
        tags: ["Git", "Version Control", "Collaboration"],
        image: "https://picsum.photos/800/600?random=7" // Random image from Picsum
      },
      {
        title: "The Evolution of JavaScript Frameworks",
        content: "From jQuery to React and beyond, let's take a journey through the evolution...",
        author: "kalisnetwork", // Fixed author
        tags: ["JavaScript", "Frameworks", "Web Development"],
        image: "https://picsum.photos/800/600?random=8" // Random image from Picsum
      },
      {
        title: "Securing Your Web Applications",
        content: "Security is paramount in modern web development. In this post, we'll cover...",
        author: "kalisnetwork", // Fixed author
        tags: ["Security", "Web Development", "Best Practices"],
        image: "https://picsum.photos/800/600?random=9" // Random image from Picsum
      },
      {
        title: "The Impact of 5G on Web Technologies",
        content: "5G is set to revolutionize the internet. Let's explore its potential impact...",
        author: "kalisnetwork", // Fixed author
        tags: ["5G", "Future Tech", "Web Development"],
        image: "https://picsum.photos/800/600?random=10" // Random image from Picsum
      },
      {
        title: "Accessibility in Web Design",
        content: "Creating accessible websites is not just good practice, it's essential. Learn how...",
        author: "kalisnetwork", // Fixed author
        tags: ["Accessibility", "Web Design", "UX"],
        image: "https://picsum.photos/800/600?random=11" // Random image from Picsum
      },
      {
        title: "The Rise of Serverless Architecture",
        content: "Serverless architecture is changing how we build and deploy applications...",
        author: "kalisnetwork", // Fixed author
        tags: ["Serverless", "Cloud Computing", "Architecture"],
        image: "https://picsum.photos/800/600?random=12" // Random image from Picsum
      }
    ];

    await BlogPost.insertMany(blogPosts);

    console.log('12 blog posts created');
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
