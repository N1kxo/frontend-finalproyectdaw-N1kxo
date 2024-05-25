import { useState } from 'react';
import { tweetService } from '../services/apiService'; // Asegúrate de que la ruta sea correcta
import Header from '../components/Header';

const PublishTweet = () => {
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
      const token = localStorage.getItem('token'); // Asegúrate de tener el token almacenado adecuadamente
      await tweetService.createTweet({ content: tweetContent }, token);
      setTweetContent('');
      setCharCount(0);
      alert('Tweet publicado con éxito!');
    } catch (error) {
      console.error('Error publicando el tweet:', error);
      alert('Hubo un error al publicar el tweet.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 text-white flex flex-col items-center">
          <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Write down What do you have in mind?</h1>
        <textarea
          value={tweetContent}
          onChange={handleTweetChange}
          placeholder="What do you have in mind?"
          className="w-full max-w-2xl h-32 p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
        <div className="flex justify-between w-full max-w-2xl mt-2">
          <span className="text-gray-400">Helper text</span>
          <span className="text-gray-400">{charCount}/{maxCharCount}</span>
        </div>
        <button
          onClick={handleTweetSubmit}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Publish
        </button>
      </main>
    </div>
  );
};

export default PublishTweet;
