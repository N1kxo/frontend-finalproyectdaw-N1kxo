import PropTypes from 'prop-types';

const Tweet = ({ tweet }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg mb-4">
      <div className="flex items-center mb-2">
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
      <p>{tweet.content}</p>
      {tweet.image && <img src={tweet.image} alt="" className="w-full mt-2 rounded-lg" />}
      <div className="flex justify-between mt-2">
        <button className="text-gray-400 hover:text-white">
          <i className="fas fa-heart"></i>
        </button>
        <button className="text-gray-400 hover:text-white">
          <i className="fas fa-retweet"></i>
        </button>
      </div>
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
    image: PropTypes.string,
  }).isRequired,
};

export default Tweet;
