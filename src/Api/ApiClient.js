
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create an instance of axios
const ApiClient = axios.create({
  baseURL: 'http://192.168.0.229:9009/api',
});

// Request interceptor to add token to all requests
ApiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('Bearer'); // Consistent key for token storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers.Authorization);
    } else {
      console.warn('No token found, request may be unauthorized.');
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor to handle responses
ApiClient.interceptors.response.use(
  response => response, // Return the response if successful
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, redirecting to login...');
      localStorage.removeItem('Bearer'); // Clear the token

      // Optionally navigate to login if inside a React component (pseudo-code)
      const navigate = useNavigate();
      navigate('/dashboard');

      // Return a rejected promise to handle in components
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default ApiClient;









