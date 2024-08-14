import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todoapi-u0q4.onrender.com/api'
});

export default instance;
