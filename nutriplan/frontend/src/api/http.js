// src/api/http.js

import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// INTERCEPTOR → AGREGA TOKEN A TODAS LAS PETICIONES
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
// INTERCEPTOR DE RESPUESTAS → MANEJO DE ERRORES
// ============================================================
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró o no es válido → cerrar sesión
    if (error.response && error.response.status === 401) {
      console.warn("Token inválido o expirado. Cerrando sesión...");

      localStorage.removeItem("token");

      // Evita error en apps SPA cuando no estamos dentro del Router
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default http;
