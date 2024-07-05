'use client'

import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://mogazoa-api.vercel.app';
const TEAM_ID = '5-6';

const instance: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/${TEAM_ID}/`
});

export default instance;