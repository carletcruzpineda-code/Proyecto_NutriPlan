// src/pages/AgregarComida.jsx
import { useState } from "react";
import "../styles/agregar.css";
import FoodSearch from "../components/alimentos/FoodSearch";
import FoodForm from "../components/alimentos/FoodForm";

export default function AgregarComida({ onComidaAgregada }) {
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div className="agregar-container">
      <h2>Agregar Consumo</h2>

      <FoodSearch onSelect={(food) => setSelectedFood(food)} />

      {selectedFood && (
        <FoodForm
          food={selectedFood}
          clearFood={() => setSelectedFood(null)}
          onSaved={onComidaAgregada}
        />
      )}
    </div>
  );
}
