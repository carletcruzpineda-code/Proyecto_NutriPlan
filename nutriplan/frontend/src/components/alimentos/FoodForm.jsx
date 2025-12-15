import { useState } from "react";
import http from "../../api/http";

export default function FoodForm({ food, clearFood, onSaved }) {
  const [gramos, setGramos] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");

    // Validación
    if (!gramos || isNaN(gramos) || Number(gramos) <= 0) {
      setError("Ingrese una cantidad válida.");
      return;
    }

    try {
      setLoading(true);

      // SOLO enviamos lo que el backend necesita
      const payload = {
        alimento: food.id,
        cantidad_consumida: Number(gramos)
      };

      const res = await http.post("registros/", payload);

      if (onSaved) onSaved(res.data);

      
      setGramos("");
      clearFood();
    } catch (err) {
      console.error("Error guardando:", err);
      setError("No se pudo guardar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-form">
      <h3>Registrar consumo de {food.nombre}</h3>

      <label>Cantidad en gramos:</label>
      <input
        type="number"
        value={gramos}
        onChange={(e) => setGramos(e.target.value)}
        placeholder="Ejemplo: 100"
      />

      {error && <p className="error">{error}</p>}

      <button onClick={handleSave} disabled={loading}>
        {loading ? "Guardando..." : "Guardar consumo"}
      </button>

      <button className="cancel-btn" onClick={clearFood}>
        Cancelar
      </button>
    </div>
  );
}
