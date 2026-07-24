// src/lib/axios.ts
// Public-facing Axios instance — no auth token required for portfolio data
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-api-gxrq.onrender.com/api/v1';

export const publicApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export default publicApi;
