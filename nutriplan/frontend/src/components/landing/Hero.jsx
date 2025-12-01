
export default function Hero() {
  return (
    <section className="lp-hero">
      <div className="lp-hero-content">
        <h1 className="lp-title">Tu compañero para una vida saludable</h1>
        <p className="lp-subtitle">
          Registra tus comidas, controla tus calorías y sigue tu progreso diario
          de forma sencilla.
        </p>
      </div>

      <div className="lp-hero-image-wrapper">
        <img
          src="/hero-plate.png"
          alt="Plato saludable"
          className="lp-image"
        />
      </div>
    </section>
  );
}
