// src/components/dashboard/ListaComidas.jsx
import { useEffect, useState } from "react";
import http from "../../api/http";
import "./listaComidas.css";

export default function ListaComidas({ onAgregarComida, reloadTrigger }) {
  const [comidas, setComidas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarComidas = async () => {
    try {
      setCargando(true);
      const res = await http.get("registros/");
      setComidas(res.data);
    } catch (err) {
      console.error("Error cargando comidas:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarComidas();
  }, [reloadTrigger]);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este registro de comida?"
    );
    if (!confirmar) return;

    try {
      await http.delete(`registros/${id}/`);
      setComidas((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error al eliminar registro:", err);
      alert("Ocurrió un error al eliminar el registro.");
    }
  };

  const handleEditar = async (registro) => {
    const actual = Number(registro.cantidad_consumida);
    const input = window.prompt(
      "Nueva cantidad en gramos:",
      isNaN(actual) ? "" : String(actual)
    );

    if (input === null) {
      // usuario canceló
      return;
    }

    const gramos = Number(input);
    if (!gramos || gramos <= 0) {
      alert("Ingresa una cantidad válida en gramos.");
      return;
    }

    try {
      await http.patch(`registros/${registro.id}/`, {
        cantidad_consumida: gramos,
      });

      // Recargar lista para obtener macros recalculados
      await cargarComidas();
    } catch (err) {
      console.error("Error al editar registro:", err);
      alert("Ocurrió un error al editar el registro.");
    }
  };

  return (
    <div className="lista-card">
      <h3>Comidas registradas</h3>

      {cargando ? (
        <p>Cargando...</p>
      ) : comidas.length === 0 ? (
        <p>No hay comidas registradas.</p>
      ) : (
        comidas.map((c) => (
          <div key={c.id} className="comida-item">
            <div>
              <strong>{c.alimento_detalle?.nombre}</strong>
              <div className="macro-line">
                {c.total_calorias} kcal — P: {c.total_proteinas}g — C:{" "}
                {c.total_carbohidratos}g — G: {c.total_grasas}g
              </div>
              <div className="macro-line macro-cantidad">
                Cantidad: {c.cantidad_consumida} g
              </div>
            </div>

            <div className="comida-actions">
              <button
                type="button"
                className="btn-comida btn-comida-edit"
                onClick={() => handleEditar(c)}
              >
                Editar
              </button>
              <button
                type="button"
                className="btn-comida btn-comida-delete"
                onClick={() => handleEliminar(c.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}

      <button className="btn-agregar-comida" onClick={onAgregarComida}>
        + Agregar comida
      </button>
    </div>
  );
}
