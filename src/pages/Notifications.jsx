import { useState, useEffect } from 'react';
import { tweetService } from './apiService';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await tweetService.getNotifications(token);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-4">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-center mb-4 p-2 bg-white rounded shadow-md">
            {notification.type === 'follow' && (
              <div className="mr-2">
                <i className="fas fa-user-plus"></i>
              </div>
            )}
            {notification.type === 'like' && (
              <div className="mr-2">
                <i className="fas fa-heart"></i>
              </div>
            )}
            {notification.type === 'repost' && (
              <div className="mr-2">
                <i className="fas fa-retweet"></i>
              </div>
            )}
            <div>
              <p className="text-gray-700">
                <span className="font-bold">@{notification.user.username}</span> {notification.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
