// src/components/alimentos/FoodForm.jsx
import { useContext, useState } from "react";
import http from "../../api/http";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function FoodForm({ food, clearFood, onSaved }) {
  const { user } = useContext(AuthContext);
  const [cantidad, setCantidad] = useState("");
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = async () => {
    if (!cantidad) {
      alert("Ingresa una cantidad en gramos.");
      return;
    }

    if (!user) {
      alert("Debes iniciar sesión para registrar comidas.");
      return;
    }

    try {
      setGuardando(true);
      const cantidadNum = Number(cantidad);

      // Asumo que tus macros están definidos por gramo
      const totalCalorias = Number(food.calorias) * cantidadNum;
      const totalProteinas = Number(food.proteina) * cantidadNum;
      const totalCarbohidratos = Number(food.carbohidratos) * cantidadNum;
      const totalGrasas = Number(food.grasas) * cantidadNum;

      await axios.post("/registros/", {
        usuario: 1, 
        alimento: food.id,
        cantidad_consumida: cantidadNum,
        fecha: new Date().toISOString().slice(0, 10),
        peso_actual: 0, // por ahora 0; luego puedes conectarlo con el peso real
        total_calorias: totalCalorias.toFixed(2),
        total_proteinas: totalProteinas.toFixed(2),
        total_carbohidratos: totalCarbohidratos.toFixed(2),
        total_grasas: totalGrasas.toFixed(2),
      });

      alert("Comida registrada correctamente.");
      setCantidad("");
      clearFood();
      onSaved && onSaved(); // avisar para recargar la lista
    } catch (error) {
      console.error("Error al registrar consumo", error);
      alert("No se pudo registrar el consumo.");
    } finally {
      setGuardando(false);
    }
  };

  if (!food) return null;

  return (
    <div className="food-form">
      <h5 className="mb-2">Alimento seleccionado</h5>
      <div className="food-form-header">
        <div>
          <strong>{food.nombre}</strong>
          <div className="text-muted" style={{ fontSize: 13 }}>
            {food.calorias} cal · {food.proteina} prot · {food.carbohidratos} carb ·{" "}
            {food.grasas} grasa (por gramo)
          </div>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={clearFood}
        >
          Cambiar alimento
        </button>
      </div>

      <div className="mt-3">
        <label className="form-label">Cantidad (gramos)</label>
        <input
          type="number"
          min="1"
          className="form-control"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Ej: 150"
        />
      </div>

      <button
        type="button"
        className="btn btn-success w-100 mt-3"
        onClick={handleGuardar}
        disabled={guardando}
      >
        {guardando ? "Guardando..." : "Guardar consumo"}
      </button>
    </div>
  );
}
