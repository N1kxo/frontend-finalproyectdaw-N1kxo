import { useState, useEffect } from 'react';
import { tweetService } from '../services/apiService'; // Asegúrate de que la ruta sea correcta
import Header from '../components/Header';
import TweetList from '../components/TweetList';

const DeleteTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTweets, setSelectedTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await tweetService.getAllTweets();
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
        alert('Error fetching tweets');
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  const handleDeleteTweet = async (tweetId) => {
    try {
      await tweetService.deleteTweet(tweetId);
      setTweets(tweets.filter(tweet => tweet._id !== tweetId));
      setSelectedTweets(selectedTweets.filter(id => id !== tweetId));
      alert('Tweet eliminado con éxito!');
    } catch (error) {
      console.error('Error deleting tweet:', error);
      alert('Hubo un error al eliminar el tweet.');
    }
  };

  const handleSelectTweet = (tweetId) => {
    setSelectedTweets((prev) => {
      if (prev.includes(tweetId)) {
        return prev.filter(id => id !== tweetId);
      } else {
        return [...prev, tweetId];
      }
    });
  };

  const handleDeleteSelectedTweets = async () => {
    try {
      await Promise.all(selectedTweets.map(tweetId => tweetService.deleteTweet(tweetId)));
      setTweets(tweets.filter(tweet => !selectedTweets.includes(tweet._id)));
      setSelectedTweets([]);
      alert('Tweets eliminados con éxito!');
    } catch (error) {
      console.error('Error deleting selected tweets:', error);
      alert('Hubo un error al eliminar los tweets.');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 text-white flex flex-col items-center">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Tweets</h1>
        <TweetList
          tweets={tweets}
          onDelete={handleDeleteTweet}
          onSelect={handleSelectTweet}
          selectedTweets={selectedTweets}
        />
        {selectedTweets.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-md">
            <p>¿Deseas eliminar los tweets seleccionados?</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleDeleteSelectedTweets}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Sí
              </button>
              <button
                onClick={() => setSelectedTweets([])}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                No
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeleteTweets;
