
export default function Beneficios() {
  return (
    <section className="lp-benefits-section">
      <h2 className="lp-section-title">¿Por qué elegir NutriPlan?</h2>
      <p className="lp-section-subtitle">
        Te ayudamos a organizar tu alimentación con herramientas claras y fáciles de usar.
      </p>

      <div className="lp-benefits-grid">
        <div className="lp-benefit-card">
          <div className="lp-benefit-icon">📒</div>
          <h4 className="lp-benefit-title">Registro intuitivo</h4>
          <p className="lp-benefit-text">
            Agrega tus comidas y alimentos diarios en pocos pasos.
          </p>
        </div>

        <div className="lp-benefit-card">
          <div className="lp-benefit-icon">📊</div>
          <h4 className="lp-benefit-title">Seguimiento de progreso</h4>
          <p className="lp-benefit-text">
            Visualiza peso, calorías y metas cumplidas en un solo lugar.
          </p>
        </div>

        <div className="lp-benefit-card">
          <div className="lp-benefit-icon">🥗</div>
          <h4 className="lp-benefit-title">Información nutricional</h4>
          <p className="lp-benefit-text">
            Consulta datos de alimentos y recibe orientación para mejorar tu dieta.
          </p>
        </div>
      </div>
    </section>
  );
}
