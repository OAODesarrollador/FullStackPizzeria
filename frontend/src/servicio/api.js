import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL 
    
});
console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
export default api;
