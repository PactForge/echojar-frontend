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
    <div className="p-4 bg-gray-100 rounded-lg mt-4">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a comment..."
          rows="3"
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
