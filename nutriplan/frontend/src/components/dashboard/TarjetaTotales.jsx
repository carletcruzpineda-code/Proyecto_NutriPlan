import "../../styles/dashboard.css";

function calcularObjetivos(usuario) {
  if (!usuario) return null;

  const peso = Number(usuario.peso || 0);
  const objetivoTexto = (usuario.objetivo || "").toLowerCase();

  if (!peso || peso <= 0) return null;

  // Valores base
  let factorCalorias = 24;
  let ajuste = 0;
  let factorProteina = 1.6;
  let factorGrasa = 0.9;
  let descripcion = "";

  if (objetivoTexto.includes("perder")) {
    // Déficit calórico
    factorCalorias = 24;
    ajuste = -500;
    factorProteina = 2.0;
    factorGrasa = 0.8;
    descripcion = "Déficit calórico con alta proteína.";
  } else if (objetivoTexto.includes("mantener")) {
    // Mantenimiento
    factorCalorias = 24;
    ajuste = 0;
    factorProteina = 1.6;
    factorGrasa = 0.9;
    descripcion = "Balance calórico para mantener tu peso.";
  } else if (objetivoTexto.includes("ganar")) {
    // Superávit para ganar masa muscular
    factorCalorias = 26;
    ajuste = 300;
    factorProteina = 2.0;
    factorGrasa = 1.0;
    descripcion = "Superávit calórico para ganar masa muscular.";
  } else {
    descripcion = "Define un objetivo para personalizar tus metas.";
  }

  const caloriasObjetivo = Math.max(
    1200,
    Math.round(peso * factorCalorias + ajuste)
  );
  const proteinasObjetivo = Math.round(peso * factorProteina);
  const grasasObjetivo = Math.round(peso * factorGrasa);

  const caloriasDeProteina = proteinasObjetivo * 4;
  const caloriasDeGrasa = grasasObjetivo * 9;
  const caloriasRestantes = Math.max(
    0,
    caloriasObjetivo - (caloriasDeProteina + caloriasDeGrasa)
  );
  const carbohidratosObjetivo = Math.round(caloriasRestantes / 4);

  return {
    caloriasObjetivo,
    proteinasObjetivo,
    grasasObjetivo,
    carbohidratosObjetivo,
    descripcion,
  };
}

export default function TarjetaTotales({ registros, usuario }) {
  
  // CALCULO TOTALES DEL DÍA
  
  const totales = registros.reduce(
    (acc, item) => {
      acc.calorias += Number(item.total_calorias || 0);
      acc.carbohidratos += Number(item.total_carbohidratos || 0);
      acc.proteinas += Number(item.total_proteinas || 0);
      acc.grasas += Number(item.total_grasas || 0);
      return acc;
    },
    { calorias: 0, carbohidratos: 0, proteinas: 0, grasas: 0 }
  );

  const objetivos = calcularObjetivos(usuario);

  return (
    <div className="tarjeta tarjeta-totales">
      <h3>Totales Nutricionales del Día</h3>
      {objetivos && (
        <p className="tarjeta-subtitle">{objetivos.descripcion}</p>
      )}

      <div className="totales-grid">
        <div className="total-item">
          <span className="label">Calorías</span>
          <span className="value">
            {totales.calorias.toFixed(0)}{" "}
            {objetivos
              ? `/ ${objetivos.caloriasObjetivo} kcal`
              : "kcal"}
          </span>
        </div>

        <div className="total-item">
          <span className="label">Carbohidratos</span>
          <span className="value">
            {totales.carbohidratos.toFixed(2)}{" "}
            {objetivos
              ? `/ ${objetivos.carbohidratosObjetivo} g`
              : "g"}
          </span>
        </div>

        <div className="total-item">
          <span className="label">Proteínas</span>
          <span className="value">
            {totales.proteinas.toFixed(2)}{" "}
            {objetivos
              ? `/ ${objetivos.proteinasObjetivo} g`
              : "g"}
          </span>
        </div>

        <div className="total-item">
          <span className="label">Grasas</span>
          <span className="value">
            {totales.grasas.toFixed(2)}{" "}
            {objetivos
              ? `/ ${objetivos.grasasObjetivo} g`
              : "g"}
          </span>
        </div>
      </div>
    </div>
  );
}
