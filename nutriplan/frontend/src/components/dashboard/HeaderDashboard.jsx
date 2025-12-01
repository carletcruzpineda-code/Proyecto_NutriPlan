// src/components/dashboard/HeaderDashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function HeaderDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="dash-header">
      <div>
        <h2 className="dash-title">¡Hola, {user?.nombre}!</h2>
        <p className="dash-subtitle">
          Registra tus comidas y mantén un seguimiento de tu nutrición diaria
        </p>
      </div>

      <div className="dash-avatar">
        {user?.nombre?.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}
