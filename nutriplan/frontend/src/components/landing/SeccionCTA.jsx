// src/components/landing/SeccionCTA.jsx
import { Link } from "react-router-dom";

export default function SeccionCTA() {
  return (
    <section className="lp-cta-section">
      <h2 className="lp-cta-title">Empieza hoy tu cambio</h2>
      <p className="lp-cta-subtitle">
        Crea tu cuenta, registra tus comidas y obtén una visión clara de tu progreso.
      </p>

      <Link to="/register">
        <button className="lp-cta-button">Comenzar mi transformación</button>
      </Link>

      <p className="lp-cta-details">
        ✓ Gratis · ✓ Sin suscripciones · ✓ Datos bajo tu control
      </p>
    </section>
  );
}
