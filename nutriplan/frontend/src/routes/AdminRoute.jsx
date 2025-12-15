// src/routes/AdminRoute.jsx

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const ctx = useContext(AuthContext);

  const loading = ctx?.cargando ?? ctx?.loading ?? false;
  const user = ctx?.user ?? null;
  const isAuthenticated = ctx?.isAuthenticated ?? !!user;

  if (loading) return <p>Cargando...</p>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const isAdmin = user?.usuario_tipo === "admin" || user?.is_staff === true;

  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
}
