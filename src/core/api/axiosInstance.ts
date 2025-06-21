/**
 * axiosInstance.ts
 *
 * This file configures a central Axios instance for all API requests.
 * It includes interceptors to globally manage requests and responses.
 */
import axios from 'axios';

// Create a new Axios instance with a base configuration
const axiosInstance = axios.create({
  baseURL: '/api', // Base URL for all API requests
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interceptors ---

// Request Interceptor: Runs before each request is sent
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request configuration here.
    // For example, add an authentication token.
    console.log('Starting Request:', config.method?.toUpperCase(), config.url);
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Runs after a response is received
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    console.log('Response Received:', response.status, response.data);
    return response;
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    console.error('Response Error:', error.response?.status, error.message);
    // Example: Handle global 401 Unauthorized errors
    // if (error.response?.status === 401) {
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
