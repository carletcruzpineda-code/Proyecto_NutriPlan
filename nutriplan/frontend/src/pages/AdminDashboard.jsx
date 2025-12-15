// src/pages/AdminDashboard.jsx

import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { adminUserService } from "../services/adminUserService";
import { adminFoodService } from "../services/adminFoodService";

import "../styles/dashboard.css";
import "../styles/admin.css";

const OBJETIVOS = ["Perder peso", "Mantener peso", "Ganar masa muscular"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // ===============================
  // UI
  // ===============================
  const [tab, setTab] = useState("usuarios");
  const [q, setQ] = useState("");
  const [toast, setToast] = useState({ type: "", text: "" });

  const toastOk = (text) => {
    setToast({ type: "success", text });
    setTimeout(() => setToast({ type: "", text: "" }), 2500);
  };
  const toastErr = (text) => {
    setToast({ type: "error", text });
    setTimeout(() => setToast({ type: "", text: "" }), 3500);
  };

  // ===============================
  // USERS
  // ===============================
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Modales usuarios
  const [modalObjetivo, setModalObjetivo] = useState({ open: false, u: null });
  const [nuevoObjetivo, setNuevoObjetivo] = useState("");

  const [modalPassword, setModalPassword] = useState({ open: false, u: null });
  const [newPassword, setNewPassword] = useState("");

  const [modalCrearAdmin, setModalCrearAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({
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

  // ===============================
  // FOODS (alineado a tu backend real)
  // ===============================
  const [foods, setFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(false);

  const [foodForm, setFoodForm] = useState({
    nombre: "",
    categoria: "",
    calorias: "",
    carbohidratos: "",
    proteina: "",
    grasas: "",
  });

  const [modalFoodEdit, setModalFoodEdit] = useState({ open: false, f: null });

  // ===============================
  // Fetch
  // ===============================
  const fetchUsuarios = async () => {
    setLoadingUsers(true);
    try {
      const data = await adminUserService.getUsers();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      toastErr("No se pudieron cargar los usuarios.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchFoods = async () => {
    setLoadingFoods(true);
    try {
      const data = await adminFoodService.getFoods();
      setFoods(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      toastErr("No se pudieron cargar los alimentos.");
    } finally {
      setLoadingFoods(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    fetchFoods();
  }, []);

  // ===============================
  // Derivados
  // ===============================
  const usuariosFiltrados = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return usuarios;

    return usuarios.filter((u) => {
      const nombre = String(u.nombre || "").toLowerCase();
      const correo = String(u.correo || "").toLowerCase();
      const objetivo = String(u.objetivo || "").toLowerCase();
      return nombre.includes(term) || correo.includes(term) || objetivo.includes(term);
    });
  }, [usuarios, q]);

  const totalAdmins = useMemo(
    () => usuarios.filter((u) => u.usuario_tipo === "admin" || u.is_staff === true).length,
    [usuarios]
  );

  // ===============================
  // Logout
  // ===============================
  const handleLogout = () => {
    try {
      if (typeof logout === "function") logout();
      else {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
      }
    } finally {
      navigate("/login", { replace: true });
    }
  };

  // ===============================
  // Usuarios: Objetivo
  // ===============================
  const openObjetivoModal = (u) => {
    setNuevoObjetivo(u.objetivo || "");
    setModalObjetivo({ open: true, u });
  };

  const saveObjetivo = async () => {
    if (!modalObjetivo.u) return;
    if (!nuevoObjetivo) {
      toastErr("Selecciona un objetivo.");
      return;
    }
    try {
      await adminUserService.updateObjetivo(modalObjetivo.u.id, nuevoObjetivo);
      setModalObjetivo({ open: false, u: null });
      toastOk("Objetivo actualizado.");
      await fetchUsuarios();
    } catch (e) {
      console.error(e);
      toastErr("No se pudo actualizar el objetivo.");
    }
  };

  // ===============================
  // Usuarios: Contraseña
  // ===============================
  const openPasswordModal = (u) => {
    setNewPassword("");
    setModalPassword({ open: true, u });
  };

  const savePassword = async () => {
    if (!modalPassword.u) return;
    if (!newPassword || newPassword.length < 6) {
      toastErr("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    try {
      await adminUserService.updatePassword(modalPassword.u.id, newPassword);
      setModalPassword({ open: false, u: null });
      toastOk("Contraseña actualizada.");
    } catch (e) {
      console.error(e);
      toastErr("No se pudo actualizar la contraseña.");
    }
  };

  // ===============================
  // Usuarios: Promover a admin
  // ===============================
  const promoteUser = async (u) => {
    if (!confirm(`¿Convertir a "${u.nombre}" en admin?`)) return;
    try {
      await adminUserService.promoteUser(u.id);
      toastOk("Usuario ascendido a admin.");
      await fetchUsuarios();
    } catch (e) {
      console.error(e);
      toastErr("No se pudo ascender a admin.");
    }
  };

  // ===============================
  // Usuarios: Eliminar
  // ===============================
  const deleteUser = async (u) => {
    if (u.id === user?.id) {
      toastErr("No puedes eliminar tu propio usuario admin.");
      return;
    }
    if (!confirm(`¿Eliminar a "${u.nombre}" (${u.correo})?`)) return;

    try {
      await adminUserService.deleteUser(u.id);
      setUsuarios((prev) => prev.filter((x) => x.id !== u.id));
      toastOk("Usuario eliminado.");
    } catch (e) {
      console.error(e);
      toastErr("No se pudo eliminar el usuario.");
    }
  };

  // ===============================
  // Crear Admin (modal)
  // ===============================
  const handleAdminChange = (e) => {
    setAdminForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createAdmin = async (e) => {
    e.preventDefault();

    if (!adminForm.nombre || !adminForm.correo || !adminForm.password) {
      toastErr("Nombre, correo y contraseña son obligatorios.");
      return;
    }

    try {
      await adminUserService.createAdmin({
        ...adminForm,
        edad: adminForm.edad ? Number(adminForm.edad) : 0,
        altura: adminForm.altura ? Number(adminForm.altura) : 0,
        peso: adminForm.peso ? Number(adminForm.peso) : 0,
      });

      setModalCrearAdmin(false);
      setAdminForm({
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

      toastOk("Admin creado.");
      await fetchUsuarios();
    } catch (e2) {
      console.error(e2);
      toastErr("No se pudo crear el admin (revisa datos/permisos).");
    }
  };

  // ===============================
  // Foods: handlers
  // ===============================
  const handleFoodChange = (e) => {
    setFoodForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createFood = async (e) => {
    e.preventDefault();

    if (!foodForm.nombre || !foodForm.categoria) {
      toastErr("Nombre y categoría son obligatorios.");
      return;
    }

    try {
      await adminFoodService.createFood({
        nombre: foodForm.nombre,
        categoria: foodForm.categoria,
        calorias: Number(foodForm.calorias || 0),
        carbohidratos: Number(foodForm.carbohidratos || 0),
        proteina: Number(foodForm.proteina || 0),
        grasas: Number(foodForm.grasas || 0),
      });

      setFoodForm({
        nombre: "",
        categoria: "",
        calorias: "",
        carbohidratos: "",
        proteina: "",
        grasas: "",
      });

      toastOk("Alimento agregado.");
      await fetchFoods();
    } catch (e2) {
      console.error(e2);
      toastErr("No se pudo agregar el alimento.");
    }
  };

  const openFoodEdit = (f) => {
    setModalFoodEdit({ open: true, f });
    setFoodForm({
      nombre: f.nombre ?? "",
      categoria: f.categoria ?? "",
      calorias: String(f.calorias ?? ""),
      carbohidratos: String(f.carbohidratos ?? ""),
      proteina: String(f.proteina ?? ""),
      grasas: String(f.grasas ?? ""),
    });
  };

  const saveFoodEdit = async () => {
    if (!modalFoodEdit.f) return;

    try {
      await adminFoodService.updateFood(modalFoodEdit.f.id, {
        nombre: foodForm.nombre,
        categoria: foodForm.categoria,
        calorias: Number(foodForm.calorias || 0),
        carbohidratos: Number(foodForm.carbohidratos || 0),
        proteina: Number(foodForm.proteina || 0),
        grasas: Number(foodForm.grasas || 0),
      });

      setModalFoodEdit({ open: false, f: null });
      toastOk("Alimento actualizado.");
      await fetchFoods();
    } catch (e) {
      console.error(e);
      toastErr("No se pudo actualizar el alimento.");
    }
  };

  const deleteFood = async (f) => {
    if (!confirm(`¿Eliminar alimento "${f.nombre}"?`)) return;

    try {
      await adminFoodService.deleteFood(f.id);
      setFoods((prev) => prev.filter((x) => x.id !== f.id));
      toastOk("Alimento eliminado.");
    } catch (e) {
      console.error(e);
      toastErr("No se pudo eliminar el alimento.");
    }
  };

  // ===============================
  // Render
  // ===============================
  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Panel de Administración</h1>
          <p>{user?.correo}</p>
        </div>

        <div className="admin-actions">
          <button className="admin-btn primary" onClick={() => setModalCrearAdmin(true)}>
            + Crear Admin
          </button>
          <button className="admin-btn danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-topbar">
          <div className="admin-tabs">
            <button className={`admin-tab ${tab === "usuarios" ? "active" : ""}`} onClick={() => setTab("usuarios")}>
              Usuarios
            </button>
            <button className={`admin-tab ${tab === "alimentos" ? "active" : ""}`} onClick={() => setTab("alimentos")}>
              Alimentos
            </button>
          </div>

          <input
            className="admin-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tab === "usuarios" ? "Buscar por nombre / correo / objetivo..." : "Buscar (opcional)"}
          />
        </div>

        {toast.text && <div className={toast.type === "error" ? "error" : "success"}>{toast.text}</div>}

        {tab === "usuarios" && (
          <>
            <div className="admin-kpis">
              <div className="kpi">
                <div className="label">Total usuarios</div>
                <div className="value">{usuarios.length}</div>
              </div>
              <div className="kpi">
                <div className="label">Total admins</div>
                <div className="value">{totalAdmins}</div>
              </div>
            </div>

            {loadingUsers && <p>Cargando usuarios...</p>}

            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Objetivo</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((u) => {
                    const isAdmin = u.usuario_tipo === "admin" || u.is_staff === true;
                    return (
                      <tr key={u.id}>
                        <td>{u.nombre}</td>
                        <td>{u.correo}</td>
                        <td>{u.objetivo || "-"}</td>
                        <td>
                          <span className={`badge ${isAdmin ? "admin" : "user"}`}>
                            {isAdmin ? "Admin" : (u.usuario_tipo || "Usuario")}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            <button className="small-btn" onClick={() => openObjetivoModal(u)}>
                              Objetivo
                            </button>
                            <button className="small-btn" onClick={() => openPasswordModal(u)}>
                              Contraseña
                            </button>
                            {!isAdmin && (
                              <button className="small-btn primary" onClick={() => promoteUser(u)}>
                                Hacer admin
                              </button>
                            )}
                            <button className="small-btn danger" onClick={() => deleteUser(u)}>
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {!loadingUsers && usuariosFiltrados.length === 0 && (
                    <tr>
                      <td colSpan="5">No hay usuarios que coincidan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "alimentos" && (
          <>
            <div className="admin-kpis">
              <div className="kpi">
                <div className="label">Total alimentos</div>
                <div className="value">{foods.length}</div>
              </div>
            </div>

            <div className="admin-card" style={{ marginBottom: 14 }}>
              <h3 style={{ marginTop: 0 }}>Agregar alimento</h3>

              <form className="form-grid" onSubmit={createFood}>
                <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                  <div>
                    <label>Nombre</label>
                    <input name="nombre" value={foodForm.nombre} onChange={handleFoodChange} required />
                  </div>
                  <div>
                    <label>Categoría</label>
                    <input name="categoria" value={foodForm.categoria} onChange={handleFoodChange} required />
                  </div>
                </div>

                <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
                  <div>
                    <label>Calorías</label>
                    <input name="calorias" value={foodForm.calorias} onChange={handleFoodChange} />
                  </div>
                  <div>
                    <label>Carbohidratos</label>
                    <input name="carbohidratos" value={foodForm.carbohidratos} onChange={handleFoodChange} />
                  </div>
                  <div>
                    <label>Proteína</label>
                    <input name="proteina" value={foodForm.proteina} onChange={handleFoodChange} />
                  </div>
                  <div>
                    <label>Grasas</label>
                    <input name="grasas" value={foodForm.grasas} onChange={handleFoodChange} />
                  </div>
                </div>

                <div className="modal-actions" style={{ justifyContent: "flex-start" }}>
                  <button className="admin-btn primary" type="submit">
                    Agregar
                  </button>
                </div>
              </form>
            </div>

            {loadingFoods && <p>Cargando alimentos...</p>}

            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Cal</th>
                    <th>Carb</th>
                    <th>Prot</th>
                    <th>Grasas</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((f) => (
                    <tr key={f.id}>
                      <td>{f.nombre}</td>
                      <td>{f.categoria}</td>
                      <td>{f.calorias}</td>
                      <td>{f.carbohidratos}</td>
                      <td>{f.proteina}</td>
                      <td>{f.grasas}</td>
                      <td>
                        <div className="row-actions">
                          <button className="small-btn" onClick={() => openFoodEdit(f)}>
                            Editar
                          </button>
                          <button className="small-btn danger" onClick={() => deleteFood(f)}>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!loadingFoods && foods.length === 0 && (
                    <tr>
                      <td colSpan="7">No hay alimentos.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* ========== MODAL: OBJETIVO ========== */}
      {modalObjetivo.open && (
        <div className="modal-backdrop" onMouseDown={() => setModalObjetivo({ open: false, u: null })}>
          <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <h3>Editar objetivo</h3>
            <p className="modal-sub">
              Usuario: <strong>{modalObjetivo.u?.nombre}</strong> ({modalObjetivo.u?.correo})
            </p>

            <div className="form-grid">
              <div>
                <label>Objetivo</label>
                <select value={nuevoObjetivo} onChange={(e) => setNuevoObjetivo(e.target.value)}>
                  <option value="">Selecciona un objetivo</option>
                  {OBJETIVOS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button className="admin-btn" onClick={() => setModalObjetivo({ open: false, u: null })}>
                Cancelar
              </button>
              <button className="admin-btn primary" onClick={saveObjetivo}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: PASSWORD ========== */}
      {modalPassword.open && (
        <div className="modal-backdrop" onMouseDown={() => setModalPassword({ open: false, u: null })}>
          <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <h3>Cambiar contraseña</h3>
            <p className="modal-sub">
              Usuario: <strong>{modalPassword.u?.nombre}</strong> ({modalPassword.u?.correo})
            </p>

            <div className="form-grid">
              <div>
                <label>Nueva contraseña (mínimo 6)</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button className="admin-btn" onClick={() => setModalPassword({ open: false, u: null })}>
                Cancelar
              </button>
              <button className="admin-btn primary" onClick={savePassword}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: CREAR ADMIN ========== */}
      {modalCrearAdmin && (
        <div className="modal-backdrop" onMouseDown={() => setModalCrearAdmin(false)}>
          <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <h3>Registrar nuevo admin</h3>
            <p className="modal-sub">Se creará con rol admin automáticamente.</p>

            <form className="form-grid" onSubmit={createAdmin}>
              <div>
                <label>Nombre</label>
                <input name="nombre" value={adminForm.nombre} onChange={handleAdminChange} required />
              </div>

              <div>
                <label>Correo</label>
                <input type="email" name="correo" value={adminForm.correo} onChange={handleAdminChange} required />
              </div>

              <div>
                <label>Contraseña</label>
                <input type="password" name="password" value={adminForm.password} onChange={handleAdminChange} required />
              </div>

              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
                <div>
                  <label>Edad</label>
                  <input type="number" name="edad" value={adminForm.edad} onChange={handleAdminChange} />
                </div>
                <div>
                  <label>Altura (cm)</label>
                  <input type="number" name="altura" value={adminForm.altura} onChange={handleAdminChange} />
                </div>
                <div>
                  <label>Peso (kg)</label>
                  <input type="number" name="peso" value={adminForm.peso} onChange={handleAdminChange} />
                </div>
              </div>

              <div>
                <label>Objetivo</label>
                <select name="objetivo" value={adminForm.objetivo} onChange={handleAdminChange}>
                  <option value="">Selecciona</option>
                  {OBJETIVOS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Género</label>
                <select name="genero" value={adminForm.genero} onChange={handleAdminChange}>
                  <option value="">Selecciona</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label>Condición médica (opcional)</label>
                <textarea name="condicion_medica" value={adminForm.condicion_medica} onChange={handleAdminChange} />
              </div>

              <div>
                <label>Alergias (opcional)</label>
                <textarea name="alergia" value={adminForm.alergia} onChange={handleAdminChange} />
              </div>

              <div className="modal-actions">
                <button type="button" className="admin-btn" onClick={() => setModalCrearAdmin(false)}>
                  Cancelar
                </button>
                <button type="submit" className="admin-btn primary">
                  Crear admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL: EDIT FOOD ========== */}
      {modalFoodEdit.open && (
        <div className="modal-backdrop" onMouseDown={() => setModalFoodEdit({ open: false, f: null })}>
          <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <h3>Editar alimento</h3>
            <p className="modal-sub">{modalFoodEdit.f?.nombre}</p>

            <div className="form-grid">
              <div>
                <label>Nombre</label>
                <input name="nombre" value={foodForm.nombre} onChange={handleFoodChange} />
              </div>
              <div>
                <label>Categoría</label>
                <input name="categoria" value={foodForm.categoria} onChange={handleFoodChange} />
              </div>

              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
                <div>
                  <label>Calorías</label>
                  <input name="calorias" value={foodForm.calorias} onChange={handleFoodChange} />
                </div>
                <div>
                  <label>Carbohidratos</label>
                  <input name="carbohidratos" value={foodForm.carbohidratos} onChange={handleFoodChange} />
                </div>
                <div>
                  <label>Proteína</label>
                  <input name="proteina" value={foodForm.proteina} onChange={handleFoodChange} />
                </div>
                <div>
                  <label>Grasas</label>
                  <input name="grasas" value={foodForm.grasas} onChange={handleFoodChange} />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="admin-btn" onClick={() => setModalFoodEdit({ open: false, f: null })}>
                Cancelar
              </button>
              <button className="admin-btn primary" onClick={saveFoodEdit}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
