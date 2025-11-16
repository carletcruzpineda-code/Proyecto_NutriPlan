// src/components/MainLayout.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function MainLayout({ children }) {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand">NutriPlan</span>
          <div className="d-flex align-items-center gap-3 text-white">
            {usuario && (
              <span className="small">
                {usuario.nombre} ({usuario.correo})
              </span>
            )}
            <button
              className="btn btn-outline-light btn-sm"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="container py-4">{children}</main>
    </div>
  );
}
