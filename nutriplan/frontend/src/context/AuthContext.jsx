import { createContext, useState, useEffect } from "react";
import api from "../api/http.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      setCargando(false);
      return;
    }

    api
      .get("auth/me/")
      .then((res) => {
        setUsuario(res.data);
      })
      .catch(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUsuario(null);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const login = async (correo, password) => {
    try {
      const res = await api.post("auth/login/", { correo, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      setUsuario(res.data.usuario);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.response?.data?.error || "Error al iniciar sesión",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
