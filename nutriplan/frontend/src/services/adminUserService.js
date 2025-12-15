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

  async createAdmin({ nombre, correo, password }) {
    const res = await api.post("/admin/usuarios/crear-admin/", {
      nombre,
      correo,
      password,
    });
    return res.data;
  },

  async promoteUser(id) {
    const res = await api.patch(`/admin/usuarios/${id}/promote/`);
    return res.data;
  },

  // ✅ PARA CAMBIAR OBJETIVO DESDE ADMIN DASHBOARD
  async updateObjetivo(id, objetivo) {
    const res = await api.patch(`/admin/usuarios/${id}/update-objetivo/`, {
      objetivo,
    });
    return res.data;
  },
};
