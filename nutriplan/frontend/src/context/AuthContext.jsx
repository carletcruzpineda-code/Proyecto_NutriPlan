import { createContext, useEffect, useState } from "react";
import http from "../api/http";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  // ============================================================
  // CARGAR USUARIO DESDE LOCALSTORAGE AL ABRIR LA APP
  // ============================================================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    http
      .get("auth/me/")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  // ============================================================
  // LOGIN (GUARDA TOKEN + DATOS DE USUARIO)
  // ============================================================
  const login = async (correo, password) => {
    try {
      const res = await http.post("auth/login/", { correo, password });

      const token = res.data.access;
      const userData = res.data.usuario; // UsuarioSerializer → incluye todos los datos

      // Guardar token en localStorage
      localStorage.setItem("token", token);

      // Guardar usuario en estado
      setUser(userData);

      return { ok: true };
    } catch (error) {
      console.error("Error en login:", error);
      return { ok: false, error: "Credenciales incorrectas" };
    }
  };

  // ============================================================
  // LOGOUT (BORRA TOKEN Y USUARIO)
  // ============================================================
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ============================================================
  // PROVIDER
  // ============================================================
  return (
    <AuthContext.Provider
      value={{
        user,
        cargando,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
