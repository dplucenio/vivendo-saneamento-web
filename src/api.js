import axios from 'axios';

const api = axios.create({
  baseURL: process.env.GATSBY_BACKEND_BASEURL,
});

export default api;