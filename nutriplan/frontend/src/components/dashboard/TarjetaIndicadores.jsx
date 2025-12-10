import "../../styles/dashboard.css";

/**
 * Calcula los indicadores según el objetivo del usuario.
 * Ya tienes funciones similares en TarjetaTotales; aquí simplificamos.
 */
function calcularIndicadores(usuario) {
  if (!usuario) return null;

  const peso = Number(usuario.peso || 0);
  const objetivoTexto = (usuario.objetivo || "").toLowerCase();

  if (!peso || peso <= 0) return null;

  let descripcion = "";
  let caloriasObjetivo = 2000;
  let proteinasObjetivo = Math.round(peso * 1.6);
  let grasasObjetivo = Math.round(peso * 0.9);

  if (objetivoTexto.includes("perder")) {
    caloriasObjetivo = Math.max(1200, (peso * 24) - 500);
    proteinasObjetivo = Math.round(peso * 2.0);
    grasasObjetivo = Math.round(peso * 0.8);
    descripcion = "Déficit calórico con alta proteína.";
  }

  if (objetivoTexto.includes("mantener")) {
    caloriasObjetivo = Math.round(peso * 24);
    proteinasObjetivo = Math.round(peso * 1.6);
    grasasObjetivo = Math.round(peso * 0.9);
    descripcion = "Balance calórico equilibrado.";
  }

  if (objetivoTexto.includes("ganar")) {
    caloriasObjetivo = Math.round((peso * 26) + 300);
    proteinasObjetivo = Math.round(peso * 2);
    grasasObjetivo = Math.round(peso * 1.0);
    descripcion = "Superávit calórico para desarrollar masa muscular.";
  }

  const caloriasProteina = proteinasObjetivo * 4;
  const caloriasGrasa = grasasObjetivo * 9;
  const caloriasRestantes = Math.max(0, caloriasObjetivo - (caloriasProteina + caloriasGrasa));
  const carbohidratosObjetivo = Math.round(caloriasRestantes / 4);

  return {
    descripcion,
    caloriasObjetivo,
    proteinasObjetivo,
    carbohidratosObjetivo,
    grasasObjetivo,
  };
}

export default function TarjetaIndicadores({ usuario }) {
  const indicadores = calcularIndicadores(usuario);

  if (!indicadores) return null;

  return (
    <div className="tarjeta tarjeta-indicadores">
      <h3 className="indicador-titulo">
        Indicadores para {usuario.objetivo}
      </h3>

      <div className="indicadores-grid">
        <div className="indicador-item">
          <span className="indicador-label">Calorías</span>
          <span className="indicador-value">{indicadores.caloriasObjetivo} cal</span>
          <span className="indicador-desc">Objetivo diario</span>
        </div>

        <div className="indicador-item">
          <span className="indicador-label">% Proteína</span>
          <span className="indicador-value">
            {Math.round(indicadores.proteinasObjetivo * 4 / indicadores.caloriasObjetivo * 100)}%
          </span>
        </div>

        <div className="indicador-item">
          <span className="indicador-label">% Carbohidratos</span>
          <span className="indicador-value">
            {Math.round(indicadores.carbohidratosObjetivo * 4 / indicadores.caloriasObjetivo * 100)}%
          </span>
        </div>

        <div className="indicador-item">
          <span className="indicador-label">% Grasas</span>
          <span className="indicador-value">
            {Math.round(indicadores.grasasObjetivo * 9 / indicadores.caloriasObjetivo * 100)}%
          </span>
        </div>
      </div>

      <div className="indicador-consejo">
        <strong>Consejo:</strong> {indicadores.descripcion}
      </div>
    </div>
  );
}
