import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/http.js";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [indicadores, setIndicadores] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarIndicadores();
  }, []);

  const cargarIndicadores = async () => {
    try {
      const resp = await api.get("indicadores/");
      setIndicadores(resp.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      {/* Bienvenida */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">¡Hola, {user?.nombre}!</h2>
          <p className="text-muted">
            Registra tus comidas y mantén un seguimiento de tu nutrición diaria
          </p>
        </div>

        {/* Avatar con inicial */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#00a870",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          {user?.nombre?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Botones principales */}
      <div className="mb-4 d-flex gap-3">
        <a href="/info" className="btn btn-outline-success">
          📘 Información Nutricional
        </a>

        <button className="btn btn-success">
          ➕ Agregar Comida
        </button>
      </div>

      {/* Grid principal */}
      <div className="row g-4">

        {/* TARJETA PRINCIPAL TOT NUTRICIONALES */}
        <div className="col-12">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">Totales Nutricionales del Día</h5>
            <p className="text-muted">Balance nutricional equilibrado</p>

            {/* Indicadores numéricos */}
            <div className="row text-center mt-3">
              <div className="col-md-3">
                <h1 className="text-success">{indicadores?.calorias || 0}</h1>
                <p>Calorías</p>
              </div>
              <div className="col-md-3">
                <h1 className="text-warning">{indicadores?.proteinas || 0}</h1>
                <p>Proteínas</p>
              </div>
              <div className="col-md-3">
                <h1 className="text-primary">{indicadores?.carbohidratos || 0}</h1>
                <p>Carbohidratos</p>
              </div>
              <div className="col-md-3">
                <h1 className="text-danger">{indicadores?.grasas || 0}</h1>
                <p>Grasas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Distribución de Macronutrientes */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <h5 className="fw-bold">Distribución de Macronutrientes Hoy</h5>
            <p className="text-muted">Sin datos del día actual</p>
          </div>
        </div>

        {/* Gráfica 7 días */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <h5 className="fw-bold">Evolución de Calorías (7 días)</h5>
            <p className="text-muted">Gráfica vendrá aquí…</p>
          </div>
        </div>

        {/* Comidas del día */}
        <div className="col-12">
          <div className="card p-4 shadow-sm">
            <h5 className="fw-bold text-center mb-3">No hay comidas registradas</h5>
            <p className="text-center text-muted">
              ¡Empieza agregando tu primera comida del día!
            </p>
            <div className="text-center">
              <button className="btn btn-success">
                ➕ Agregar Primera Comida
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
