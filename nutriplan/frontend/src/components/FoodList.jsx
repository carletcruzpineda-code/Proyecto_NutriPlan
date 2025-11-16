import React, { useEffect, useState } from "react";
import axios from "../api/http";

export default function FoodList() {
  const [lista, setLista] = useState([]);

  const cargar = async () => {
    try {
      const res = await axios.get("/registros/");
      setLista(res.data);
    } catch (error) {
      console.error("Error cargando registros", error);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="food-list">
      <h3>Registros de hoy</h3>
      <ul>
        {lista.map((item) => (
          <li key={item.id}>{item.alimento} — {item.total_calorias} kcal</li>
        ))}
      </ul>
    </div>
  );
}
