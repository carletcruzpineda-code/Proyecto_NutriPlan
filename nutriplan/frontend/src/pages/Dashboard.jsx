import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import http from "../api/http";

import HeaderDashboard from "../components/dashboard/HeaderDashboard";
import TarjetaTotales from "../components/dashboard/TarjetaTotales";
import TarjetaObjetivo from "../components/dashboard/TarjetaObjetivo";
import TarjetaIndicadores from "../components/dashboard/TarjetaIndicadores";
import GraficoCalorias from "../components/dashboard/GraficoCalorias";
import GraficoMacros from "../components/dashboard/GraficoMacros";
import ListaComidas from "../components/dashboard/ListaComidas";
import AgregarComida from "./AgregarComida";

import jsPDF from "jspdf"; // 🔥 IMPORTANTE PARA GENERAR PDF
import "../styles/dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [indicadores, setIndicadores] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  // ============================================
  // CARGA INDICADORES
  // ============================================
  const cargarIndicadores = async () => {
    try {
      const res = await http.get("indicadores/");
      setIndicadores(res.data);
    } catch (error) {
      console.error("Error cargando indicadores:", error);
    }
  };

  // ============================================
  // CARGA REGISTROS DE CONSUMO
  // ============================================
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

  // ============================================
  // AGREGAR COMIDA
  // ============================================
  const handleComidaAgregada = (nuevoRegistro) => {
    setRegistros((prev) => [nuevoRegistro, ...prev]);
    setMostrarModal(false);
  };

  // ============================================
  //  DESCARGAR PLAN NUTRICIONAL (PDF)
  // ============================================
 const descargarPlanNutricional = () => {
  if (!user) return;

  const peso = Number(user.peso || 0);
  const objetivo = user.objetivo || "No definido";
  const altura = Number(user.altura || 0);
  const edad = Number(user.edad || 0);

  // Cálculos nutricionales
  let calorias = 2000;
  let proteinas = Math.round(peso * 1.6);
  let grasas = Math.round(peso * 0.9);
  let descripcion = "";

  if (objetivo.toLowerCase().includes("perder")) {
    calorias = Math.round((peso * 24) - 500);
    proteinas = Math.round(peso * 2.0);
    grasas = Math.round(peso * 0.8);
    descripcion = "Plan basado en déficit calórico y alta proteína.";
  }

  if (objetivo.toLowerCase().includes("mantener")) {
    calorias = Math.round(peso * 24);
    descripcion = "Plan equilibrado para mantener tu peso actual.";
  }

  if (objetivo.toLowerCase().includes("ganar")) {
    calorias = Math.round((peso * 26) + 300);
    proteinas = Math.round(peso * 2.0);
    grasas = Math.round(peso * 1.0);
    descripcion = "Plan enfocado en superávit calórico y aumento muscular.";
  }

  const caloriasProteina = proteinas * 4;
  const caloriasGrasa = grasas * 9;
  const carbohidratos = Math.round(
    (calorias - caloriasProteina - caloriasGrasa) / 4
  );

  // ===========================
  // CREAR PDF
  // ===========================
  const doc = new jsPDF();

  // Encabezado
  doc.setFillColor(200, 255, 220);
  doc.rect(0, 0, 220, 25, "F");
  doc.setFontSize(20);
  doc.setTextColor(20, 100, 60);
  doc.text("Plan Nutricional Personalizado", 15, 17);

  let y = 40;

  // ===========================
  // DATOS DEL USUARIO
  // ===========================
  doc.setFontSize(16);
  doc.setTextColor(30, 85, 50);
  doc.text("Datos del Usuario", 15, y);
  y += 8;
  doc.setDrawColor(140, 200, 160);
  doc.line(15, y, 195, y);
  y += 10;

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  doc.text(`Nombre: ${user.nombre}`, 15, y); y += 6;
  doc.text(`Correo: ${user.correo}`, 15, y); y += 6;
  doc.text(`Edad: ${edad} años`, 15, y); y += 6;
  doc.text(`Género: ${user.genero || "No especificado"}`, 15, y); y += 6;
  doc.text(`Peso: ${peso} kg`, 15, y); y += 6;
  doc.text(`Altura: ${altura} cm`, 15, y); y += 6;
  doc.text(`Objetivo: ${objetivo}`, 15, y); y += 6;

  if (user.condicion_medica) {
    doc.text(`Condiciones médicas: ${user.condicion_medica}`, 15, y);
    y += 6;
  }
  if (user.alergia) {
    doc.text(`Alergias: ${user.alergia}`, 15, y);
    y += 6;
  }

  y += 10;

  // ===========================
  // METAS DIARIAS
  // ===========================
  doc.setFontSize(16);
  doc.setTextColor(30, 85, 50);
  doc.text("Metas Nutricionales Diarias", 15, y);
  y += 8;

  doc.setDrawColor(140, 200, 160);
  doc.line(15, y, 195, y);
  y += 12;

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  doc.text(`Calorías diarias: ${calorias} kcal`, 15, y); y += 6;
  doc.text(`Proteínas: ${proteinas} g`, 15, y); y += 6;
  doc.text(`Carbohidratos: ${carbohidratos} g`, 15, y); y += 6;
  doc.text(`Grasas: ${grasas} g`, 15, y); y += 12;

  // ===========================
  // RECOMENDACIÓN
  // ===========================
  doc.setFontSize(16);
  doc.setTextColor(30, 85, 50);
  doc.text("Recomendación General", 15, y);
  y += 8;

  doc.setDrawColor(140, 200, 160);
  doc.line(15, y, 195, y);
  y += 12;

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(descripcion, 15, y);

  // Descargar
  doc.save("Plan_Nutricional.pdf");
};



  // ============================================
  // UI
  // ============================================
  return (
    <div className="dashboard-container">

      {/* ---------------------- BOTÓN DESCARGAR PLAN ----------------------- */}
      <div className="dashboard-top-actions">
        <button className="btn-plan" onClick={descargarPlanNutricional}>
          ⬇ Descargar Plan Nutricional
        </button>
      </div>

      {/* ---------------------- HEADER ----------------------- */}
      <HeaderDashboard nombre={user?.nombre || "Usuario"} />

      <div className="dashboard-content">

        {/* ---------------------- TARJETAS ----------------------- */}
        <div className="dashboard-cards">
          <TarjetaTotales registros={registros} usuario={user} />
          <TarjetaObjetivo usuario={user} indicadores={indicadores} />
          <TarjetaIndicadores usuario={user} />
        </div>

        {/* ---------------------- GRAFICOS ----------------------- */}
        <div className="dashboard-graficos">
          <GraficoCalorias registros={registros} />
          <GraficoMacros registros={registros} />
        </div>

        {/* ---------------------- LISTA DE COMIDAS ----------------------- */}
        <ListaComidas registros={registros} />

        {/* ---------------------- BOTÓN AGREGAR ----------------------- */}
        <button
          className="boton-agregar-comida"
          onClick={() => setMostrarModal(true)}
        >
          + Añadir Comida
        </button>
      </div>

      {/* ---------------------- MODAL AGREGAR ----------------------- */}
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
