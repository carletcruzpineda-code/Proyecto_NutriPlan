// src/services/loginService.js

import api from "../api/http";
import { authService } from "./authService";

export const loginService = async (correo, password) => {
  const response = await api.post("/auth/login/", {
    correo,
    password,
  });

  // tu backend devuelve "usuario"
  const { access, refresh, usuario } = response.data;

  authService.saveAuthData(access, refresh, usuario);

  return usuario;
};
