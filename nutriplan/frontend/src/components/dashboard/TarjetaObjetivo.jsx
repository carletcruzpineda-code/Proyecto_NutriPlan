// src/components/dashboard/TarjetaObjetivo.jsx

import { useMemo, useState } from "react";
import "../../styles/dashboard.css";

export default function TarjetaObjetivo({ usuario, indicadores }) {
  if (!usuario) return null;

  const [mostrarInfo, setMostrarInfo] = useState(false);

  // =========================
  // DATOS DEL USUARIO
  // =========================
  const objetivo = usuario.objetivo || "No definido";
  const peso = Number(usuario.peso || 0);
  const alturaM = Number(usuario.altura || 0) / 100;

  // =========================
  // IMC
  // =========================
  const imc = useMemo(() => {
    if (!peso || !alturaM) return "N/A";
    return (peso / (alturaM * alturaM)).toFixed(2);
  }, [peso, alturaM]);

  const interpretarIMC = () => {
    if (imc === "N/A") return "Aún no hay suficiente información.";
    const v = Number(imc);
    if (v < 18.5) return "Bajo peso. Un plan nutricional puede ayudarte.";
    if (v < 25) return "Peso saludable. ¡Sigue así!";
    if (v < 30) return "Sobrepeso. Un plan balanceado puede ayudarte.";
    return "Obesidad. Te recomendamos consultar un especialista.";
  };

  // =========================
  // PROGRESO CALÓRICO
  // =========================
  const caloriasConsumidas = useMemo(() => {
    const item = indicadores?.find(
      (i) => i.tipo === "calorias_consumidas_hoy"
    );
    return item ? Number(item.valor) : 0;
  }, [indicadores]);

  const caloriasObjetivo = useMemo(() => {
    const item = indicadores?.find(
      (i) => i.tipo === "calorias_objetivo"
    );
    return item ? Number(item.valor) : 0;
  }, [indicadores]);

  const textoProgreso = () => {
    if (!caloriasObjetivo) return "Aún no hay suficiente información.";
    const porcentaje = Math.round(
      (caloriasConsumidas / caloriasObjetivo) * 100
    );
    if (porcentaje < 100)
      return `Has consumido el ${porcentaje}% de tu objetivo diario.`;
    if (porcentaje === 100) return "Has alcanzado tu objetivo diario.";
    return `Has excedido tu objetivo por ${
      caloriasConsumidas - caloriasObjetivo
    } kcal.`;
  };

  // =========================
  // RECOMENDACIONES (FRONTEND)
  // =========================
  const recomendaciones = {
    "Perder peso": [
      "Prioriza alimentos altos en fibra.",
      "Mantén un déficit calórico moderado.",
      "Evita bebidas azucaradas.",
    ],
    "Mantener peso": [
      "Mantén una dieta balanceada.",
      "Controla las porciones.",
      "Sigue activo diariamente.",
    ],
    "Ganar masa muscular": [
      "Aumenta el consumo de proteínas.",
      "Incluye entrenamiento de fuerza.",
      "No descuides el descanso.",
    ],
  };

  const tips = recomendaciones[objetivo] || [
    "Mantén hábitos saludables.",
    "Escucha a tu cuerpo.",
  ];

  return (
    <div className="tarjeta tarjeta-objetivo">
      <h3>Tu Objetivo</h3>

      <p>
        <strong>Meta:</strong> {objetivo}
      </p>
      <p>
        <strong>Peso actual:</strong> {peso || "N/A"} kg
      </p>
      <p>
        <strong>IMC:</strong> {imc}
      </p>
      <p className="imc-interpretacion">{interpretarIMC()}</p>

      <h4>Progreso</h4>
      <p>{textoProgreso()}</p>

      <button
        className="btn-cambiar"
        onClick={() => setMostrarInfo(true)}
      >
        Ver recomendaciones
      </button>

      {/* MODAL INFORMATIVO */}
      {mostrarInfo && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Recomendaciones</h4>

            <ul style={{ textAlign: "left", marginTop: "10px" }}>
              {tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>

            <div className="acciones-modal">
              <button onClick={() => setMostrarInfo(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
