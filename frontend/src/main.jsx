import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// Global: adaptive API URL (Development vs Production)
const API_BASE_URL = import.meta.env.PROD 
    ? 'https://DEIN-BACKEND-LINK.onrender.com' // <-- HIER kommt später dein Render-Link rein
    : ''; // In development, the Vite proxy handles this

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
