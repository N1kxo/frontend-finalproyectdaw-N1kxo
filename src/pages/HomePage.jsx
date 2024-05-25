import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TweetList from '../components/TweetList';
import TweetForm from '../components/TweetForm';
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

  const handleNewTweet = () => {
    fetchTweets();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TweetForm onTweetPosted={handleNewTweet} />
        <TweetList tweets={tweets} />
      </main>
    </div>
  );
};

export default HomePage;
