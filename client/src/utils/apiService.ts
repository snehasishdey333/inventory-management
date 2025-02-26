// utils/apiService.js
import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

// Create an axios instance for making requests
const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL, // set your API base URL here
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Fetch the current auth session
      const session = await fetchAuthSession();
      const { accessToken } = session.tokens ?? {};
      
      // If an access token exists, attach it to the Authorization header
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      
      return config;
    } catch (error) {
      console.error('Error fetching session for authorization:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
