const DEFAULT_API_BASE = import.meta.env.PROD
  ? 'https://portfolio-backend-4q6q.onrender.com/api'
  : 'http://localhost:8080/api';

export const API_BASE = import.meta.env.VITE_API_BASE || DEFAULT_API_BASE;
