import { useState } from "react";
import http from "../../api/http";
import "../../styles/dashboard.css";

export default function TarjetaObjetivo({ usuario, indicadores }) {

  if (!usuario) return null;

  const [mostrandoModal, setMostrandoModal] = useState(false);
  const [nuevoObjetivo, setNuevoObjetivo] = useState(usuario.objetivo);

  // ============================================
  // CALCULAR IMC + INTERPRETACIÓN
  // ============================================
  const peso = Number(usuario.peso || 0);
  const alturaM = Number(usuario.altura || 0) / 100;
  const imc = peso && alturaM ? (peso / (alturaM * alturaM)).toFixed(2) : "--";

  const interpretarIMC = () => {
    if (imc < 18.5) return "Bajo peso. Necesitas una alimentación más energética.";
    if (imc < 25) return "Peso saludable. ¡Sigue así!";
    if (imc < 30) return "Sobrepeso. Un plan balanceado puede ayudarte.";
    return "Obesidad. Un déficit calórico gradual es recomendable.";
  };

  // ============================================
  // CALCULAR PROGRESO CALÓRICO DEL DÍA
  // ============================================
  const caloriasConsumidasHoy = indicadores?.caloriasConsumidas || 0;
  const caloriasObjetivo = indicadores?.caloriasObjetivo || 0;

  const calcularMensajeProgreso = () => {
    if (!caloriasObjetivo) return "Aún no hay suficiente información.";

    const porcentaje = Math.round((caloriasConsumidasHoy / caloriasObjetivo) * 100);

    if (porcentaje < 100)
      return `Has consumido el ${porcentaje}% de tu objetivo diario.`;

    if (porcentaje === 100)
      return "Has alcanzado tu objetivo diario.";

    return `Has excedido tu objetivo por ${caloriasConsumidasHoy - caloriasObjetivo} kcal.`;
  };

  // ============================================
  // ACTUALIZAR OBJETIVO
  // ============================================
  const guardarObjetivo = async () => {
    try {
      await http.patch(`usuarios/${usuario.id}/`, { objetivo: nuevoObjetivo });
      usuario.objetivo = nuevoObjetivo; 
      setMostrandoModal(false);
    } catch (error) {
      console.error("Error actualizando objetivo:", error);
    }
  };

  return (
    <div className="tarjeta tarjeta-objetivo">

      <h3>Tu Objetivo</h3>

      <p><strong>Meta:</strong> {usuario.objetivo}</p>
      <p><strong>Peso actual:</strong> {peso} kg</p>
      <p><strong>IMC:</strong> {imc}</p>
      <p className="imc-interpretacion">{interpretarIMC()}</p>

      <h4>Progreso</h4>
      <p>{calcularMensajeProgreso()}</p>

      <br />

      {/* BOTÓN CAMBIAR OBJETIVO */}
      <button className="btn-cambiar-objetivo" onClick={() => setMostrandoModal(true)}>
        Cambiar objetivo
      </button>

      {/* ========= MODAL PARA CAMBIAR OBJETIVO ========= */}
      {mostrandoModal && (
        <div className="modal-overlay">
          <div className="modal-objetivo">

            <h3>Cambiar Objetivo</h3>

            <select
              value={nuevoObjetivo}
              onChange={(e) => setNuevoObjetivo(e.target.value)}
            >
              <option value="perder peso">Perder peso</option>
              <option value="mantenerme">Mantenerme</option>
              <option value="ganar masa muscular">Ganar masa muscular</option>
            </select>

            <div className="acciones-modal">
              <button onClick={() => setMostrandoModal(false)}>Cancelar</button>
              <button className="btn-guardar" onClick={guardarObjetivo}>
                Guardar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
