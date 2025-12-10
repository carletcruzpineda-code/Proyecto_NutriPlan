

import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
//  → CON ESTO AGREGO TOKEN A TODAS LAS PETICIONES
// ============================================================
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================================
//  → CON ESTO MANEJO  ERRORES
// ============================================================
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró o no es válido → Me cierra sesión :(
    if (error.response && error.response.status === 401) {
      console.warn("Token inválido o expirado. Cerrando sesión...");

      localStorage.removeItem("token");

      // Evita error en apps SPA cuando no estoy dentro del Router
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default http;
