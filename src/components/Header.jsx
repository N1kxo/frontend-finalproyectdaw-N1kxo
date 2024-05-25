import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black py-4 w-full h-full">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-lg font-bold">Tweetscape</div>
        <nav className="space-x-4">
          <Link to="/search" className="hover:underline">Search</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          <Link to="/notifications" className="hover:underline">Notifications</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
