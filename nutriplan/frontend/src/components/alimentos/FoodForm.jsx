// src/components/dashboard/FoodForm.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import http from "../../api/http";

export default function FoodForm({ food, clearFood, onSaved }) {
  const { user } = useContext(AuthContext);
  const [cantidad, setCantidad] = useState("");
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = async () => {
    if (!cantidad || Number(cantidad) <= 0) {
      return alert("Ingresa una cantidad válida en gramos.");
    }

    setGuardando(true);

    // Conversión correcta (tu DB usa valores x 100g)
    const gramos = Number(cantidad);

    const total_calorias = (food.calorias * gramos) / 100;
    const total_proteinas = (food.proteina * gramos) / 100;
    const total_carbohidratos = (food.carbohidratos * gramos) / 100;
    const total_grasas = (food.grasas * gramos) / 100;

    try {
      await http.post("registros/", {
        alimento: food.id,
        cantidad_consumida: gramos,
        fecha: new Date().toISOString().slice(0, 10),

        // nuevos cálculos corregidos
        total_calorias,
        total_proteinas,
        total_carbohidratos,
        total_grasas,
      });

      onSaved?.();
      clearFood();
    } catch (error) {
      console.error("❌ Error al guardar registro:", error);
      alert("Error al guardar.");
    } finally {
      setGuardando(false);
    }
  };

  if (!food) return null;

  return (
    <div>
      <h4>{food.nombre}</h4>

      <input
        type="number"
        className="form-control"
        placeholder="Cantidad (g)"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />

      <button
        className="btn btn-success w-100 mt-2"
        disabled={guardando}
        onClick={handleGuardar}
      >
        Guardar
      </button>
    </div>
  );
}
