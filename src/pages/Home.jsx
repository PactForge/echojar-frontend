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
      <h1 className="text-3xl font-bold mb-6 text-center">EchoJar - Share Your Thoughts</h1>
      {isLoggedIn ? (
        <PostForm onPostCreated={fetchPosts} />
      ) : (
        <p className="text-center mb-6">
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link> to post a vent.
        </p>
      )}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="p-4 bg-white shadow rounded-lg">
            <p className="text-gray-800">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted by {post.userId.username} on {new Date(post.createdAt).toLocaleString()}
            </p>
            <Link
              to={`/post/${post._id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
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
