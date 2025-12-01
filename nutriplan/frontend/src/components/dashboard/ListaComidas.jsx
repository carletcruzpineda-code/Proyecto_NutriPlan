// src/components/dashboard/ListaComidas.jsx
import { useState } from "react";
import FoodSearch from "../alimentos/FoodSearch";
import FoodForm from "../alimentos/FoodForm";
import FoodList from "../alimentos/FoodList";

export default function ListaComidas() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  const cerrarModal = () => {
    setSelectedFood(null);
    setMostrarModal(false);
  };

  const handleGuardado = () => {
    // recargar lista
    setReloadToken((prev) => prev + 1);
  };

  return (
    <>
      <div className="dash-card text-center p-4">
        <h5 className="dash-card-title">Comidas registradas</h5>
        <p className="text-muted">Revisa lo que has consumido hoy</p>

        <FoodList reloadTrigger={reloadToken} />

        <button
          className="btn btn-success mt-3"
          type="button"
          onClick={() => setMostrarModal(true)}
        >
          ➕ Agregar Comida
        </button>
      </div>

      {mostrarModal && (
        <div className="agregar-overlay">
          <div className="agregar-modal">
            <div className="agregar-modal-header">
              <h5>Agregar consumo</h5>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={cerrarModal}
              >
                ✕
              </button>
            </div>

            <FoodSearch onSelect={(food) => setSelectedFood(food)} />

            {selectedFood && (
              <FoodForm
                food={selectedFood}
                clearFood={() => setSelectedFood(null)}
                onSaved={() => {
                  handleGuardado();
                  cerrarModal();
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
