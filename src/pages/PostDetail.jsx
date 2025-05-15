import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../components/CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) return <div className="text-center mt-16 text-gray-600">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Post Details</h1>
      <div className="p-6 bg-white rounded-xl shadow-md mb-8">
        <p className="text-gray-800 mb-4">{post.content}</p>
        <p className="text-sm text-gray-500">
          Posted by {post.userId.username} on {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          Account: {post.user}
          
