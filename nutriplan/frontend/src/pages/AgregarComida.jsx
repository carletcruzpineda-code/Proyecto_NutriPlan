import React, { useState } from "react";
import "../styles/agregar.css";
import FoodSearch from "../components/FoodSearch";
import FoodList from "../components/FoodList";
import FoodForm from "../components/FoodForm";

export default function AgregarComida() {
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div className="agregar-container">
      <h2>Agregar Consumo</h2>

      <FoodSearch onSelect={(food) => setSelectedFood(food)} />

      {selectedFood && (
        <FoodForm food={selectedFood} clearFood={() => setSelectedFood(null)} />
      )}

      <FoodList />
    </div>
  );
}
