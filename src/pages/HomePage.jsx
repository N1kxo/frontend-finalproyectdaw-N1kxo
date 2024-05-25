import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TweetList from '../components/TweetList';
import { tweetService } from '../services/apiService';

const HomePage = () => {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    try {
      const fetchedTweets = await tweetService.getAllTweets();
      setTweets(fetchedTweets);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TweetList tweets={tweets} />
      </main>
    </div>
  );
};

export default HomePage;
