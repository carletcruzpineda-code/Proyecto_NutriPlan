import { useNavigate } from "react-router-dom";
import "../styles/info.css";

export default function InfoNutricional() {
  const navigate = useNavigate();

  const tips = [
    {
      icono: "🥒",
      titulo: "Hidratación Adecuada",
      etiqueta: "Hidratación",
      texto: "Bebe al menos 8 vasos de agua al día para mantener tu cuerpo hidratado y apoyar el metabolismo.",
    },
    {
      icono: "🍗",
      titulo: "Proteína en Cada Comida",
      etiqueta: "Proteínas",
      texto: "Incluye una fuente de proteína de calidad en cada comida para mantener la masa muscular y la saciedad.",
    },
    {
      icono: "🥕",
      titulo: "Verduras de Colores",
      etiqueta: "Vitaminas",
      texto: "Come verduras de diferentes colores para obtener vitaminas, minerales y antioxidantes.",
    },
    {
      icono: "🥑",
      titulo: "Grasas Saludables",
      etiqueta: "Grasas",
      texto: "Incluye fuentes de grasas saludables como aguacate, frutos secos y aceite de oliva en tu dieta diaria.",
    },
    {
      icono: "🌾",
      titulo: "Carbohidratos Complejos",
      etiqueta: "Carbohidratos",
      texto: "Elige carbohidratos complejos como avena, quinoa y batata para energía sostenida.",
    },
    {
      icono: "⚖️",
      titulo: "Control de Porciones",
      etiqueta: "Porciones",
      texto: "Usa tu mano como guía: palma para proteínas, puño para verduras, cuenco para carbohidratos.",
    },
  ];

  return (
    <div className="info-page">

      <button className="info-back" onClick={() => navigate("/dashboard")}>
        ← Volver al Dashboard
      </button>

      <h2 className="info-title">Información Nutricional 🥬</h2>
      <p className="info-subtitle">
        Consejos y ejercicios para alcanzar tus objetivos
      </p>

      {/* Tabs */}
      <div className="info-tabs">
        <button className="info-tab active">🍏 Consejos Nutricionales</button>
        <button className="info-tab">🏋️ Ejercicios Físicos</button>
      </div>

      {/* GRID */}
      <div className="info-grid">
        {tips.map((t, i) => (
          <div key={i} className="info-card">
            <div className="info-icon">{t.icono}</div>

            <div className="info-header">
              <h4>{t.titulo}</h4>
              <span className="info-tag">{t.etiqueta}</span>
            </div>

            <p className="info-text">{t.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
