// src/context/AuthContext.jsx

import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { loginService } from "../services/loginService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const storedUser = authService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setCargando(false);
  }, []);

  const login = async (correo, password) => {
    const usuario = await loginService(correo, password);
    setUser(usuario);
    return usuario;
  };

  const logout = () => {
    authService.clearAuthData();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cargando,
        loading: cargando,

        // 🔐 AUTH POR TOKEN (CLAVE)
        isAuthenticated: !!authService.getAccessToken(),

        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
