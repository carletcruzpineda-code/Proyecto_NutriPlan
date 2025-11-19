import React, { useState } from "react";
import axios from "../../api/http";

export default function FoodForm({ food, clearFood }) {
  const [cantidad, setCantidad] = useState("");

  const enviar = async () => {
    if (!cantidad) return alert("Ingrese una cantidad");

    try {
      const totalCal = (food.calorias * cantidad).toFixed(2);
      const totalProt = (food.proteina * cantidad).toFixed(2);
      const totalCarb = (food.carbohidratos * cantidad).toFixed(2);
      const totalGrasas = (food.grasas * cantidad).toFixed(2);

      await axios.post("/registros/", {
        usuario: 1, // luego reemplazo con user.id de AuthContext
        alimento: food.id,
        cantidad_consumida: cantidad,
        fecha: new Date().toISOString().slice(0, 10),
        peso_actual: 0,
        total_calorias: totalCal,
        total_proteinas: totalProt,
        total_carbohidratos: totalCarb,
        total_grasas: totalGrasas
      });

      alert("Registro agregado!");
      clearFood();
      setCantidad("");
    } catch (error) {
      console.error("Error al registrar el consumo", error);
      alert("No se pudo registrar.");
    }
  };

  return (
    <div className="food-form-card">
      <h3>{food.nombre}</h3>

      <label>Cantidad (porciones)</label>
      <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />

      <button className="btn-primary" onClick={enviar}>
        Guardar Registro
      </button>

      <button className="btn-secondary" onClick={clearFood}>
        Cancelar
      </button>
    </div>
  );
}
