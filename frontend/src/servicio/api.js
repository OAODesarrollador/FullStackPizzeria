import axios from 'axios';

const api = axios.create({
    //baseURL: process.env.REACT_APP_BACKEND_URL 
    baseURL: 'https://fullstackpizzeria-back.onrender.com'
});
console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
export default api;
