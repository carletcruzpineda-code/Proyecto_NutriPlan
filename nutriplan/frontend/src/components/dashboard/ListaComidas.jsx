export default function ListaComidas() {
  return (
    <div className="dash-card text-center p-4">
      <h5 className="dash-card-title">No hay comidas registradas</h5>
      <p className="text-muted">¡Empieza agregando tu primera comida del día!</p>

      <button className="btn btn-success mt-2">
        ➕ Agregar Primera Comida
      </button>
    </div>
  );
}
