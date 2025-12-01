// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import http from "../api/http.js";

export const AuthContext = createContext();

// 👉 Aquí exportamos AMBOS: default y named
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Cargar usuario si existe token
  useEffect(() => {
    const cargarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const res = await http.get("auth/me/");
        setUser(res.data);
      } catch (error) {
        console.error("No se pudo cargar el usuario:", error);
        localStorage.removeItem("token");
        setUser(null);
      }

      setCargando(false);
    };

    cargarUsuario();
  }, []);

  // LOGIN
  const login = async (correo, password) => {
    try {
      const res = await http.post("auth/login/", { correo, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      setUsuario(res.data.usuario);

      
      navigate("/dashboard");

      return { ok: true };
    } catch (error) {
      console.error("Error en login:", error);
      return { ok: false, mensaje: "Correo o contraseña incorrectos" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

// 👇 Export por defecto (para compatibilidad)
export default AuthProvider;
