// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API ||
  (import.meta.env.DEV ? 'http://localhost:3500' : 'https://api.drakon-sports.com')

export default API_BASE_URL;
