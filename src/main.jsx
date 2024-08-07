import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SnackbarProvider } from 'notistack'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_PROXY_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Intercepter to attach the token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if(token){
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error)=>{
    return Promise.reject(error);
  }
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
)
