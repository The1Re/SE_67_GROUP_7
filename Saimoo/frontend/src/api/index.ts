import axios from 'axios';
import { env } from '../config';

const api = axios.create({
    baseURL: env.API_URL + '/api',
    headers: {
      'Content-Type': 'application/json',
    },
});

export default api;