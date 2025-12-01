// src/components/alimentos/FoodSearch.jsx
import { useEffect, useState } from "react";
import http from "../../api/http";

export default function FoodSearch({ onSelect }) {
  const [termino, setTermino] = useState("");
  const [alimentos, setAlimentos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);

  useEffect(() => {
    const cargarAlimentos = async () => {
      try {
        const resp = await http.get("alimentos/");
        setAlimentos(resp.data);
        setFiltrados(resp.data);
      } catch (error) {
        console.error("Error cargando alimentos", error);
      }
    };

    cargarAlimentos();
  }, []);

  useEffect(() => {
    if (!termino) {
      setFiltrados(alimentos);
      return;
    }

    const t = termino.toLowerCase();
    setFiltrados(
      alimentos.filter((a) => a.nombre.toLowerCase().includes(t))
    );
  }, [termino, alimentos]);

  return (
    <div className="food-search">
      <label className="form-label">Buscar alimento</label>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Ej: manzana, arroz, pollo..."
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
      />

      <div className="food-search-list">
        {filtrados.map((food) => (
          <button
            key={food.id}
            type="button"
            className="food-search-item"
            onClick={() => onSelect(food)}
          >
            <span>{food.nombre}</span>
            <small className="text-muted">
              {food.calorias} cal · {food.proteina} prot · {food.carbohidratos} carb ·{" "}
              {food.grasas} grasa
            </small>
          </button>
        ))}
        {filtrados.length === 0 && (
          <p className="text-muted mb-0">No se encontraron alimentos.</p>
        )}
      </div>
    </div>
  );
}
