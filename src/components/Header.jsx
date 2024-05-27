import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-black py-4 w-full h-full">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-lg font-bold">Tweetscape</div>
        <nav className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/search" className="hover:underline">Search</Link>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <Link to="/notifications" className="hover:underline">Notifications</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
