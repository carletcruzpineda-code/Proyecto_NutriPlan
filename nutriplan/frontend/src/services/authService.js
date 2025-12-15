// src/services/authService.js

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";

export const authService = {
  saveAuthData(access, refresh, user) {
    if (access) {
      localStorage.setItem(ACCESS_TOKEN_KEY, access);
    }

    if (refresh) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    }

    if (user && typeof user === "object") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getUser() {
    const rawUser = localStorage.getItem(USER_KEY);

    // Nada guardado
    if (!rawUser || rawUser === "undefined") {
      return null;
    }

    try {
      return JSON.parse(rawUser);
    } catch (error) {
      console.warn("⚠️ Usuario corrupto en localStorage, limpiando...");
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  clearAuthData() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated() {
    return !!this.getAccessToken();
  },
};
