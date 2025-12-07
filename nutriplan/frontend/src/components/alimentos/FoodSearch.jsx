// src/components/alimentos/FoodSearch.jsx

import { useEffect, useState } from "react";
import http from "../../api/http";

export default function FoodSearch({ onSelect }) {
  const [alimentos, setAlimentos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar alimentos una sola vez
  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        const res = await http.get("alimentos/");
        setAlimentos(res.data || []);
      } catch (error) {
        console.error("Error cargando alimentos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  // Filtrar en frontend, pero protegido
  const resultados = alimentos.filter((a) => {
    const termino = busqueda.toLowerCase();
    return (
      a.nombre?.toLowerCase().includes(termino) ||
      a.categoria?.toLowerCase().includes(termino)
    );
  });

  return (
    <div className="food-search">
      <input
        type="text"
        placeholder="Buscar alimento..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {loading && <p>Cargando alimentos...</p>}

      {busqueda && resultados.length === 0 && !loading && (
        <p>No se encontraron alimentos.</p>
      )}

      <ul className="search-results">
        {resultados.map((food) => (
          <li
            key={food.id}
            onClick={() => onSelect(food)}
            className="search-item"
          >
            {food.nombre} — {food.calorias} kcal
          </li>
        ))}
      </ul>
    </div>
  );
}
