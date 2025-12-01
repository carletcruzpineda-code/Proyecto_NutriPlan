
import { Link } from "react-router-dom";

export default function HeaderLanding() {
  return (
    <header className="lp-header">
      <div className="lp-header-inner">
        <div className="lp-logo">NutriPlan</div>

        <nav className="lp-nav">
          {/* Enlace new */}
          <Link to="/acerca" className="lp-header-link">
            Acerca de NutriPlan
          </Link>

          <Link to="/login" className="lp-header-link">
            Iniciar sesión
          </Link>

          <Link to="/register" className="lp-header-button">
            Crear cuenta
          </Link>
        </nav>
      </div>
    </header>
  );
}
