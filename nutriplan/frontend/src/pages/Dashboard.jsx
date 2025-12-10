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
  // CARGA INDICADORES
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
  // CARGA REGISTROS DE CONSUMO
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

  // Cuando agrego comida desde el modal
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
          {/* 👉 ahora pasamos también el usuario */}
          <TarjetaTotales registros={registros} usuario={user} />
          <TarjetaObjetivo usuario={user} indicadores={indicadores} />
        </div>

        {/* ---------------------- GRAFICOS ----------------------- */}
        <div className="dashboard-graficos">
          <GraficoCalorias registros={registros} />
          <GraficoMacros registros={registros} />
        </div>

        {/* ---------------------- MI LISTA DE COMIDAS ----------------------- */}
        <ListaComidas registros={registros} />

        {/* ---------------------- MI BOTÓN AGREGAR COMIDA ----------------------- */}
        <button
          className="boton-agregar-comida"
          onClick={() => setMostrarModal(true)}
        >
          + Añadir Comida
        </button>
      </div>

      {/* ---------------------- MODAL AGREGAR COMIDA ----------------------- */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
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
