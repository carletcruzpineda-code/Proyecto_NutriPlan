// src/pages/Login.jsx

import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(correo, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <p className="auth-subtitle">
          Accede a tu cuenta de <strong>NutriPlan</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">
            Entrar
          </button>
        </form>

        <div className="auth-links">
          <Link to="/register">¿No tienes cuenta? Regístrate</Link>
          <Link to="/">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
