
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/http.js";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/auth.css";


export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    correo: "",
    password: "",
    peso: "",
    altura: "",
    genero: "Masculino",
    objetivo: "Mantener peso",
    condicion_medica: "",
    alergia: "",
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      
      const payload = {
        usuario_tipo: "cliente",
        nombre: form.nombre,
        correo: form.correo,
        edad: Number(form.edad) || 0,
        altura: Number(form.altura) || 0,
        peso: Number(form.peso) || 0,
        objetivo: form.objetivo,
        genero: form.genero,
        condicion_medica: form.condicion_medica || null,
        alergia: form.alergia || null,
        password: form.password,
      };

      await api.post("usuarios/", payload);

      
      const result = await login(form.correo, form.password);
      if (result.ok) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          "Error al crear la cuenta. Revisa los datos."
      );
    } finally {
      setCargando(false);
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <div className="auth-wrapper">
      <div style={{ maxWidth: 620, width: "100%" }}>
        <button type="button" className="auth-back mb-3" onClick={handleBack}>
          ← <span>Volver</span>
        </button>

        <div className="auth-title">
          <h1>NutriPlan</h1>
          <p>Inicia tu viaje hacia una mejor nutrición</p>
        </div>

        <div className="auth-card mx-auto">
          {/* Tabls */}
          <div className="auth-tabs">
            <button
              className="auth-tab"
              type="button"
              onClick={() => navigate("/login")}
            >
              Iniciar Sesión
            </button>
            <button className="auth-tab active" type="button">
              Registrarse
            </button>
          </div>

          <h5 className="mb-1">Crear Cuenta</h5>
          <p className="text-muted mb-3" style={{ fontSize: 14 }}>
            Completa la información para personalizar tu experiencia
          </p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Nombre / Edad */}
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.nombre}
                  onChange={(e) => updateField("nombre", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Edad</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.edad}
                  onChange={(e) => updateField("edad", e.target.value)}
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={form.correo}
                onChange={(e) => updateField("correo", e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mt-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                required
              />
            </div>

            {/* Peso / Altura */}
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <label className="form-label">Peso (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.peso}
                  onChange={(e) => updateField("peso", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Altura (cm)</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.altura}
                  onChange={(e) => updateField("altura", e.target.value)}
                />
              </div>
            </div>

            {/* Género */}
            <div className="mt-3">
              <label className="form-label">Género</label>
              <select
                className="form-select"
                value={form.genero}
                onChange={(e) => updateField("genero", e.target.value)}
              >
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </select>
            </div>

            {/* Objetivo */}
            <div className="mt-3">
              <label className="form-label">Objetivo Principal</label>
              <select
                className="form-select"
                value={form.objetivo}
                onChange={(e) => updateField("objetivo", e.target.value)}
              >
                <option>Mantener peso</option>
                <option>Bajar de peso</option>
                <option>Subir masa muscular</option>
              </select>
            </div>

            {/* Condiciones médicas  */}
            <div className="mt-3">
              <label className="form-label">
                Condiciones Médicas (opcional)
              </label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Diabetes, hipertensión, etc."
                value={form.condicion_medica}
                onChange={(e) =>
                  updateField("condicion_medica", e.target.value)
                }
              />
            </div>

            {/* Alergias  */}
            <div className="mt-3">
              <label className="form-label">
                Alergias Alimentarias (opcional)
              </label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Gluten, lácteos, mariscos, etc."
                value={form.alergia}
                onChange={(e) => updateField("alergia", e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 mt-4 auth-submit"
              disabled={cargando}
            >
              {cargando ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
