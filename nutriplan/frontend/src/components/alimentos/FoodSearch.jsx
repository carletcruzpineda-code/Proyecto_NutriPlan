import { useEffect, useState } from "react";
import http from "../../api/http";

export default function FoodSearch({ onSelect }) {
  const [term, setTerm] = useState("");
  const [foods, setFoods] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    http.get("alimentos/").then((res) => {
      setFoods(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    if (!term) {
      setFiltered(foods);
      return;
    }
    setFiltered(
      foods.filter((f) => f.nombre.toLowerCase().includes(term.toLowerCase()))
    );
  }, [term, foods]);

  return (
    <div>
      <input
        className="form-control mb-2"
        placeholder="Buscar alimento..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      {filtered.map((f) => (
        <button
          key={f.id}
          type="button"
          className="food-search-item"
          onClick={() => onSelect(f)}
        >
          {f.nombre}
        </button>
      ))}
    </div>
  );
}
