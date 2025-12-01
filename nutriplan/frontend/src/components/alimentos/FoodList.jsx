// src/components/alimentos/FoodList.jsx
import { useEffect, useState } from "react";
import http from "../../api/http";

export default function FoodList({ reloadTrigger }) {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarRegistros = async () => {
    try {
      setCargando(true);
      const resp = await http.get("registros/");
      setRegistros(resp.data);
    } catch (error) {
      console.error("Error cargando registros de consumo", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarRegistros();
  }, [reloadTrigger]);

  return (
    <div className="food-list mt-3">
      {cargando && <p className="text-muted">Cargando registros...</p>}

      {!cargando && registros.length === 0 && (
        <p className="text-muted mb-0">Aún no has registrado comidas hoy.</p>
      )}

      {!cargando &&
        registros.map((reg) => (
          <div key={reg.id} className="food-list-item">
            <div>
              <strong>{reg.alimento}</strong>
              <div className="text-muted" style={{ fontSize: 13 }}>
                {reg.cantidad_consumida} g · {reg.fecha}
              </div>
            </div>

            <div className="text-end">
              <div className="food-list-cal">{reg.total_calorias} cal</div>
            </div>
          </div>
        ))}
    </div>
  );
}
  