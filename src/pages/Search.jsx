import { useState } from 'react';
import { tweetService } from '../apiService';
import TweetList from './TweetList';

const Search = () => {
  const [query, setQuery] = useState('');
  const [tweets, setTweets] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await tweetService.searchTweets(query);
      setTweets(response.data);
    } catch (error) {
      console.error('Error al buscar tweets:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar tweets por palabras clave o hashtags"
          className="border rounded p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2">Buscar</button>
      </form>
      <TweetList tweets={tweets} />
    </div>
  );
};

export default Search;
