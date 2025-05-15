import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId, onCommentCreated }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/comments/${postId}`,
        { content },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setContent('');
      setError('');
      onCommentCreated();
    } catch (err) {
      setError(err.response?.data || 'Error posting comment');
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl mt-6">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write a comment..."
          rows="3"
          required
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-200"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
