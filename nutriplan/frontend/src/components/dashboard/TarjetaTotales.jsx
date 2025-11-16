export default function TarjetaTotales({ data }) {
  return (
    <div className="dash-card totals-card">
      <h5 className="dash-card-title">Totales Nutricionales del Día</h5>
      <p className="dash-card-sub">Balance nutricional equilibrado</p>

      <div className="totals-grid">
        <div className="total-item">
          <h1 className="total-number text-cal">{data?.calorias || 0}</h1>
          <p>Calorías</p>
        </div>

        <div className="total-item">
          <h1 className="total-number text-prot">{data?.proteinas || 0}</h1>
          <p>Proteínas</p>
        </div>

        <div className="total-item">
          <h1 className="total-number text-carb">{data?.carbohidratos || 0}</h1>
          <p>Carbohidratos</p>
        </div>

        <div className="total-item">
          <h1 className="total-number text-grasa">{data?.grasas || 0}</h1>
          <p>Grasas</p>
        </div>
      </div>
    </div>
  );
}
