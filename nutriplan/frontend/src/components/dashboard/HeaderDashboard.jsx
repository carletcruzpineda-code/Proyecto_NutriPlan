import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/dashboard.css";

export default function HeaderDashboard({ nombre }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (confirm("¿Deseas cerrar sesión?")) {
      logout();
      window.location.href = "/login";
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="dashboard-title">Bienvenido, {nombre}</h1>
        <p className="dashboard-subtitle">Tu progreso, tu bienestar</p>
      </div>

      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}
