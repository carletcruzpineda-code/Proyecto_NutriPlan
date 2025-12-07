// src/pages/Dashboard.jsx

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import http from "../api/http";

import HeaderDashboard from "../components/dashboard/HeaderDashboard";
import TarjetaTotales from "../components/dashboard/TarjetaTotales";
import TarjetaObjetivo from "../components/dashboard/TarjetaObjetivo";
import GraficoCalorias from "../components/dashboard/GraficoCalorias";
import GraficoMacros from "../components/dashboard/GraficoMacros";
import ListaComidas from "../components/dashboard/ListaComidas";
import AgregarComida from "./AgregarComida";

import "../styles/dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [indicadores, setIndicadores] = useState([]);
  const [registros, setRegistros] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  // ============================================================
  // CARGAR INDICADORES
  // ============================================================
  const cargarIndicadores = async () => {
    try {
      const res = await http.get("indicadores/");
      setIndicadores(res.data);
    } catch (error) {
      console.error("Error cargando indicadores:", error);
    }
  };

  // ============================================================
  // CARGAR REGISTROS DE CONSUMO
  // ============================================================
  const cargarRegistros = async () => {
    try {
      const res = await http.get("registros/");
      setRegistros(res.data);
    } catch (error) {
      console.error("Error cargando registros:", error);
    }
  };

  useEffect(() => {
    cargarIndicadores();
    cargarRegistros();
  }, []);

  // Cuando agregas comida desde el modal
  const handleComidaAgregada = (nuevo) => {
    setRegistros((prev) => [nuevo, ...prev]);
    setMostrarModal(false);
  };

  return (
    <div className="dashboard-container">

      {/* ---------------------- HEADER ----------------------- */}
      <HeaderDashboard nombre={user?.nombre || "Usuario"} />

      <div className="dashboard-content">

        {/* ---------------------- TARJETAS ----------------------- */}
        <div className="dashboard-cards">
          <TarjetaTotales registros={registros} />
          <TarjetaObjetivo usuario={user} indicadores={indicadores} />
        </div>

        {/* ---------------------- GRAFICOS ----------------------- */}
        <div className="dashboard-graficos">
          <GraficoCalorias registros={registros} />
          <GraficoMacros registros={registros} />
        </div>

        {/* ---------------------- LISTA DE COMIDAS ----------------------- */}
        <ListaComidas registros={registros} />

        {/* ---------------------- BOTÓN AGREGAR COMIDA ----------------------- */}
        <button
          className="boton-agregar-comida"
          onClick={() => setMostrarModal(true)}
        >
          + Añadir Comida
        </button>
      </div>

      {/* ---------------------- MODAL DE AGREGAR ----------------------- */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>Agregar Comida</h3>

            <button
              className="cerrar-modal"
              onClick={() => setMostrarModal(false)}
            >
              X
            </button>

            <div className="modal-body">
              <AgregarComida onComidaAgregada={handleComidaAgregada} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
