// src/api/http.js

import axios from "axios";
import { authService } from "../services/authService";

const api = axios.create({
  // 🔥 AQUÍ ESTABA EL PROBLEMA
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Inyectar token en cada request
api.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🧯 Manejo básico de errores
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
