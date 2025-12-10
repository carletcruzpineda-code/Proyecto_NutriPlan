import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
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

  // ============================================
  // MANEJA CAMBIO DE INPUTS
  // ============================================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // REGISTRAR USUARIO → AUTO LOGIN → REDIRIGIR
  // ============================================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      // 1️⃣ Registro usuario en backend
      await http.post("usuarios/", form);

      // 2️⃣ Auto Login
      const loginResult = await login(form.correo, form.password);

      if (!loginResult.ok) {
        setError("Registro correcto, pero no fue posible iniciar sesión.");
        return;
      }

      // 3️⃣ Redirigir al dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
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
        <button
          className="auth-back"
          type="button"
          onClick={() => navigate("/login")}
        >
          ← Volver al inicio de sesión
        </button>

        <h1 className="auth-title">Crear Cuenta</h1>
        <p className="auth-subtitle">Bienvenido a NutriPlan</p>

        {error && <p className="text-danger">{error}</p>}

        {/* ============================================
            FORMULARIO
        ============================================ */}
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

          {/* 🔽 OBJETIVO COMO DROPDOWN */}
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
        </form>
      </div>
    </div>
  );
}
