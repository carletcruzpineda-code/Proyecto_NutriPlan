import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
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

    const result = await login(correo, password);

    if (!result.ok) {
      setError(result.mensaje);
      setCargando(false);
      return;
    }

    navigate("/dashboard");
  };

  const handleBack = () => navigate("/");

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
          <p className="text-muted mb-3">Ingresa tus credenciales</p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
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
