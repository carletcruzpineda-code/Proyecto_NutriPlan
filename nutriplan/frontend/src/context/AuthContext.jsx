import { createContext, useContext, useEffect, useState } from "react";
import http from "../api/http";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    http
      .get("auth/me/")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setCargando(false));
  }, []);

  const login = async (correo, password) => {
    try {
      const resp = await http.post("auth/login/", { correo, password });
      localStorage.setItem("token", resp.data.access);
      setUser(resp.data.usuario);
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        mensaje: err.response?.data?.detail || "Credenciales incorrectas",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
