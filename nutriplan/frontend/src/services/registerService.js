// src/services/registerService.js

import api from "../api/http";

export const registerService = async (formData) => {
  const response = await api.post("/usuarios/", formData);
  return response.data;
};
