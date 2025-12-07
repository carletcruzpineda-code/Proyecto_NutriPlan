// src/components/dashboard/TarjetaObjetivo.jsx

import "../../styles/dashboard.css";


export default function TarjetaObjetivo({ usuario, indicadores }) {
  // ===============================
  // DATOS DEL USUARIO
  // ===============================
  const objetivo = usuario?.objetivo || "Sin objetivo definido";
  const pesoInicial = Number(usuario?.peso || 0);
  const altura = Number(usuario?.altura || 0);

  // ===============================
  // INDICADOR MÁS RECIENTE
  // ===============================
  const indicador = indicadores?.length > 0 ? indicadores[0] : null;

  const pesoActual = indicador?.peso_actual
    ? Number(indicador.peso_actual)
    : pesoInicial;

  const imcActual = indicador?.imc
    ? Number(indicador.imc)
    : altura > 0
    ? (pesoInicial / ((altura / 100) ** 2)).toFixed(2)
    : "N/A";

  const caloriasDiarias = indicador?.calorias_consumidas
    ? Number(indicador.calorias_consumidas)
    : 0;

  // ===============================
  // PROGRESO
  // ===============================
  const diferenciaPeso = pesoInicial - pesoActual;

  let mensajeProgreso = "Aún no hay suficiente información.";
  if (indicador) {
    if (diferenciaPeso > 0) {
      mensajeProgreso = `Has bajado ${diferenciaPeso.toFixed(1)} kg desde tu inicio.`;
    } else if (diferenciaPeso < 0) {
      mensajeProgreso = `Has subido ${Math.abs(diferenciaPeso).toFixed(1)} kg desde tu inicio.`;
    } else {
      mensajeProgreso = "Tu peso se mantiene estable.";
    }
  }

  return (
    <div className="tarjeta tarjeta-objetivo">
      <h3>Tu Objetivo</h3>

      <div className="objetivo-info">
        <p><strong>Meta:</strong> {objetivo}</p>
        <p><strong>Peso actual:</strong> {pesoActual} kg</p>
        <p><strong>IMC:</strong> {imcActual}</p>
      </div>

      <div className="progreso-info">
        <h4>Progreso</h4>
        <p>{mensajeProgreso}</p>
        <p><strong>Calorías consumidas hoy:</strong> {caloriasDiarias} kcal</p>
      </div>
    </div>
  );
}
