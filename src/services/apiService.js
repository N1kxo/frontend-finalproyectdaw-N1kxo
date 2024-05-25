import axios from 'axios';

// Configura la URL base para las solicitudes HTTP
const API_URL = 'http://localhost:5000'; 

// Configuración de axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Funciones para los servicios de usuario
const userService = {
  register: (userData) => {
    return axiosInstance.post('/users/register', userData);
  },
  login: (userData) => {
    return axiosInstance.post('/users/login', userData);
  },
  getUser: (userId) => {
    return axiosInstance.get(`/users/${userId}`);
  },
  followUser: (userId, token) => {
    return axiosInstance.post(`/users/${userId}/follow`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

// Funciones para los servicios de tweets
const tweetService = {
  getAllTweets: () => {
    return axiosInstance.get('/tweets');
  },
  createTweet: (tweetData, token) => {
    return axiosInstance.post('/tweets', tweetData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  editTweet: (tweetId, tweetData, token) => {
    return axiosInstance.put(`/tweets/${tweetId}`, tweetData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  deleteTweet: (tweetId, token) => {
    return axiosInstance.delete(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  likeTweet: (tweetId, token) => {
    return axiosInstance.post(`/tweets/${tweetId}/like`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  repostTweet: (tweetId, token) => {
    return axiosInstance.post(`/tweets/${tweetId}/repost`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  getNotifications: (token) => {
    return axiosInstance.get('/tweets/notifications', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export { userService, tweetService };
