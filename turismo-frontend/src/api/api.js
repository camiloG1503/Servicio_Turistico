// turismo-frontend/src/api/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
  (config) => {
    // Siempre toma el token más reciente de localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Manejo de error 401 - No autorizado (token inválido o expirado)
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/login';
      }

      // Manejo de error 403 - Prohibido (no tiene permisos suficientes)
      if (error.response.status === 403) {
        console.error('No tienes permisos suficientes para acceder a este recurso');
        // Opcionalmente podríamos redirigir a una página de acceso denegado
        // window.location.href = '/acceso-denegado';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
