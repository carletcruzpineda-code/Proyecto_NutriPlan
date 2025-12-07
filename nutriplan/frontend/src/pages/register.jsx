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
  // MANEJAR CAMBIO DE INPUTS
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
      // 1️⃣ Registrar usuario en backend
      await http.post("usuarios/", form);

      // 2️⃣ Auto Login
      const loginResult = await login(form.correo, form.password);

      if (!loginResult.ok) {
        setError("Registro correcto, pero no fue posible iniciar sesión.");
        return;
      }

      // 3️⃣ Redirigir al Dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      if (err.response?.data?.correo) {
        setError("El correo ya está registrado.");
      } else {
        setError("No se pudo completar el registro.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-title">
          <h1>Crear Cuenta</h1>
          <p>Bienvenido a NutriPlan</p>
        </div>

        <button className="auth-back" onClick={() => navigate("/login")}>
          ← Volver al inicio de sesión
        </button>

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

          <div className="mb-2 mt-2">
            <label>Objetivo</label>
            <input
              type="text"
              className="form-control"
              name="objetivo"
              value={form.objetivo}
              onChange={handleChange}
              placeholder="Ejemplo: Bajar peso"
              required
            />
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
            />
          </div>

          <div className="mb-2">
            <label>Alergias</label>
            <textarea
              className="form-control"
              name="alergia"
              value={form.alergia}
              onChange={handleChange}
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
