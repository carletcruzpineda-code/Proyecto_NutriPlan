// src/services/adminUserService.js

import api from "../api/http";

export const adminUserService = {
  async getUsers() {
    const res = await api.get("/admin/usuarios/");
    return res.data;
  },

  async deleteUser(id) {
    const res = await api.delete(`/admin/usuarios/${id}/`);
    return res.data;
  },

  async promoteUser(id) {
    const res = await api.patch(`/admin/usuarios/${id}/`, {
      usuario_tipo: "admin",
    });
    return res.data;
  },

  async updatePassword(id, newPassword) {
    const res = await api.post(`/admin/usuarios/${id}/password/`, {
      new_password: newPassword,
    });
    return res.data;
  },

  async updateObjetivo(id, objetivo) {
    const res = await api.patch(`/admin/usuarios/${id}/`, { objetivo });
    return res.data;
  },

  // 🔥 AQUÍ ESTÁ LA CLAVE
  async createAdmin(payload) {
    const res = await api.post("/usuarios/", {
      ...payload,
      usuario_tipo: "admin",
    });
    return res.data;
  },
};
