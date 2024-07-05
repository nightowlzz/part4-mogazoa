import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://mogazoa-api.vercel.app';
const TEAM_ID = '5-6';
const token = localStorage.getItem('Token');

const instance: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/${TEAM_ID}/`,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export default instance;