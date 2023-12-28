import axios from 'axios';
import { APP_CONSTANTS } from './constants';

export const axiosInstance = axios.create({
  baseURL: APP_CONSTANTS.baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});
