import PropTypes from 'prop-types';

const Tweet = ({ tweet, onDelete, onSelect, isSelected }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-gray-600 mr-3"
          checked={isSelected}
          onChange={() => onSelect(tweet._id)}
        />
        {tweet.author && (
          <>
            <img src={tweet.author.avatar} alt={tweet.author.username} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <div className="font-bold">{tweet.author.username}</div>
              <div className="text-gray-400 text-sm">{new Date(tweet.createdAt).toLocaleString()}</div>
            </div>
          </>
        )}
      </div>
      <div className="flex-grow mx-4">
        <p>{tweet.content}</p>
        {tweet.image && <img src={tweet.image} alt="" className="w-full mt-2 rounded-lg" />}
      </div>
      <button
        onClick={() => onDelete(tweet._id)}
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete
      </button>
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
    image: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default Tweet;
