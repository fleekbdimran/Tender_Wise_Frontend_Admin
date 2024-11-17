import axios from 'axios';
const ApiClient = axios.create({
  baseURL: 'http://192.168.0.229:9009/api/v1',
  
});

// Request interceptor
ApiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    console.log("Token stored api client:", token); // Debug log
    
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

export default ApiClient;



// import axios from 'axios';

// // Create an instance of axios
// const ApiClient = axios.create({
//   baseURL: 'http://192.168.0.229:9009/api/v1',
// });

// // Request interceptor to add token to all requests
// ApiClient.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token'); // Consistent key for token storage
//     console.log("token stored:", token)
//     if (token) {
//       // config.headers.Authorization = `Bearer ${token}`;
//    //config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXFiYWwiLCJlbWFpbCI6ImlxYmFsLmZsZWVrYmQ4NUBnbWFpbC5jb20iLCJwaG9uZSI6IjAxOTk2MTA1MDIwIiwic3RhdHVzIjoxLCJ1cGRhdGVkX2J5Ijo2LCJpZCI6NiwidHlwZSI6InN1cGVyLWFkbWluIiwiaWF0IjoxNzMxNDk2MTcxLCJleHAiOjE3MzE1ODI1NzF9.-hk0bw2u6kwicLoUjStPnY1hKaLzc93sjjHKi2j4gnQ`
//       config.headers.set("authorization", `Bearer ${token}`);
//       console.log('Authorization header set:', config.headers.Authorization);
//     } else {
//       console.warn('No token found, request may be unauthorized.');
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// // Response interceptor to handle responses
// ApiClient.interceptors.response.use(
//   response => response, // Return the response if successful
//   error => {
//     if (error.response && error.response.status === 401) {
//       console.log('Unauthorized, redirecting to login...');
//       localStorage.removeItem('token'); // Clear the token

//       // Optionally navigate to login if inside a React component (pseudo-code)
//       // const navigate = useNavigate();
//       // navigate('/dashboard');

//       // Return a rejected promise to handle in components
//       return Promise.reject(error);
//     }
//     return Promise.reject(error);
//   }
// );

// export default ApiClient;









