import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostForm from '../components/PostForm';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">EchoJar</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Share your thoughts anonymously and connect with others. Post a vent, comment, and express yourself freely.
        </p>
      </div>
      {isLoggedIn ? (
        <PostForm onPostCreated={fetchPosts} />
      ) : (
        <p className="text-center mb-8 text-gray-600">
          <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">Login</Link> to post a vent.
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200">
            <p className="text-gray-800 mb-4">{post.content}</p>
            <p className="text-sm text-gray-500">
              Posted by {post.userId.username} on {new Date(post.createdAt).toLocaleString()}
            </p>
            <Link
              to={`/post/${post._id}`}
              className="text-blue-500 hover:text-blue-600 font-medium mt-4 inline-block"
            >
              View Comments
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
