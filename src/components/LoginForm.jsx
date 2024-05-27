import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/apiService';
import loginImage from '../assets/small-team-discussing-ideas-2194220-0.png'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login({ username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white text-black p-8 rounded shadow-md w-full max-w-3xl flex flex-row-reverse">
        <div className="w-full flex items-center justify-center">
          <img src={loginImage} alt="Login" className="w-3/4 h-auto" /> 
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-4">Welcome !</h1>
          <h2 className="text-xl font-bold mb-4">Sign in to</h2>
          <p className="mb-8">Craft Your Tweetscape! Create, View, Delete – All in One App!</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">User name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-black text-white p-2 rounded mt-4">
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-black">
            Don’t have an Account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
