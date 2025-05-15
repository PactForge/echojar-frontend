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

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Post Details</h1>
      <div className="p-4 bg-white shadow rounded-lg mb-6">
        <p className="text-gray-800">{post.content}</p>
        <p className="text-sm text-gray-500 mt-2">
          Posted by {post.userId.username} on {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          Account: {post.userId.isPrivate ? 'Private (Admin only comments)' : 'Public'}
        </p>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {isLoggedIn && (!post.userId.isPrivate || isAdmin) ? (
        <CommentForm postId={id} onCommentCreated={fetchComments} />
      ) : (
        <p className="text-gray-600 mb-4">
          {isLoggedIn
            ? 'Only admins can comment on private posts.'
            : 'Please login to comment.'}
        </p>
      )}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-600">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-800">{comment.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Commented by {comment.userId.username} on {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetail;
