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

import jsPDF from "jspdf";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [indicadores, setIndicadores] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarIndicadores = async () => {
    try {
      const res = await http.get("indicadores/");
      setIndicadores(res.data);
    } catch (error) {
      console.error("Error cargando indicadores:", error);
    }
  };

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

  const handleComidaAgregada = (nuevoRegistro) => {
    setRegistros((prev) => [nuevoRegistro, ...prev]);
    setMostrarModal(false);
  };

  const descargarPlanNutricional = () => {
    if (!user) return;

    const peso = Number(user.peso || 0);
    const objetivo = user.objetivo || "No definido";
    const altura = Number(user.altura || 0);
    const edad = Number(user.edad || 0);

    let calorias = 2000;
    let proteinas = Math.round(peso * 1.6);
    let grasas = Math.round(peso * 0.9);
    let descripcion = "";

    if (objetivo.toLowerCase().includes("perder")) {
      calorias = Math.round(peso * 24 - 500);
      proteinas = Math.round(peso * 2.0);
      grasas = Math.round(peso * 0.8);
      descripcion = "Plan basado en déficit calórico y alta proteína.";
    }

    if (objetivo.toLowerCase().includes("mantener")) {
      calorias = Math.round(peso * 24);
      descripcion = "Plan equilibrado para mantener tu peso actual.";
    }

    if (objetivo.toLowerCase().includes("ganar")) {
      calorias = Math.round(peso * 26 + 300);
      proteinas = Math.round(peso * 2.0);
      grasas = Math.round(peso * 1.0);
      descripcion = "Plan enfocado en superávit calórico y aumento muscular.";
    }

    const caloriasProteina = proteinas * 4;
    const caloriasGrasa = grasas * 9;
    const carbohidratos = Math.round(
      (calorias - caloriasProteina - caloriasGrasa) / 4
    );

    const doc = new jsPDF();

    doc.setFillColor(20, 20, 28);
    doc.rect(0, 0, 220, 25, "F");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("Plan Nutricional Personalizado", 15, 17);

    let y = 40;

    doc.setFontSize(14);
    doc.setTextColor(60, 190, 140);
    doc.text("Datos del Usuario", 15, y);
    y += 10;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    doc.text(`Nombre: ${user.nombre}`, 15, y); y += 6;
    doc.text(`Correo: ${user.correo}`, 15, y); y += 6;
    doc.text(`Edad: ${edad} años`, 15, y); y += 6;
    doc.text(`Género: ${user.genero || "No especificado"}`, 15, y); y += 6;
    doc.text(`Peso: ${peso} kg`, 15, y); y += 6;
    doc.text(`Altura: ${altura} cm`, 15, y); y += 6;
    doc.text(`Objetivo: ${objetivo}`, 15, y); y += 10;

    doc.setFontSize(14);
    doc.setTextColor(60, 190, 140);
    doc.text("Metas Nutricionales Diarias", 15, y);
    y += 10;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    doc.text(`Calorías diarias: ${calorias} kcal`, 15, y); y += 6;
    doc.text(`Proteínas: ${proteinas} g`, 15, y); y += 6;
    doc.text(`Carbohidratos: ${carbohidratos} g`, 15, y); y += 6;
    doc.text(`Grasas: ${grasas} g`, 15, y); y += 10;

    doc.setFontSize(14);
    doc.setTextColor(60, 190, 140);
    doc.text("Recomendación General", 15, y);
    y += 10;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(descripcion, 15, y);

    doc.save("Plan_Nutricional.pdf");
  };

  return (
    <div className="np-shell">
      <div className="container py-4">
        {/* TOP BAR */}
        <div className="np-topbar">
          <div className="np-topbar-left">
            <div className="np-kicker">NutriPlan</div>
            <div className="np-title">
              Dashboard <span className="np-muted">/ {user?.nombre || "Usuario"}</span>
            </div>
          </div>

          <div className="np-topbar-actions">
            <button className="np-btn np-btn-ghost" onClick={descargarPlanNutricional}>
              ⬇ Descargar Plan
            </button>
            <button className="np-btn np-btn-primary" onClick={() => setMostrarModal(true)}>
              + Añadir Comida
            </button>
          </div>
        </div>

        {/* HEADER ORIGINAL (NO TOCADO) */}
        <div className="np-section np-header-wrap">
          <HeaderDashboard nombre={user?.nombre || "Usuario"} />
        </div>

        {/* RESUMEN */}
        <div className="np-section">
          <div className="np-section-head">
            <h2 className="np-h2">Resumen de hoy</h2>
            <p className="np-p">Calorías, macros y progreso según tu objetivo.</p>
          </div>

          <div className="np-grid-3">
            <div className="np-card">
              <TarjetaTotales registros={registros} usuario={user} />
            </div>

            <div className="np-card">
              <TarjetaObjetivo usuario={user} indicadores={indicadores} />
            </div>

            <div className="np-card">
              <TarjetaIndicadores usuario={user} />
            </div>
          </div>
        </div>

        {/* GRAFICOS */}
        <div className="np-section">
          <div className="np-section-head">
            <h2 className="np-h2">Gráficos</h2>
            <p className="np-p">Visualiza tu consumo y distribución de macros.</p>
          </div>

          <div className="np-grid-2">
            <div className="np-card np-card-tall">
              <GraficoCalorias registros={registros} />
            </div>
            <div className="np-card np-card-tall">
              <GraficoMacros registros={registros} />
            </div>
          </div>
        </div>

        {/* COMIDAS */}
        <div className="np-section">
          <div className="np-section-head">
            <h2 className="np-h2">Comidas registradas</h2>
            <p className="np-p">Edita o elimina registros cuando lo necesites.</p>
          </div>

          <div className="np-card">
            <ListaComidas registros={registros} />
          </div>
        </div>

        {/* MODAL AGREGAR */}
        {mostrarModal && (
          <div className="modal-overlay">
            <div className="np-modal">
              <button className="np-modal-close" onClick={() => setMostrarModal(false)}>
                ✕
              </button>

              <div className="np-modal-head">
                <div className="np-h2" style={{ margin: 0 }}>Añadir comida</div>
                <div className="np-p" style={{ margin: 0 }}>
                  Busca un alimento y registra tu cantidad.
                </div>
              </div>

              <div className="np-modal-body">
                <AgregarComida onComidaAgregada={handleComidaAgregada} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
