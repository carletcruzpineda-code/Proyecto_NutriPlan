// src/pages/InfoNutricional.jsx
import { Link } from "react-router-dom";
import "./info.css";

export default function InfoNutricional() {
  const consejos = [
    {
      icono: "💧",
      titulo: "Hidratación Adecuada",
      categoria: "Hidratación",
      texto: "Bebe al menos 8 vasos de agua al día para mantener tu cuerpo hidratado y apoyar el metabolismo.",
    },
    {
      icono: "🍗",
      titulo: "Proteína en Cada Comida",
      categoria: "Proteínas",
      texto: "Incluye una fuente de proteína de calidad en cada comida para mantener la masa muscular y la saciedad.",
    },
    {
      icono: "🥦",
      titulo: "Verduras de Colores",
      categoria: "Vitaminas",
      texto: "Come verduras de diferentes colores para obtener una variedad de vitaminas, minerales y antioxidantes.",
    },
    {
      icono: "🥑",
      titulo: "Grasas Saludables",
      categoria: "Grasas",
      texto: "Incluye fuentes de grasas saludables como aguacate, nueces y aceite de oliva en tu dieta diaria.",
    },
    {
      icono: "🌾",
      titulo: "Carbohidratos Complejos",
      categoria: "Carbohidratos",
      texto: "Elige carbohidratos complejos como avena, quinoa y batata para energía sostenida.",
    },
    {
      icono: "✋",
      titulo: "Control de Porciones",
      categoria: "Porciones",
      texto: "Usa tu mano como guía: palma para proteínas, puño para verduras y cuenco para carbohidratos.",
    }
  ];

  const ejercicios = [
    {
      icono: "🚶‍♂️",
      titulo: "Caminata Rápida",
      categoria: "Cardio",
      texto: "Realiza 30 minutos de caminata rápida para mejorar tu resistencia cardiovascular.",
    },
    {
      icono: "🏋️‍♂️",
      titulo: "Fuerza Básica",
      categoria: "Fuerza",
      texto: "Haz ejercicios simples como sentadillas, planchas y flexiones para fortalecer tus músculos.",
    },
    {
      icono: "🧘‍♀️",
      titulo: "Estiramiento",
      categoria: "Flexibilidad",
      texto: "Incluye estiramientos diarios para mejorar la movilidad y reducir tensiones.",
    },
  ];

  return (
    <div className="container py-4">

      {/* VOLVER */}
      <Link to="/dashboard" className="btn btn-sm btn-outline-secondary mb-3">
        ← Volver al Dashboard
      </Link>

      {/* TÍTULO */}
      <h2 className="fw-bold text-success">Información Nutricional 🥗</h2>
      <p className="text-muted">Consejos y ejercicios para alcanzar tus objetivos</p>

      {/* TABS */}
      <ul className="nav nav-tabs mt-4" id="infoTabs">
        <li className="nav-item">
          <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#tab1">
            🍏 Consejos Nutricionales
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#tab2">
            🏋️‍♂️ Ejercicios Físicos
          </button>
        </li>
      </ul>

      {/* CONTENIDO DE TABS */}
      <div className="tab-content mt-4">

        {/* TAB 1 */}
        <div className="tab-pane fade show active" id="tab1">
          <div className="row g-4">
            {consejos.map((c, i) => (
              <div className="col-md-4" key={i}>
                <div className="card shadow-sm p-3 info-card">
                  <div className="icon-box">{c.icono}</div>
                  <h5 className="fw-bold">{c.titulo}</h5>
                  <span className="badge bg-light text-dark mb-2">{c.categoria}</span>
                  <p className="text-muted">{c.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TAB 2 */}
        <div className="tab-pane fade" id="tab2">
          <div className="row g-4">
            {ejercicios.map((e, i) => (
              <div className="col-md-4" key={i}>
                <div className="card shadow-sm p-3 info-card">
                  <div className="icon-box">{e.icono}</div>
                  <h5 className="fw-bold">{e.titulo}</h5>
                  <span className="badge bg-light text-dark mb-2">{e.categoria}</span>
                  <p className="text-muted">{e.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
