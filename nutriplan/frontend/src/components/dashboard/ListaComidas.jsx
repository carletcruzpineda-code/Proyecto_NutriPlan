// src/components/dashboard/ListaComidas.jsx
import { useEffect, useState } from "react";
import http from "../../api/http";
import "./listaComidas.css";

export default function ListaComidas({ onAgregarComida }) {
  const [comidas, setComidas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarComidas = async () => {
    try {
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
  }, []);

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
            <strong>{c.alimento_detalle?.nombre}</strong>
            <div className="macro-line">
              {c.total_calorias} kcal — P: {c.total_proteinas}g — C: {c.total_carbohidratos}g — G: {c.total_grasas}g
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
