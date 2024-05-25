import { useState, useEffect } from 'react';
import { tweetService } from './apiService'; // Asegúrate de que la ruta sea correcta

const DeleteTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setTweets(tweets.filter(tweet => tweet.id !== tweetId));
      alert('Tweet eliminado con éxito!');
    } catch (error) {
      console.error('Error deleting tweet:', error);
      alert('Hubo un error al eliminar el tweet.');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 text-white flex flex-col items-center">
      <header className="bg-gray-800 py-4 w-full">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-lg font-bold">Tweetscape</div>
          <nav className="space-x-4">
            <a href="/search" className="hover:underline">Search</a>
            <a href="/profile" className="hover:underline">Profile</a>
            <a href="/notifications" className="hover:underline">Notifications</a>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Tweets</h1>
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{tweet.author}</h2>
                <p>{tweet.content}</p>
              </div>
              <button
                onClick={() => handleDeleteTweet(tweet.id)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DeleteTweets;
