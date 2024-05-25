import PropTypes from 'prop-types';
import Tweet from './Tweet';

const TweetList = ({ tweets }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {tweets.map(tweet => (
        <Tweet key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
};

TweetList.propTypes = {
  tweets: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
    image: PropTypes.string,
  })).isRequired,
};

export default TweetList;
