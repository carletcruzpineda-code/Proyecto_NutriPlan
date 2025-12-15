// src/routes/PrivateRoute.jsx

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const ctx = useContext(AuthContext);

  const loading = ctx?.cargando ?? ctx?.loading ?? false;
  const user = ctx?.user ?? null;
  const isAuthenticated = ctx?.isAuthenticated ?? !!user;

  // ✅ Nunca redirigir mientras se está cargando el estado
  if (loading) return <p>Cargando...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
