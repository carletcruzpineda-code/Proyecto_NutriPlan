// src/pages/register.jsx

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/http";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    usuario_tipo: "cliente",
    nombre: "",
    correo: "",
    edad: "",
    altura: "",
    peso: "",
    objetivo: "",
    genero: "",
    condicion_medica: "",
    alergia: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // =========================
  // Maneja cambios
  // =========================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // Registro -> AutoLogin -> Dashboard
  // =========================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      // 1) Registrar usuario (con baseURL ya en /api, NO pongas /api aquí)
      await api.post("/usuarios/", {
        ...form,
        // asegurar números si el backend los espera como int/float
        edad: form.edad === "" ? "" : Number(form.edad),
        altura: form.altura === "" ? "" : Number(form.altura),
        peso: form.peso === "" ? "" : Number(form.peso),
      });

      // 2) Auto login
      await login(form.correo, form.password);

      // 3) Redirigir
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);

      // Mostrar el primer error del backend (igual que tu original)
      if (err.response?.data) {
        const data = err.response.data;
        const firstKey = Object.keys(data)[0];
        const firstError = Array.isArray(data[firstKey])
          ? data[firstKey][0]
          : data[firstKey];

        setError(String(firstError));
      } else {
        setError("Ocurrió un error al registrarse. Inténtalo de nuevo.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Botón volver (manteniendo UX original) */}
        <button
          className="auth-back"
          type="button"
          onClick={() => navigate("/login")}
        >
          ← Volver al inicio de sesión
        </button>

        <h1 className="auth-title">Crear Cuenta</h1>
        <p className="auth-subtitle">Bienvenido a NutriPlan</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-2">
            <label>Nombre completo</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label>Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col">
              <label>Edad</label>
              <input
                type="number"
                className="form-control"
                name="edad"
                value={form.edad}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>Altura (cm)</label>
              <input
                type="number"
                className="form-control"
                name="altura"
                value={form.altura}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>Peso (kg)</label>
              <input
                type="number"
                className="form-control"
                name="peso"
                value={form.peso}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-2 mt-2">
            <label>Objetivo principal</label>
            <select
              className="form-control"
              name="objetivo"
              value={form.objetivo}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona tu objetivo</option>
              <option value="Perder peso">Perder peso</option>
              <option value="Mantener peso">Mantener peso</option>
              <option value="Ganar masa muscular">Ganar masa muscular</option>
            </select>
            <small className="text-muted">
              Esto nos ayudará a calcular tus metas diarias.
            </small>
          </div>

          <div className="mb-2">
            <label>Género</label>
            <select
              className="form-control"
              name="genero"
              value={form.genero}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="mb-2">
            <label>Condición Médica</label>
            <textarea
              className="form-control"
              name="condicion_medica"
              value={form.condicion_medica}
              onChange={handleChange}
              placeholder="Opcional"
            />
          </div>

          <div className="mb-2">
            <label>Alergias</label>
            <textarea
              className="form-control"
              name="alergia"
              value={form.alergia}
              onChange={handleChange}
              placeholder="Opcional"
            />
          </div>

          <button
            className="btn btn-success w-100 mt-3 auth-submit"
            type="submit"
            disabled={cargando}
          >
            {cargando ? "Creando cuenta..." : "Registrarse"}
          </button>

          {/* Link extra por si quieres (no rompe tu diseño) */}
          <div className="auth-links" style={{ marginTop: "12px" }}>
            <Link to="/">Volver al inicio</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
