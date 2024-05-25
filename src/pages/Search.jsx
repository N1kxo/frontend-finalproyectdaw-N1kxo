import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Reemplaza la URL con la de tu backend
      const response = await axios.get(`https://your-backend-api.com/tweets/search`, {
        params: { query }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 text-white flex flex-col items-center">
            <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <form onSubmit={handleSearch} className="w-full max-w-lg mx-auto mb-8">
          <div className="flex items-center border-b border-b-2 border-gray-600 py-2">
            <input
              type="text"
              className="appearance-none bg-transparent border-none w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Search for tweets"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-gray-600 hover:bg-gray-700 border-gray-600 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded"
            >
              Search
            </button>
          </div>
        </form>
        <div className="space-y-4">
          {results.map((tweet) => (
            <div key={tweet.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{tweet.author}</h2>
              <p>{tweet.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Search;
