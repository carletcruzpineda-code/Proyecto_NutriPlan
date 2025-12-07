// src/pages/Login.jsx

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    const result = await login(correo, password);

    setCargando(false);

    if (!result.ok) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Iniciar Sesión</h1>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleLogin}>
          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={cargando}
            className="auth-submit"
            type="submit"
          >
            {cargando ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        <p>
          ¿No tienes cuenta?{" "}
          <a href="/register">Crear una cuenta</a>
        </p>
      </div>
    </div>
  );
}
