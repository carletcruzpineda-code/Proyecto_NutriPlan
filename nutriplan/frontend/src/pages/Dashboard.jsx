import { useState, useEffect } from "react";
import api from "../api/http";

// Importar componentes
import HeaderDashboard from "../components/dashboard/HeaderDashboard";
import TarjetaTotales from "../components/dashboard/TarjetaTotales";
import GraficoCalorias from "../components/dashboard/GraficoCalorias";
import GraficoMacros from "../components/dashboard/GraficoMacros";
import ListaComidas from "../components/dashboard/ListaComidas";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [indicadores, setIndicadores] = useState(null);

  useEffect(() => {
    cargarIndicadores();
  }, []);

  const cargarIndicadores = async () => {
    try {
      const resp = await api.get("indicadores/");
      setIndicadores(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <HeaderDashboard />

      {/* BOTONES PRINCIPALES */}
      <div className="dash-buttons">
        <a href="/info" className="btn btn-outline-success">
          📘 Información Nutricional
        </a>

        <a href="/agregar-comida" className="btn btn-success">
          ➕ Agregar Comida
        </a>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="dash-grid">
        <TarjetaTotales data={indicadores} />
        <GraficoMacros />
        <GraficoCalorias />
        <ListaComidas />
      </div>
    </div>
  );
}
