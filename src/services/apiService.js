import axios from 'axios';

const API_URL = 'https://backend-tweetscape.vercel.app/';

// Configuración de axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token a las solicitudes si está disponible
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Funciones para los servicios de usuario
const userService = {
  register: (userData) => axiosInstance.post('/users/register', userData),
  login: (userData) => axiosInstance.post('/users/login', userData),
  validateToken: (token) => axiosInstance.post('/users/validateToken', { token }),
  getUser: (userId) => axiosInstance.get(`/users/${userId}`),
  followUser: (userId) => axiosInstance.post(`/users/${userId}/follow`)
};

// Funciones para los servicios de tweets
const tweetService = {
  searchTweets: (query) => axiosInstance.get(`/tweets/search/${query}`),
  getAllTweets: () => axiosInstance.get('/tweets'),
  createTweet: (tweetData) => axiosInstance.post('/tweets', tweetData),
  editTweet: (tweetId, tweetData) => axiosInstance.put(`/tweets/${tweetId}`, tweetData),
  deleteTweet: (tweetId) => axiosInstance.delete(`/tweets/${tweetId}`),
  likeTweet: (tweetId) => axiosInstance.post(`/tweets/${tweetId}/like`),
  repostTweet: (tweetId) => axiosInstance.post(`/tweets/${tweetId}/repost`),
  getNotifications: () => axiosInstance.get('/tweets/notifications')
};

export { userService, tweetService };
