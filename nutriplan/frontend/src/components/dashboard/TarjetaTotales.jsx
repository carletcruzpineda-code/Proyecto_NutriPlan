import "../../styles/dashboard.css";

export default function TarjetaTotales({ registros }) {
  // ===============================
  // CALCULAR TOTALES DEL DÍA
  // ===============================
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

  return (
    <div className="tarjeta tarjeta-totales">
      <h3>Totales de Hoy</h3>

      <div className="totales-grid">
        <div className="total-item">
          <span className="label">Calorías</span>
          <span className="value">{totales.calorias.toFixed(2)} kcal</span>
        </div>

        <div className="total-item">
          <span className="label">Carbohidratos</span>
          <span className="value">{totales.carbohidratos.toFixed(2)} g</span>
        </div>

        <div className="total-item">
          <span className="label">Proteínas</span>
          <span className="value">{totales.proteinas.toFixed(2)} g</span>
        </div>

        <div className="total-item">
          <span className="label">Grasas</span>
          <span className="value">{totales.grasas.toFixed(2)} g</span>
        </div>
      </div>
    </div>
  );
}
