// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import http from "../api/http.js";

// Componentes del dashboard
import HeaderDashboard from "../components/dashboard/HeaderDashboard.jsx";
import TarjetaTotales from "../components/dashboard/TarjetaTotales.jsx";
import GraficoCalorias from "../components/dashboard/GraficoCalorias.jsx";
import GraficoMacros from "../components/dashboard/GraficoMacros.jsx";
import ListaComidas from "../components/dashboard/ListaComidas.jsx";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [indicadores, setIndicadores] = useState(null);

  useEffect(() => {
    cargarIndicadores();
  }, []);

  const cargarIndicadores = async () => {
    try {
      const resp = await http.get("indicadores/");
      // si tu API devuelve lista, tomamos el primero
      const data = Array.isArray(resp.data) ? resp.data[0] : resp.data;
      setIndicadores(data);
    } catch (error) {
      console.error("Error cargando indicadores:", error);
    }
  };

  return (
    <div className="dash-container">
      <HeaderDashboard />

      <div className="dash-grid">
        <div className="dash-main">
          <TarjetaTotales data={indicadores} />
          <GraficoCalorias data={indicadores} />
          <GraficoMacros data={indicadores} />
        </div>

        <div className="dash-side">
          <ListaComidas />
        </div>
      </div>
    </div>
  );
}
