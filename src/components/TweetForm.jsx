import { useState } from 'react';
import PropTypes from 'prop-types';
import { tweetService } from '../services/apiService';

const TweetForm = ({ onTweetPosted }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 100;

  const handleTweetChange = (e) => {
    const content = e.target.value;
    if (content.length <= maxCharCount) {
      setTweetContent(content);
      setCharCount(content.length);
    }
  };

  const handleTweetSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await tweetService.createTweet({ content: tweetContent }, token);
      setTweetContent('');
      setCharCount(0);
      onTweetPosted();
      alert('Tweet publicado con éxito!');
    } catch (error) {
      console.error('Error publicando el tweet:', error);
      alert('Hubo un error al publicar el tweet.');
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <textarea
        value={tweetContent}
        onChange={handleTweetChange}
        placeholder="What do you have in mind?"
        className="w-full h-32 p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      ></textarea>
      <div className="flex justify-between mt-2">
        <span className="text-gray-400">{charCount}/{maxCharCount}</span>
        <button
          onClick={handleTweetSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

TweetForm.propTypes = {
  onTweetPosted: PropTypes.func.isRequired,
};

export default TweetForm;
