import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000',
    //baseURL: 'https://fullstackpizzeria-back.onrender.com'
});
// En cualquier componente o archivo de configuración
console.log('Entire process.env:', process.env);
console.log('Specific env var:', process.env.REACT_APP_BACKEND_URL);
export default api;
