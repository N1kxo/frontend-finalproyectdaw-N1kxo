import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DeleteTweets from './pages/DeleteTweets';
import Notifications from './pages/Notifications';
import PublishTweet from './pages/PublishTweet';
import Search from './pages/Search';
import HomePage from './pages/HomePage';

function App() {
    const [isAuth, setIsAuth] = useState(false);
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage setAuth={setIsAuth} />} />
          <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/notifications" element={isAuth ? <Notifications /> : <Navigate to="/" />} />
          <Route path="/publishtweet" element={isAuth ? <PublishTweet /> : <Navigate to="/" />} />
          <Route path="/deletetweet" element={isAuth ? <DeleteTweets /> : <Navigate to="/" />} />
          <Route path="/search" element={isAuth ? <Search /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

export default App
