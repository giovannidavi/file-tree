import axios from 'axios';

export const API_BASE_PATH = 'http://localhost:8000/';

export const instance = axios.create({
  baseURL: API_BASE_PATH,
});
