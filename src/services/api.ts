import axios from 'axios';

const api = axios.create({
  baseURL: 'http://161.35.119.88:3333',
});
export default api;
