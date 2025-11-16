import { createContext, useContext, useState, useEffect } from "react";
import http from "../api/http";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function login(correo, password) {
    try {
      const res = await http.post("auth/login/", { correo, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      setUsuario(res.data.usuario);

      // 🚀 DESPUÉS DEL LOGIN, IR AL DASHBOARD
      navigate("/dashboard");

      return true;
    } catch (error) {
      console.error("LOGIN ERROR:", error.response?.data || error);
      return false;
    }
  }

  function logout() {
    localStorage.clear();
    setUsuario(null);
    navigate("/");
  }

  useEffect(() => {
    const saved = localStorage.getItem("usuario");
    if (saved) setUsuario(JSON.parse(saved));
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
