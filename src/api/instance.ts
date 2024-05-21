import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.PUBLIC_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
