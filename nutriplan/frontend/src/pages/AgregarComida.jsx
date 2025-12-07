  import { useState } from "react";
import "../styles/agregar.css";
import FoodSearch from "../components/alimentos/FoodSearch";
import FoodForm from "../components/alimentos/FoodForm";

export default function AgregarComida({ onComidaAgregada }) {
  const [selectedFood, setSelectedFood] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleSaved = (nuevoRegistro) => {
    setMensaje("Comida registrada exitosamente.");
    if (onComidaAgregada) onComidaAgregada(nuevoRegistro);

    setSelectedFood(null);

    // Quitar mensaje después de unos segundos
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <div className="agregar-container">
      <h2>Agregar Consumo</h2>

      {mensaje && <p className="mensaje-exito">{mensaje}</p>}

      {/* BUSCADOR */}
      <FoodSearch onSelect={(food) => setSelectedFood(food)} />

      {/* FORMULARIO DE REGISTRO DE CONSUMO */}
      {selectedFood && (
        <FoodForm
          food={selectedFood}
          clearFood={() => setSelectedFood(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
