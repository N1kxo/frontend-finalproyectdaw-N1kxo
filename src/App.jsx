import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './pages/HomePage';
import DeleteTweets from './pages/DeleteTweets';
import Notifications from './pages/Notifications';
import PublishTweet from './pages/PublishTweet';
import Search from './pages/Search';
import { userService } from './services/apiService';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await userService.validateToken(token);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <PrivateRoute path="/delete" component={DeleteTweets} />
          <PrivateRoute path="/notifications" component={Notifications} />
          <PrivateRoute path="/publish" component={PublishTweet} />
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
