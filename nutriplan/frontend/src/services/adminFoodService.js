// src/services/adminFoodService.js

import api from "../api/http";

export const adminFoodService = {
  async getFoods() {
    const res = await api.get("/admin/alimentos/");
    return res.data;
  },

  async createFood(payload) {
    const res = await api.post("/admin/alimentos/", payload);
    return res.data;
  },

  async updateFood(id, payload) {
    const res = await api.patch(`/admin/alimentos/${id}/`, payload);
    return res.data;
  },

  async deleteFood(id) {
    const res = await api.delete(`/admin/alimentos/${id}/`);
    return res.data;
  },
};
