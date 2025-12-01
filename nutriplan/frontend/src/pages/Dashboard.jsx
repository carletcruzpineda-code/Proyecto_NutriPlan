// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import http from "../api/http.js";

import HeaderDashboard from "../components/dashboard/HeaderDashboard";
import TarjetaTotales from "../components/dashboard/TarjetaTotales";
import GraficoCalorias from "../components/dashboard/GraficoCalorias";
import GraficoMacros from "../components/dashboard/GraficoMacros";
import ListaComidas from "../components/dashboard/ListaComidas";
import AgregarComida from "./AgregarComida";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [indicadores, setIndicadores] = useState(null);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);

  useEffect(() => {
    cargarIndicadores();
  }, []);

  const cargarIndicadores = async () => {
    try {
      const resp = await http.get("indicadores/");
      const data = Array.isArray(resp.data) ? resp.data[0] : resp.data;
      setIndicadores(data);
    } catch (error) {
      console.error("Error cargando indicadores:", error);
    }
  };

  const abrirFormulario = () => setMostrarAgregar(true);
  const cerrarFormulario = () => {
    setMostrarAgregar(false);
  };

  return (
    <div className="dash-container">
      <HeaderDashboard />

      <div className="dash-grid">
        {/* LADO IZQUIERDO */}
        <div className="dash-main">
          <TarjetaTotales data={indicadores} />
          <GraficoCalorias data={indicadores} />
          <GraficoMacros data={indicadores} />
        </div>

        {/* LADO DERECHO */}
        <div className="dash-side">
          <ListaComidas onAgregarComida={abrirFormulario} />
        </div>
      </div>

      {/* ================================
            MODAL PARA AGREGAR COMIDA
      ================================== */}
      {mostrarAgregar && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button className="modal-cerrar" onClick={cerrarFormulario}>
              X
            </button>

            <AgregarComida onComidaAgregada={cerrarFormulario} />
          </div>
        </div>
      )}
    </div>
  );
}
