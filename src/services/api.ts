import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/chatbot',
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const csrfToken = Cookies.get('csrftoken');
//   const sessionId = Cookies.get('sessionid');
  
//   if (csrfToken) {
//     config.headers['X-CSRFToken'] = csrfToken;
//   }
  
//   if (sessionId) {
//     config.headers['Authorization'] = `Session ${sessionId}`;
//   }
  
//   return config;
// });

export default api;