import { useEffect, useState } from "react";
import http from "../../api/http";
import "./listaComidas.css";

export default function ListaComidas() {
  const [comidas, setComidas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editCantidad, setEditCantidad] = useState("");
  const [loading, setLoading] = useState(false);

  
  // CARGO REGISTROS DEL BACKEND
  
  const cargarComidas = async () => {
    try {
      const res = await http.get("registros/");
      setComidas(res.data);
    } catch (error) {
      console.error("Error cargando registros:", error);
    }
  };

  useEffect(() => {
    cargarComidas();
  }, []);

  
  // HABILITO MODO EDICIÓN
  
  const iniciarEdicion = (item) => {
    setEditId(item.id);
    setEditCantidad(item.cantidad_consumida);
  };

  
  // GUARDO EDICIÓN (PATCH)
  
  const guardarEdicion = async (id) => {
    if (!editCantidad || isNaN(editCantidad) || Number(editCantidad) <= 0) {
      alert("Ingrese una cantidad válida.");
      return;
    }

    try {
      setLoading(true);

      await http.patch(`registros/${id}/`, {
        cantidad_consumida: Number(editCantidad),
      });

      // Recargo lista actualizada
      await cargarComidas();

      // Limpio edición
      setEditId(null);
      setEditCantidad("");
    } catch (error) {
      console.error("Error editando registro:", error);
      alert("No se pudo editar el registro.");
    } finally {
      setLoading(false);
    }
  };

  
  // ELIMINO REGISTRO
  
  const eliminarComida = async (id) => {
    if (!confirm("¿Eliminar este registro?")) return;

    try {
      await http.delete(`registros/${id}/`);
      setComidas((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error eliminando registro:", error);
      alert("No se pudo eliminar el registro.");
    }
  };

  return (
    <div className="lista-comidas-container">
      <h3>Comidas Registradas</h3>

      {comidas.length === 0 && <p>No hay registros aún.</p>}

      {comidas.map((item) => (
        <div key={item.id} className="comida-card">
          <div className="info">
            <strong>{item.alimento_detalle?.nombre}</strong>
            <p>Categoría: {item.alimento_detalle?.categoria}</p>
            <p>Calorías: {item.total_calorias} kcal</p>
            <p>
              Carbs: {item.total_carbohidratos}g · Prot: {item.total_proteinas}g · Grasas:{" "}
              {item.total_grasas}g
            </p>
          </div>

          {/* ========== MODO EDICIÓN ========== */}
          {editId === item.id ? (
            <div className="acciones">
              <input
                type="number"
                value={editCantidad}
                onChange={(e) => setEditCantidad(e.target.value)}
              />

              <button
                className="guardar-btn"
                disabled={loading}
                onClick={() => guardarEdicion(item.id)}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>

              <button className="cancelar-btn" onClick={() => setEditId(null)}>
                Cancelar
              </button>
            </div>
          ) : (
            // ========== ACCIONES NORMALES ==========
            <div className="acciones">
              <button className="editar-btn" onClick={() => iniciarEdicion(item)}>
                Editar
              </button>

              <button className="eliminar-btn" onClick={() => eliminarComida(item.id)}>
                Eliminar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
