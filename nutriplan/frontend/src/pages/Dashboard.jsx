// src/pages/Dashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { usuario } = useContext(AuthContext);

  return (
    <div>
      <h2 className="mb-3">Dashboard</h2>

      <div className="mb-4">
        <p className="lead mb-1">
          Bienvenido, <strong>{usuario?.nombre}</strong>
        </p>
        <small className="text-muted">Correo: {usuario?.correo}</small>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Progreso</h5>
              <p className="card-text">
                Aquí mostraremos más adelante tus indicadores de progreso
                usando el endpoint <code>/indicadores/</code>.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Planes nutricionales</h5>
              <p className="card-text">
                Aquí podrás ver y gestionar tus planes de alimentación desde
                <code> /planes/</code>.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Artículos</h5>
              <p className="card-text">
                Más adelante conectamos esta sección con <code>/articulos/</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
