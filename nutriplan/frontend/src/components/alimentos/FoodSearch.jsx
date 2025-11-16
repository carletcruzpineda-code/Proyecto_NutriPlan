import React, { useState } from "react";
import axios from "../../api/http";

export default function FoodSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const buscar = async () => {
    try {
      const res = await axios.get(`/alimentos/?search=${query}`);
      setResults(res.data);
    } catch (error) {
      console.error("Error buscando alimentos", error);
    }
  };

  return (
    <div className="food-search">
      <input
        type="text"
        placeholder="Buscar alimento…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn" onClick={buscar}>Buscar</button>

      {results.length > 0 && (
        <ul className="food-results">
          {results.map((food) => (
            <li key={food.id} onClick={() => onSelect(food)}>
              {food.nombre} — {food.calorias} kcal
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
