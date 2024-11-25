import axios from 'axios';
const ApiClient = axios.create({
  // baseURL: 'http://192.168.0.169:9009/api/v1',
  // baseURL: 'http://192.168.0.230:9009/api/v1',
  // baseURL: 'http://192.168.0.229:9009/api/v1',
  baseURL: 'http://192.168.0.230:9009/api/v1',

});

// Request interceptor
ApiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    console.log('Token stored api client:', token); // Debug log

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers.Authorization);
    } else {
      console.warn('No token found; request may be unauthorized.');
    }

    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
ApiClient.interceptors.response.use(
  response => response, // Return successful response
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, redirecting to login...');
      // Clear token on failure, you can also redirect here
      localStorage.removeItem('token');
      // Handle the redirection logic if needed
      // window.location.href = '/login';

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);