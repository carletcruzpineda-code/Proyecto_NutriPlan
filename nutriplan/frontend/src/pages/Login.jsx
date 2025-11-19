// src/pages/Login.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const resultado = await login(correo, password);

    if (!resultado.ok) {
      setError(resultado.mensaje || "Correo o contraseña incorrectos");
      setCargando(false);
      return;
    }

    navigate("/"); // Dashboard
  };

  const handleBack = () => {
    navigate("/"); // llevarlo a la landing
  };

  return (
    <div className="auth-wrapper">
      <div style={{ maxWidth: 520, width: "100%" }}>
        <button type="button" className="auth-back mb-3" onClick={handleBack}>
          ← <span>Volver</span>
        </button>

        <div className="auth-title">
          <h1>NutriPlan</h1>
          <p>Inicia tu viaje hacia una mejor nutrición</p>
        </div>

        <div className="auth-card mx-auto">
          {/* Tabs */}
          <div className="auth-tabs">
            <button className="auth-tab active" type="button">
              Iniciar Sesión
            </button>
            <button
              className="auth-tab"
              type="button"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </button>
          </div>

          <h5 className="mb-1">Iniciar Sesión</h5>
          <p className="text-muted mb-3" style={{ fontSize: 14 }}>
            Ingresa tus credenciales para acceder a tu cuenta
          </p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                placeholder="tu_correo@ejemplo.com"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 auth-submit"
              disabled={cargando}
            >
              {cargando ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
